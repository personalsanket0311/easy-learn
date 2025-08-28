"use client"
import React, { useEffect, useState } from 'react'
import PlacementForm from './PlacementForm'
import studentservice from '@/services/student-service';

interface studentRegFormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  permanentAddress: string;
  currentAddress: string;
  city: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  highestQualification: string;
  specialization: string;
  passingYear: string;
  collageName: string;
  university: string;
  cgpaPercentage: string;
  sscPercentage: string;
  hscPercentage: string;
  technicalFields: string;
  softSkills: string;
  programmingLanguages: string;
  projectTitle: string;
  projectDescription: string;
  technologiesUsed: string;
  githubLink: string;
  companyName: string;
  role: string;
  duration: string;
  description: string;
  resume: File | null;
  certificates: File | null;
  declaration: boolean;
}

interface MyProfileProps {
  _id: string;
}

const MyProfile: React.FC<MyProfileProps> = ({ _id }) => {
  const [studentRegFormData, setStudentRegFormData] = useState<studentRegFormData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    studentservice.getPlacementDetailsFormByStdRegId(_id)
      .then((response) => {
        // If user has existing data, set it; otherwise leave as undefined for new user
        setStudentRegFormData(response.data?.studentRegistrationes);
        setError(null);
      })
      .catch((error) => {
        // 404 is expected for first-time users - no existing form data
        if (error.response?.status === 404) {
          console.log("No existing placement form found - new user");
          setStudentRegFormData(undefined);
          setError(null);
        } else {
          // Other errors are actual problems
          console.error("Error fetching student profile:", error);
          setError(`Failed to load student data: ${error.message}`);
          setStudentRegFormData(undefined);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [_id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2">Loading form...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4">
        <strong>Error:</strong> {error}
        <button 
          className="btn btn-sm btn-outline-danger ms-2" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {!studentRegFormData && (
        <div className="alert alert-info mt-3">
          <i className="pi pi-info-circle me-2"></i>
          <strong>Welcome!</strong> Please fill out your placement registration form below.
        </div>
      )}
      <PlacementForm
        studentRegFormData={studentRegFormData} // Don't pass empty object, pass undefined or the actual data
        id={_id}
      />
    </div>
  )
}

export default MyProfile