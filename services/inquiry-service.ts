import axios from "axios";
import CookieService from "@/utils/cookies";

const apiBaseUrl: string = process.env.NEXT_PUBLIC_SERVER || "";

// ✅ Helper to check token expiry (fallback if not in CookieService)
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    return !exp || Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

// ✅ Get auth headers securely
const getAuthHeaders = () => {
  const token = CookieService.getAccessToken();
  if (!token || isTokenExpired(token)) {
    throw new Error("Invalid or expired token");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

//create inquiry - post method
const createInquiry = async (data: any) => {
  const url = `${apiBaseUrl}/enquiry/`;
  try {
    // const config = getAuthHeaders();
    const response = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

//create demo course inquiry - post method
const createDemoCourseInquiry = async (data: any) => {
  const url = `${apiBaseUrl}/demo-enquiry/`;
  try {
    const response = await axios.post(url, data);
    console.log("Demo course inquiry response:", response.data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

const InquiryService = { createInquiry,createDemoCourseInquiry };
export default InquiryService;