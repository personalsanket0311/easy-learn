"use client";
import React from "react";
import './style.css';

const CourseBenefits = () => {
  const benefits = [
    { left: 'Skill Development', right: 'Career Advancement' },
    { left: 'Knowledge Expansion', right: 'Networking Opportunities' },
    { left: 'Increased Confidence', right: 'Structured Learning' },
    { left: 'Personal Growth', right: 'Tangible Outcomes' }
  ];

  return (
    <div className="course-benefits">
      <h3 className="benefits-title">Our Course Benefits</h3>
      <div className="benefits-grid">
        <div className="benefits-column">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <span className="check-icon">✓</span>
              {benefit.left}
            </div>
          ))}
        </div>
        <div className="benefits-column">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <span className="check-icon">✓</span>
              {benefit.right}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseBenefits;