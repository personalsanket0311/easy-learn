'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CancellationRefundPolicy: React.FC = () => {
  const sections = [
    {
      title: 'Cancellation Policy',
      content: `We do not allow cancellations once you have enrolled in a course. Please ensure you are committed to the program before finalizing your enrollment.`
    },
    {
      title: 'Refund Policy',
      content: `Our refund policy is designed to ensure fairness and commitment from our students. Refunds are only applicable under specific circumstances, as detailed below:`
    },
    {
      title: 'Eligible for Refund',
      content: `If you are not placed in a job within the guaranteed timeframe as specified in your course agreement, you are eligible for a full refund of the course fees. To initiate a refund, you must provide proof of your job search efforts and demonstrate that you have met all course requirements.`
    },
    {
      title: 'Not Eligible for Refund',
      content: `Refunds are not applicable if you have not actively participated in the course. Active participation includes attending all scheduled lectures and completing all required assignments and projects. Failure to meet these participation criteria will result in ineligibility for a refund, regardless of job placement status.`
    },
    {
      title: 'Contact Us',
      content: `If you have any questions or concerns regarding our cancellation and refund policy, please contact our support team at support@changexpert.com.`
    }
  ];

  return (
    <div className="container p-4 rounded-3"
    style={{
    backgroundColor: "#f4f6f8",
    marginBottom: "20px",
    marginTop: "80px"
    }}>
      {/* Header */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h1 className="fw-bold mb-0">Cancellation and Refund Policy</h1>
      </motion.div>

      {/* Sections with animation */}
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="fw-bold mb-3 h5">{section.title}</h2>
          <p className="text-muted lh-base">{section.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CancellationRefundPolicy;