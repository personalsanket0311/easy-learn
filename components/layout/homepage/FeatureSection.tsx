import React from 'react';
import FeatureCard from './FeatureCard';
import "./style.css";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '✓',
      title: '100% Placement Guarantee',
      description: 'We guarantee placement for all our students. If you don\'t get placed, we\'ll refund your entire course fee.',
    },
    {
      icon: '🤝',
      title: '100% Refund if Not Placed',
      description: 'If you don\'t get placed within a year of completing the course, we\'ll refund your entire course fee.',
    },
    {
      icon: '👥',
      title: 'Join Any Batch',
      description: 'Join any batch that suits your schedule and learn at your own pace.',
    },
    {
      icon: '📅',
      title: 'Lifetime Validity',
      description: 'Access your course materials for a lifetime and keep learning.',
    },
    {
      icon: '∞',
      title: 'Placement Support for 12 Months',
      description: 'Get placement support for 12 months after completing the course and land your dream job.',
    },
    {
      icon: '💼',
      title: 'Career Support',
      description: 'Get comprehensive career support including resume building, interview preparation, and job placement assistance.',
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold mb-3">Why Choose ChangeXpert?</h2>
            <p className="lead text-muted">
              We are committed to providing the best learning experience for our students. Here are some of the benefits of joining ChangeXpert:
            </p>
          </div>
        </div>
        <div className="row">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;