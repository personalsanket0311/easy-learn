'use client';
import React, { useEffect, useState } from 'react';
import './style.css';
import CustomButton from '@/components/ui/custom-button/CustomButton';
import Image from 'next/image';
import EditProfile from './EditProfile';
import studentservice from '@/services/student-service';

interface ProfileDetailsProps {
  studenProfile: {
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    email?: string;
    teamsEmail?: string;
  }
  stdId: string;
  studentProfilePhoto?: string
  onProfileUpdate: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  studenProfile: { firstName = '', lastName = '', mobileNumber = '', email, teamsEmail },
  stdId,
  studentProfilePhoto,
  onProfileUpdate
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Generate teamsEmail if not provided
  const generatedTeamsEmail =
    teamsEmail ||
    (firstName.trim() && lastName.trim()
      ? `${firstName.trim().toLowerCase()}.${lastName
          .trim()
          .toLowerCase()}@changexpert.com`
      : "");

  // Handle email copy
  const handleCopyEmail = () => {
    if (generatedTeamsEmail) {
      navigator.clipboard.writeText(generatedTeamsEmail).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Handle profile photo upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('studentProfilePhoto', file);

      try {
        await studentservice.updateStudentProfilePhotoByStdId(formData, stdId);
        //Convert image to base64 and store in localStorage
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          localStorage.setItem('studentProfilePhoto', base64String);
          setProfilePhoto(base64String);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error('Profile photo upload failed:', err);
      }
    }
  };
  // Get profile photo from local storage
  useEffect(() => {
    const localPhoto = localStorage.getItem('studentProfilePhoto');
    if (localPhoto) setProfilePhoto(localPhoto);
  }, []);

  return (
    <>
      <div className="container-fluid container-md card border-0">
        <div className="card-body p-2 p-md-4">
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-between">
            {/* Left side */}
            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start mb-3 mb-md-0">
              <div className="me-0 me-md-3 mb-3 mb-md-0 flex-shrink-0 position-relative">
                <div
                  className="rounded-circle overflow-hidden border"
                  style={{ width: '120px', height: '120px' }}
                >
                  <Image
                    src={profilePhoto || studentProfilePhoto || '/profile-picture.png'}
                    alt={`${firstName}'s profile`}
                    className="w-100 h-100"
                    width={120}
                    height={120}
                    priority={true}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>
                <label
                  htmlFor="photo-upload"
                  className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex justify-content-center align-items-center border border-2 border-white"
                  style={{ width: "30px", height: "30px" }}
                >
                  <i className="pi pi-camera" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="d-none"
                  />
                </label>
              </div>

              <div className="py-2 text-center text-md-start">
                <h5 className="fw-bold text-dark mb-1">
                  {firstName} {lastName}
                </h5>
                <div className="text-muted mb-2">{mobileNumber}</div>

                <div className="mb-1 text-nowrap">
                  <span className="fw-semibold text-dark me-2">Personal</span>
                  <span className="text-muted text-break">: {email}</span>
                </div>

                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-nowrap">
                  <span className="fw-semibold text-dark me-2">Teams</span>
                  <div className="d-flex align-items-center">
                    <span className="text-muted me-1 text-break">
                      : {generatedTeamsEmail}
                    </span>
                    <button
                      className="text-muted border-0 bg-transparent"
                      onClick={handleCopyEmail}
                      title="Copy email"
                    >
                      <i className="pi pi-copy fs-18 text-primary mt-1"></i>
                    </button>
                    {copied && (
                      <small className="ms-2 text-primary">Copied!</small>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="action-btn d-flex flex-column align-items-center align-items-md-end">
              <CustomButton
                label="Edit Profile"
                onClick={() => setShowDialog(true)}
                className="bg-blue border-0 px-4 px-md-5 py-2 text-nowrap"
              />
            </div>
          </div>
        </div>
      </div>

      <EditProfile
        visible={showDialog}
        onClose={() => setShowDialog(false)}
        initialData={{
          firstName,
          lastName,
          mobileNumber,
        }}
        onProfileUpdate={onProfileUpdate}
      />
    </>
  );
};

export default ProfileDetails;