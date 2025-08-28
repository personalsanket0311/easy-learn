'use client';
import React, { useEffect, useState } from 'react';
import ProfileDetails from '@/components/layout/profile/ProfileDetails';
import ProfileTabs from '@/components/layout/profile/ProfileTabs';
import studentservice from '@/services/student-service';

const Profile = () => {
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    studentservice.getStudentProfile()
      .then((response) => {
        setStudentProfile(response.data.student);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student profile:", error);
        setError("Failed to load student profile.");
        setIsLoading(false);
      });
  }, []);

  const refreshProfile = () => {
    studentservice.getStudentProfile()
      .then((response) => {
        setStudentProfile(response.data.student);
      })
      .catch((error) => {
        console.error("Error refreshing student profile:", error);
      });
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        {/* Simple Spinner */}
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger fw-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: "80px", paddingBottom: "40px"}}>
      <ProfileDetails
        stdId={studentProfile._id}
        studenProfile={studentProfile}
        onProfileUpdate={refreshProfile}
      />
      <ProfileTabs />
    </div>
  );
};

export default Profile;