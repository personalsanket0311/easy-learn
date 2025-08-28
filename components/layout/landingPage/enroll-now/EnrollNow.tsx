"use client";
import React from "react";
import './style.css';

const CourseEnrollCard = () => {
  const courseIncludes = [
    '40 lessons',
    '10 file resources', 
    '200 exercises',
    '19 hours of content',
    'Certificate of Completion',
    'Lifetime access'
  ];

  return (
    <div className="enroll-card unified-card">
      <h4 className="unlock-title">Unlock your learning journey now!</h4>
      
      <p className="original-price">INR 29,999.00</p>
      <h3 className="current-price">INR 19,999.00</h3>
      
      <button className="enroll-button">Enroll Now</button>
      <p className="guarantee">30-Day Money-Back Guarantee*</p>

      <h5 className="details-title mt-4">This Course Includes</h5>
      <ul className="details-list">
        {courseIncludes.map((item, index) => (
          <li key={index} className="detail-item">
            <span className="bullet">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseEnrollCard;
