import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const KeyFeatures: React.FC = () => {
  const features = [
    "Comprehensive Curriculum",
    "Hands-on Projects",
    "Expert Trainers",
    "100% Placement",
    "Lifetime Access"
  ];

  return (
    <div>
      <h6 className="fw-bold mb-3">Key Features</h6>
      <ul className="list-unstyled">
        {features.map((feature, idx) => (
          <li key={idx} className="d-flex align-items-center mb-3 border px-1 py-2 rounded-2">
            <div className="d-flex justify-content-center align-items-center rounded-2 bg-light me-3" style={{ width: '32px', height: '32px' }}>
              <span className="text-dark fw-bold">✓</span>
            </div>
            <span className="text-dark">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyFeatures;
