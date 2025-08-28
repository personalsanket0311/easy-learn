"use client";
import React from "react";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import "../style.css";


interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const NotificationsSection: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true
  });

  const handleNotificationChange = (type: keyof NotificationSettings, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: checked }));
  };

  return (
    <div className="mb-5">
      <h2 className="h4 mb-4 fw-bold text-dark">Notifications</h2>
      
      <div className="mb-3">
        <div className="d-flex align-items-center">
          <Checkbox
            inputId="emailNotifications"
            checked={notifications.emailNotifications}
            onChange={(e) => handleNotificationChange('emailNotifications', e.checked || false)}
            className="me-3"
          />
          <label htmlFor="emailNotifications" className="fw-medium text-dark" style={{ fontSize: '14px' }}>
            Email notifications
          </label>
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center">
          <Checkbox
            inputId="pushNotifications"
            checked={notifications.pushNotifications}
            onChange={(e) => handleNotificationChange('pushNotifications', e.checked || false)}
            className="me-3"
          />
          <label htmlFor="pushNotifications" className="fw-medium text-dark" style={{ fontSize: '14px' }}>
            Push notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;