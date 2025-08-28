// src/services/paymentService.ts
import axios from "axios";
import CookieService from "@/utils/cookies";

const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER;

// ✅ Helper function to get fresh auth headers with access token
const getAuthHeaders = () => {
  const token = CookieService.getAccessToken();

  if (!token || isTokenExpired(token)) {
    throw new Error("No valid or expired token found.");
  }

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Token expiry check using decode (assumes JWT)
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    return !exp || Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

// ✅ Create Razorpay Order
const createRazorpayOrder = async (orderPayload: any) => {
  const url = `${apiBaseUrl}/razorpay/create-order`;
  const config = getAuthHeaders();

  try {
    const response = await axios.post(url, orderPayload, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to create Razorpay order");
  }
};

// ✅ Verify Razorpay Payment
const verifyRazorpayPayment = async (orderPayloadData: any) => {
  const url = `${apiBaseUrl}/student-course/`;
  const config = getAuthHeaders();

  const orderPayload = {
    razorpay_order_id: orderPayloadData.razorpay_order_id,
    razorpay_payment_id: orderPayloadData.razorpay_payment_id,
    razorpay_signature: orderPayloadData.razorpay_signature,
    transactionAmount: orderPayloadData.transactionAmount,
    course: orderPayloadData.courseId, 
    courseBatch: orderPayloadData.batchId,
    courseFee: orderPayloadData.feeDetails?.courseFeeId,
    paymentType: orderPayloadData.paymentType,
    amount: orderPayloadData.amount,
    courseFeeInstallmentStructure: orderPayloadData.feeDetails?.installmentStructureId,
    remarks: orderPayloadData.remarks,
    orderData: orderPayloadData.orderData,
  };

  // console.log("Sending payment verification payload:", orderPayload); 

  try {
    const response = await axios.post(url, orderPayload, config);
    return response.data;
  } catch (error: any) {
    console.error("Payment verification error:", error.response?.data);
    throw new Error(error?.response?.data?.message || "Failed to verify Razorpay payment");
  }
};

// ✅ Verify Razorpay Installment Payment
const verifyInstallmentPayment = async (orderPayloadData: any) => {
  const installmentId = orderPayloadData.installmentId;
  if (!installmentId) {
    throw new Error("Installment ID is required for payment verification");
  }
  
  const url = `${apiBaseUrl}/course-payment-installment/pay-installment/${installmentId}`; 
  const config = getAuthHeaders();

  // Match the exact JSON format you provided
  const orderPayload = {
    razorpay_payment_id: orderPayloadData.razorpay_payment_id,
    razorpay_order_id: orderPayloadData.razorpay_order_id,
    razorpay_signature: orderPayloadData.razorpay_signature,
    amount: orderPayloadData.amount,
    remarks: orderPayloadData.remarks
  };

  console.log("Sending installment payment verification payload:", orderPayload);
  console.log("Installment ID:", installmentId);

  try {
    const response = await axios.put(url, orderPayload, config);
    return response.data;
  } catch (error: any) {
    console.error("Installment Payment verification error:", error.response?.data);
    throw new Error(error?.response?.data?.message || "Failed to verify Razorpay Installment payment");
  }
};

const PaymentService = {
  createRazorpayOrder,
  verifyRazorpayPayment,
  verifyInstallmentPayment,
};

export default PaymentService;
