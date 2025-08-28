import React from 'react';
import "./style.css";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => {
  return (
    <div className={`col-lg-6 col-md-6 mb-4 ${className}`}>
      <div className="card h-100 border-0 shadow-sm hover-card">
        <div className="card-body p-4 d-flex">
          <div className="feature-icon me-4 flex-shrink-0">
            <div
              className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '80px', height: '80px' }}
            >
              <span style={{ fontSize: '2rem' }}>{icon}</span>
            </div>
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title fw-bold mb-3">{title}</h5>
            <p className="card-text text-muted">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;