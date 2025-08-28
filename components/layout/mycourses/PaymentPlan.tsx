"use client";
import CustomButton from '@/components/ui/custom-button/CustomButton';
import CustomTimeline from '@/components/ui/custom-timeline/CustomTimeline';
import PaymentService from '@/services/payment-service';
import StudentService from '@/services/student-service';
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Installment {
  id: string;
  transactionType: string;
  paidDate?: string;
  payableDate?: string;
  payableAmount: number;
  paymentStatus: string;
}

interface PaymentPlanProps {
  installments: Installment[];
  courseId?: string;
  batchId?: string;
  courseFeeId?: string;
  onPaymentSuccess?: () => void; // Callback to refresh data after successful payment
}

const PaymentPlan: React.FC<PaymentPlanProps> = ({ 
  installments, 
  courseId, 
  batchId, 
  courseFeeId,
  onPaymentSuccess 
}) => {
  const toast = useRef<Toast>(null);
  const [student, setStudent] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Fetch student profile
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await StudentService.getStudentProfile();
        setStudent(response.data.student);
      } catch (err) {
        console.error("Failed to fetch student profile", err);
      }
    };
    fetchStudent();
  }, []);

  const timelineData = installments.map((inst, idx) => {
    let status: 'Paid' | 'Due' | 'Pending' = 'Pending';
    if (inst.paymentStatus === 'Paid') status = 'Paid';
    else if (inst.paymentStatus === 'Due') status = 'Due';

    // Format date for Paid/Due
    let displayDate = '';
    if (status === 'Paid' && inst.paidDate) {
      displayDate = new Date(inst.paidDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else if (inst.payableDate) {
      displayDate = new Date(inst.payableDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    return {
      id: inst.id,
      title: status === 'Paid' ? `Installment ${idx + 1} - Paid` : `Installment ${idx + 1}`,
      date: displayDate,
      amount: inst.payableAmount?.toString() || '',
      status,
      icon: status === 'Paid' ? 'pi pi-circle-fill' : 'pi pi-circle'
    };
  });

  const hasDue = timelineData.some(inst => inst.status !== 'Paid');

  // Get the next due installment (first unpaid installment)
  const getNextDueInstallment = () => {
    return installments.find(inst => inst.paymentStatus !== 'Paid');
  };

  const handleInstallmentPayment = async () => {
    const nextDueInstallment = getNextDueInstallment();
    
    if (!nextDueInstallment) {
      toast.current?.show({
        severity: "info",
        summary: "No Due Payment",
        detail: "No installments are currently due for payment.",
        life: 3000,
      });
      return;
    }

    if (!courseId || !batchId || !courseFeeId) {
      toast.current?.show({
        severity: "error",
        summary: "Missing Information",
        detail: "Course details are required for payment processing.",
        life: 3000,
      });
      return;
    }

    setIsProcessing(true);
    const receipt = `Installment-${nextDueInstallment.id}-${Date.now()}`;

    try {
      const paymentAmount = nextDueInstallment.payableAmount;

      console.log("Processing installment payment:", {
        installmentId: nextDueInstallment.id,
        amount: paymentAmount,
        courseId,
        batchId,
        courseFeeId
      });

      // Create Razorpay order
      const orderResponse = await PaymentService.createRazorpayOrder({
        amount: paymentAmount,
        currency: "INR",
        receipt,
      });

      if (orderResponse.error) {
        throw new Error(orderResponse.message);
      }

      const order = orderResponse.data;

      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      // Initialize Razorpay
      const razorpay = new window.Razorpay({
        key: razorpayKeyId, // Use your Razorpay key
        amount: order.razorpayOrder.amount,
        currency: order.razorpayOrder.currency,
        name: "Installment Payment",
        description: `Payment for installment - ${nextDueInstallment.transactionType}`,
        order_id: order.razorpayOrder.id,
        handler: async (response: any) => {
          try {
            // Prepare verification payload to match your service expectations
            const verifyPayload = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              installmentId: nextDueInstallment.id, // Pass the dynamic installment ID
              amount: paymentAmount,
              remarks: JSON.stringify({
                course: courseId,
                courseBatch: batchId,
                courseFee: courseFeeId,
                installmentId: nextDueInstallment.id
              })
            };

            console.log("Sending installment verification payload:", verifyPayload);

            // Verify payment using installment verification endpoint
            const verifyResponse = await PaymentService.verifyInstallmentPayment(verifyPayload);

            if (verifyResponse.error) {
              throw new Error(verifyResponse.message);
            }

            toast.current?.show({
              severity: "success",
              summary: "Payment Successful",
              detail: "Your installment payment has been processed successfully!",
              life: 3000,
            });

            // Call success callback to refresh data
            if (onPaymentSuccess) {
              onPaymentSuccess();
            }

            setIsProcessing(false);
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.current?.show({
              severity: "error",
              summary: "Verification Failed",
              detail: "Payment completed but verification failed. Please contact support.",
              life: 5000,
            });
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${student?.firstName || ""} ${student?.lastName || ""}`,
          email: student?.email || "",
        },
        theme: {
          color: "#043c86",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      });

      razorpay.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.current?.show({
        severity: "error",
        summary: "Payment Error",
        detail: "Unable to initiate payment. Please try again.",
        life: 3000,
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className='card border-0'>
      <Toast ref={toast} position="top-center" />
      <div className='card-body py-3'>
        <h5 className="card-title fw-bold pb-2 text-dark">Payment Plan</h5>
        <p style={{ color: '#6B7582' }}>
          Track your installment payments and due dates for the Data Science course.
        </p>
        {timelineData.length > 0 ? (
          <div className='d-flex justify-content-between align-items-center flex-wrap gap-3'>
            <div className='pt-4'>
              <CustomTimeline installments={timelineData} />
            </div>
            {hasDue && (
              <div className='d-flex justify-content-end pr-4'>
                <CustomButton 
                  label={isProcessing ? 'Processing...' : 'Pay Now'} 
                  onClick={handleInstallmentPayment}
                  disabled={isProcessing}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted pt-3">No payment plan available.</div>
        )}
      </div>
    </div>
  );
};

export default PaymentPlan;