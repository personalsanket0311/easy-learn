import React from "react";
import "./benefitsSection.css";

const benefits = [
  {
    icon: "placement1.svg",
    title: "100% Placement Guarantee",
    description:
      "We ensure job placement after course completion, backed by a written guarantee.",
  },
  {
    icon: "rufund1.svg",
    title: "100% Refund if Not Placed",
    description:
      "If you’re not placed within 12 months of completing the course, we’ll refund your full course fee.",
  },
  {
    icon: "anybatch1.svg",
    title: "Join Any Batch",
    description:
      "Switch between batches freely based on your availability — morning, evening, or weekend.",
  },
  {
    icon: "infinite1.svg",
    title: "Lifetime Validity",
    description:
      "Get lifetime access to course content, so you can revise and learn whenever you want.",
  },
  {
    icon: "support1.svg",
    title: "Placement within 12 Months",
    description:
      "Our dedicated placement team helps you land a job within 12 months of course completion.",
  },
  {
    icon: "democlass1.svg",
    title: "Free Demo Classes",
    description:
      "Attend a free demo class and get a feel of our teaching style before enrolling.",
  },
  {
    icon: "mock1.svg",
    title: "Mock Interviews",
    description:
      "Prepare for real-world interviews with personalized mock interview sessions conducted by experts.",
  },
  {
    icon: "mcq1.svg",
    title: "MCQ Tests",
    description:
      "Evaluate your understanding through regular MCQ tests on core concepts and topics.",
  },
  {
    icon: "coding1.svg",
    title: "Coding Challenges",
    description:
      "Sharpen your skills through hands-on coding problems and real-time assessments.",
  },
  {
    icon: "resume1.svg",
    title: "Resume Building",
    description:
      "Get expert guidance in creating a professional, job-ready resume tailored to your career goals.",
  },
  {
    icon: "internship1.svg",
    title: "Internship During Course",
    description:
      "Gain practical experience with internship opportunities while you're still learning.",
  },
  {
    icon: "fees1.svg",
    title: "Affordable Fees",
    description:
      "Our courses are priced to be accessible and deliver maximum value with easy installment options.",
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <div className="container py-5 position-relative z-1 benefit-wrapper">
      <h2 className="fw-bold text-center mb-3 text-dark">Why Choose ChangeXpert?</h2>
      <p className="text-center mb-5 text-dark">
        We are committed to providing the best learning experience for our
        students. Here are some of the benefits of joining ChangeXpert:
      </p>
      <div className="row g-4">
        {benefits.map((benefit, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card h-100 text-start position-relative benefit-card overflow-hidden">
              <div className="hover-overlay position-absolute top-0 start-0 w-100 h-100 opacity-0" />
              <div className="card-body position-relative z-1 py-4 px-3 text-center">
                {benefit.icon && (
                  <img
                    src={benefit.icon}
                    alt={benefit.title}
                    className="mb-3 benefit-icon"
                  />
                )}
                <div className="position-relative d-inline-block">
                  <span className="hover-bar position-absolute start-0 top-0" />
                  <h5 className="fw-semibold ps-4 m-0 benefit-title">
                    {benefit.title}
                  </h5>
                </div>
                <p className="benefit-subtitle small mt-3">{benefit.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
