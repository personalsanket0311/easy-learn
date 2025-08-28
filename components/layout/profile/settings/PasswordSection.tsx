"use client";
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import "../style.css";


interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordSection: React.FC = () => {
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<PasswordFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof PasswordFormData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PasswordFormData> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Reset form on success
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password updated successfully!');
    } catch (error) {
      alert('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="h4 mb-4 fw-bold text-dark">Password</h2>
      
      <div className="mb-4">
        <label htmlFor="currentPassword" className="form-label fw-medium text-dark mb-2">
          Current Password
        </label>
        <InputText
          id="currentPassword"
          type="password"
          value={passwordData.currentPassword}
          onChange={(e) => handleInputChange('currentPassword', e.target.value)}
          placeholder="Enter your current password"
          className={`w-100 ${errors.currentPassword ? 'p-invalid' : ''}`}
          style={{ 
            padding: '12px 16px',
            fontSize: '14px',
            border: '1px solid #e9ecef',
            borderRadius: '6px'
          }}
        />
        {errors.currentPassword && (
          <small className="text-danger mt-1 d-block">{errors.currentPassword}</small>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="form-label fw-medium text-dark mb-2">
          New Password
        </label>
        <InputText
          id="newPassword"
          type="password"
          value={passwordData.newPassword}
          onChange={(e) => handleInputChange('newPassword', e.target.value)}
          placeholder="Enter your new password"
          className={`w-100 ${errors.newPassword ? 'p-invalid' : ''}`}
          style={{ 
            padding: '12px 16px',
            fontSize: '14px',
            border: '1px solid #e9ecef',
            borderRadius: '6px'
          }}
        />
        {errors.newPassword && (
          <small className="text-danger mt-1 d-block">{errors.newPassword}</small>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="form-label fw-medium text-dark mb-2">
          Confirm New Password
        </label>
        <InputText
          id="confirmPassword"
          type="password"
          value={passwordData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          placeholder="Confirm your new password"
          className={`w-100 ${errors.confirmPassword ? 'p-invalid' : ''}`}
          style={{ 
            padding: '12px 16px',
            fontSize: '14px',
            border: '1px solid #e9ecef',
            borderRadius: '6px'
          }}
        />
        {errors.confirmPassword && (
          <small className="text-danger mt-1 d-block">{errors.confirmPassword}</small>
        )}
      </div>

      <Button
        label="Update Password"
        onClick={handleUpdatePassword}
        loading={isLoading}
        className="px-4 py-2"
        style={{
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      />
    </div>
  );
};

export default PasswordSection;