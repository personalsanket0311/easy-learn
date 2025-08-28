"use client";
import React from "react";
import './style.css';

const CourseRequirements = () => {
  const requirements = [
    'Stable Internet Connection',
    'A Computer or Laptop', 
    'Access to Design Software',
    'A Modern Web Browser',
    'Basic Understanding of Web Concepts',
    'Willingness to Learn and Practice'
  ];

  return (
    <div className="course-requirements">
      <h3 className="requirements-title">Requirements</h3>
      <ul className="requirements-list">
        {requirements.map((requirement, index) => (
          <li key={index} className="requirement-item">
            <span className="requirement-bullet">•</span>
            {requirement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRequirements;