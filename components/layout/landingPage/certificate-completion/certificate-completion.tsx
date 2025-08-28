"use client";
import React from "react";
import "./style.css";

const Certificate: React.FC = () => {
  return (
    <div className="container py-3">
      <div className="certificate-grid">
        <div className="certificateCard rounded-4 shadow">
          <div className="p-4">
            <h5 className="fw-semibold mb-3  text-md-start">
              Certificate of Completion
            </h5>
            <div className="certificateBody rounded-4">
              <div className="certificateContent text-center">
                <h1 className="title fw-bold">Certificate</h1>
                <h5 className="text-muted mb-4">of Appreciation</h5>
                <p className="fw-semibold">Proudly Presented to</p>
                <div className="name-placeholder"></div>
                <p className="text-muted px-md-5" style={{ lineHeight: "1.6" }}>
                  has demonstrated mastery in utilizing JavaScript to its full
                  potential by successfully completing all tasks related to web
                  development, DOM manipulation, asynchronous programming,
                  and advanced frameworks.
                </p>
                <div className="d-flex justify-content-between mt-5 px-md-5 signature-line">
                  <small>Project Manager</small>
                  <small>Director</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="certificate-sidebar d-none d-md-block">
          {/* Optional sidebar */}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
