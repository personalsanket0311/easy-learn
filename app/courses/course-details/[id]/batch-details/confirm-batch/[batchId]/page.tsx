"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { readCourseBatcheByBatchId } from "@/services/course-service";
import CourseService from "@/services/course-service"; // Import the CourseService
import BatchDetails from "@/components/layout/confirmBatch/BatcheDetails";
import BackButton from "@/components/ui/backButton/BackButton";
import LoginPrompt from "@/components/layout/enrollment/LoginPrompt";
import { useFeeSelection } from "@/context/FeeSelectionContext";
import { useAuth } from "@/context/AuthContext";
import { Toast } from "primereact/toast";
import { jwtDecode } from "jwt-decode";
import CookieService from "@/utils/cookies";
import StudentService from "@/services/student-service";
import PaymentService from "@/services/payment-service";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const EnrollPage = () => {
  const router = useRouter();
  const params = useParams();
  const toast = useRef<Toast>(null);
  const courseId = params.id as string;
  const batchId = params.batchId as string;

  const [batchData, setBatchData] = useState<any>(null);
  const [courseData, setCourseData] = useState<any>(null); // Add course data state
  const [student, setStudent] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { selectedFee } = useFeeSelection();
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !authLoading && typeof window !== "undefined") {
      const returnPath = sessionStorage.getItem("returnPath");
      if (returnPath === window.location.pathname) {
        sessionStorage.removeItem("returnPath");
      }
    }
  }, [isAuthenticated, authLoading]);

  // Fetch batch data
  useEffect(() => {
    if (batchId) {
      readCourseBatcheByBatchId(batchId).then((res) => {
        setBatchData(res.data.courseBatch);
      });
    }
  }, [batchId]);

  // Fetch course data including fees
  useEffect(() => {
    if (courseId) {
      CourseService.readCourseByCourseId(courseId).then((res) => {
        setCourseData(res.data);
      });
    }
  }, [courseId]);

  useEffect(() => {
    // console.log("Selected Fee Object Structure:", selectedFee);
    if (selectedFee) {
      // console.log("Selected Fee Keys:", Object.keys(selectedFee));
    }
  }, [selectedFee]);

  useEffect(() => {
    if (batchData) {
      // console.log("Batch Data:", batchData);
    }
  }, [batchData]);

  useEffect(() => {
    if (courseData) {
      // console.log("Course Data courseFees:", courseData.courseFees);
    }
  }, [courseData]);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!isAuthenticated || authLoading) return;

      try {
        const response = await StudentService.getStudentProfile();
        setStudent(response.data.student);
      } catch (err) {
        console.error("Failed to fetch student profile", err);
      }
    };
    fetchStudent();
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Simplified getCourseFeeDetails function
  const getCourseFeeDetails = () => {
    console.log("Getting course fee details...");
    console.log("courseData?.courseFees:", courseData?.courseFees);
    console.log("selectedFee:", selectedFee);
    
    if (!courseData?.courseFees || !selectedFee) {
      console.log("Missing courseData.courseFees or selectedFee");
      return null;
    }

    // Handle case mismatch between selectedFee.type and API feesType
    // console.log("Looking for feesType:", selectedFee.type);

    const courseFee = courseData.courseFees.find(
      (fee: any) => fee.feesType.toLowerCase() === selectedFee.type.toLowerCase()
    );

    // console.log("Found courseFee:", courseFee);

    if (!courseFee) {
      console.log("No matching courseFee found");
      console.log("Available feesTypes:", courseData.courseFees.map((fee: any) => fee.feesType));
      return null;
    }

    const result = {
      courseFeeId: courseFee._id,
      installmentStructureId: courseFee.feeInstallments?.[0]?._id || null,
    };

    console.log("Returning fee details:", result);
    return result;
  };

  // ✅ Updated handleEnrollment with improved payment calculation
  const handleEnrollment = async () => {

    if (!isAuthenticated) {
      sessionStorage.setItem("returnPath", window.location.pathname);
      toast.current?.show({
        severity: "warn",
        summary: "Authentication Required", 
        detail: "Please login to enroll.",
        life: 3000,
      });
      router.push("/signin");
      return;
    }

    if (!selectedFee) {
      toast.current?.show({
        severity: "warn",
        summary: "Fee Selection Required",
        detail: "Please select a fee option before enrolling.",
        life: 3000,
      });
      return;
    }

    const feeDetails = getCourseFeeDetails();
    if (!feeDetails) {
      toast.current?.show({
        severity: "error", 
        summary: "Fee Details Error",
        detail: "Unable to get fee details. Please check console for details.",
        life: 3000,
      });
      return;
    }

    setIsProcessing(true);
    const receipt = `Enrollment-${batchId}-${Date.now()}`;

    try {
      // ✅ Fix: Use the actual payment amount logic based on your data
      let paymentAmount;
      const isInstallment = selectedFee.installments && Array.isArray(selectedFee.installments) && selectedFee.installments.length > 0;
      
      if (isInstallment && selectedFee.installments) {
        // For installment payment, use first installment amount
        paymentAmount = selectedFee.installments[0].amount;
      } else {
        // For full payment, use totalFee from selectedFee
        // This should be 35000 for WithoutPlacement based on your console log
        paymentAmount = selectedFee.totalFee;
      }

      console.log("Payment amount calculated:", paymentAmount);
      console.log("Is installment payment:", isInstallment);

      if (!paymentAmount) {
        throw new Error("Unable to calculate payment amount");
      }

      const orderResponse = await PaymentService.createRazorpayOrder({
        amount: paymentAmount,
        currency: "INR", 
        receipt,
      });

      if (orderResponse.error) throw new Error(orderResponse.message);
      const order = orderResponse.data;

      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      const razorpay = new window.Razorpay({
        key: razorpayKeyId,
        amount: order.razorpayOrder.amount,
        currency: order.razorpayOrder.currency,
        name: "Course Enrollment",
        description: `Enrollment for ${batchData?.batchType} Batch`,
        order_id: order.razorpayOrder.id,
        handler: async (response: any) => {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              transactionAmount: paymentAmount,
              courseId: courseId,
              batchId: batchId,
              feeDetails: {
                courseFeeId: feeDetails.courseFeeId,
                installmentStructureId: isInstallment ? feeDetails.installmentStructureId : null
              },
              paymentType: isInstallment ? "Installment Pay" : "Full Pay",
              amount: paymentAmount,
              remarks: JSON.stringify({
                course: courseId,
                courseBatch: batchId,
                courseFee: feeDetails.courseFeeId,
              }),
              orderData: order
            };

            console.log("Sending verification payload:", verifyPayload);

            const verifyResponse = await PaymentService.verifyRazorpayPayment(verifyPayload);

            if (verifyResponse.error) throw new Error(verifyResponse.message);

            toast.current?.show({
              severity: "success",
              summary: "Enrollment Successful",
              detail: "You've been successfully enrolled!",
              life: 3000,
            });

            setTimeout(() => {
              router.push("/profile");
            }, 2000);
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.current?.show({
              severity: "error",
              summary: "Verification Failed", 
              detail: "Payment done but enrollment failed. Contact support.",
              life: 5000,
            });
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
          ondismiss: () => setIsProcessing(false),
        },
      });

      razorpay.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.current?.show({
        severity: "error",
        summary: "Payment Error",
        detail: "Unable to initiate Razorpay. Try again.",
        life: 3000,
      });
      setIsProcessing(false);
    }
  };

  if (authLoading) {
    return (
      <div className="container py-4 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (!batchData || !courseData)
    return <div className="container py-4">Loading batch details...</div>;

  const batchDetails = {
    Timings: `${batchData.batchStartTime} - ${batchData.batchEndTime}`,
    Days:
      batchData.batchType === "Weekdays"
        ? "Monday to Friday"
        : "Saturday and Sunday",
    "Start Date": new Date(batchData.batchStartDate).toLocaleDateString(),
    "End Date": new Date(batchData.batchEndDate).toLocaleDateString(),
    // Trainer: `${batchData.trainer.firstName} ${batchData.trainer.lastName}`,
    ...(selectedFee && { Fee: `₹${selectedFee.totalFee}` }),
  };

  return (
    <div className="container">
      <Toast ref={toast} position="top-center" />
      <BackButton />
      <div className="row">
        <div className="col-12">
          {!isAuthenticated ? (
            <LoginPrompt
              batchName={`${batchData.batchType} Batch`}
              courseName="Course"
            />
          ) : (
            <BatchDetails
              batchName={`${batchData.batchType} Batch`}
              details={batchDetails}
              onClick={handleEnrollment}
              isProcessing={isProcessing}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollPage;