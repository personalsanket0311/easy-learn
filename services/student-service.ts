// src/services/studentService.ts
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

// ✅ 1. Get Student Profile
const getStudentProfile = async () => {
  const url = `${apiBaseUrl}/student-dashboard/find-student-profile`;
  try {
    const config = getAuthHeaders();
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ 2. Update Student Profile
const updateStudentProfile = async (payload: any) => {
  const url = `${apiBaseUrl}/student-dashboard/update-student-profile`;
  try {
    const config = getAuthHeaders();
    const response = await axios.post(url, payload, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ 3. Get All Student Courses
const getAllStudentCourses = async () => {
  const url = `${apiBaseUrl}/student-dashboard/find-all-student-courses`;
  try {
    const config = getAuthHeaders();
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ 4. Get Course by ID
const getStudentCourseById = async (courseId: string) => {
  const url = `${apiBaseUrl}/student-dashboard/find-student-course-by-id/${courseId}`;
  try {
    const config = getAuthHeaders();
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//update student profile photo by stdId
const updateStudentProfilePhotoByStdId = async (formData: any, stdId: string) => {
  const url = `${apiBaseUrl}/student/upload-profile-photo/${stdId}`;
  try {
    const token = CookieService.getAccessToken();
    if (!token) throw new Error("Missing token");

    const response = await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//create student placement details form - post method
const createPlacementDetailsForm = async (values: any) => {
  const url = `${apiBaseUrl}/student-registration-form/`;
  try {
    const token = CookieService.getAccessToken();
    if (!token) throw new Error("Missing token");
    
    const response = await axios.post(url, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    // console.log("Placement form created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

//get student placement details form by Id - get method
const getPlacementDetailsFormByStdRegId = async (_id: string) => {
  const url = `${apiBaseUrl}/student-registration-form/${_id}`;
  try {
    const config = getAuthHeaders();
    const response = await axios.get(url, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

//update student placement details form by Id - put method
const updatePlacementDetailsFormById = async (values: any, _id: string) => {
  const url = `${apiBaseUrl}/student-registration-form/${_id}`;
  try {
    const token = CookieService.getAccessToken();
    if (!token) throw new Error("Missing token");

    const response = await axios.put(url, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const StudentService = {
  getStudentProfile,
  updateStudentProfile,
  getAllStudentCourses,
  getStudentCourseById,
  updateStudentProfilePhotoByStdId,
  createPlacementDetailsForm,
  getPlacementDetailsFormByStdRegId,
  updatePlacementDetailsFormById,
};

export default StudentService;
