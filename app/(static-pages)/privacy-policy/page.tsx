'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      title: null,
      content: `At ChangeXpert, we value your privacy and are committed to protecting your personal information. This Privacy Policy
      explains how we collect, use, and safeguard your data when you use our e-learning platform. By accessing or using
      ChangeXpert, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use our
      platform.`
    },
    {
      title: 'Information We Collect',
      content: `We collect personal data to provide and improve our services. This includes personal information you
      provide directly, such as your name, email address, and payment details when you register or make a purchase. We
      also collect information automatically, such as your IP address, browsing history, and device information, to
      understand how you use our platform and enhance your experience.`
    },
    {
      title: 'How We Use Your Information',
      content: `Your information is used to deliver our services, process transactions, and communicate with you about your account
      and updates. We may also use your data for marketing purposes, such as sending promotional emails about new
      courses or features, but you can opt out of these communications at any time. Additionally, we analyze user data to
      improve our platform, personalize content, and ensure security.`
    },
    {
      title: 'Data Protection and Security',
      content: `We implement robust security measures to protect your personal information from unauthorized access, alteration, or
      disclosure. These measures include encryption, access controls, and regular security audits. However, no method of
      transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.`
    },
    {
      title: 'Your Rights',
      content: `You have the right to access, correct, or delete your personal information. You can manage your account settings or
      contact us directly to exercise these rights. We will respond to your requests within a reasonable timeframe. You also
      have the right to lodge a complaint with a supervisory authority if you believe your data protection rights have been
      violated.`
    },
    {
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will
      notify you of any significant changes by posting the updated policy on our platform and, if necessary, through direct
      communications. Please review this policy periodically to stay informed about how we protect your information.`
    },
    {
      title: 'Contact Us',
      content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at
      contact@changexpert.com. We are here to address any inquiries and ensure your privacy is protected.`
    }
  ];

  return (
    <div className="container p-4 rounded-3" 
    style={{
    backgroundColor: "#f4f6f8",
    marginBottom: "20px",
    marginTop: "80px",
    }}>
      {/* Header */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h1 className="fw-bold mb-0">Privacy Policy</h1>
      </motion.div>

      {/* Sections */}
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {section.title && <h2 className="fw-bold mb-3 h5">{section.title}</h2>}
          <p className="text-muted lh-base">{section.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;