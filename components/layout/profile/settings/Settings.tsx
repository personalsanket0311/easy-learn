import React from 'react';
import { Card } from 'primereact/card';
import "../style.css";
import NotificationsSection from './NotificationSection';
import PasswordSection from './PasswordSection';

// Main Settings Page Component
const SettingsPage: React.FC = () => {
  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <Card className="shadow-sm border-0" style={{ borderRadius: '12px' }}>
            <div className="p-4">
              <h1 className="h3 mb-4 fw-bold text-dark">Settings</h1>
              
              <PasswordSection />
              <NotificationsSection />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;