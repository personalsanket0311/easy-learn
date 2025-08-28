import React from 'react';
import CourseBenefits from '../course-benefits/CourseBenefits';
import CourseRequirements from '../requiments/requiments';
import CourseEnrollCard from '../enroll-now/EnrollNow';
import './style.css';

export default function Main() {
  return (
    <div className="container py-4" style={{ marginTop: '100px' }}>
      <div className="course-layout">
        {/* LEFT SIDE */}
        <div className="left-section">
          <div className="course-header">
            <h1 className="course-title">JavaScript Full Mastery 2025 Edition Updated</h1>
            <p className="course-description">
              Master JavaScript with our updated course. Learn core concepts, ES6+, and advanced 
              techniques to create dynamic, responsive web applications.
            </p>
            <div className="course-badges  ">
              <span className="difficulty-badge">
                <span className="bars">|||</span> Intermediate
              </span>
              <span className="featured-badge">Featured</span>
            </div>
          </div>
          <CourseBenefits />
          <CourseRequirements />
          
        </div>

        {/* RIGHT SIDE */}
        <div className="right-section">
          <CourseEnrollCard />
        </div>
      </div>
    </div>
  );
}