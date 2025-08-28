'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions: React.FC = () => {
  const terms = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using the ChangeXpert platform, you agree to be bound by these Terms and Conditions. If you do not agree
      to these terms, please do not use our services.`,
    },
    {
      title: '2. User Responsibilities',
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to notify us
      immediately of any unauthorized use of your account. You are also responsible for all activities that occur under your
      account.`,
    },
    {
      title: '3. Acceptable Use Policy',
      content: `You agree not to use the ChangeXpert platform for any unlawful or prohibited activities. This includes, but is not limited to,
      posting or transmitting any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar,
      obscene, or otherwise objectionable.`,
    },
    {
      title: '4. Intellectual Property',
      content: `All content on the ChangeXpert platform, including text, graphics, logos, and software, is the property of ChangeXpert or its
      licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or
      create derivative works from any content without our express written permission.`,
    },
    {
      title: '5. Disclaimers',
      content: `The ChangeXpert platform is provided on an "as is" and "as available" basis. We make no warranties, express or implied,
      regarding the operation or availability of the platform, or the accuracy, reliability, or completeness of the content. We
      disclaim all warranties, including, but not limited to, implied warranties of merchantability and fitness for a particular
      purpose.`,
    },
    {
      title: '6. Limitation of Liability',
      content: `In no event shall ChangeXpert be liable for any direct, indirect, incidental, special, or consequential damages arising out of
      or in connection with your use of the platform, even if we have been advised of the possibility of such damages.`,
    },
    {
      title: '7. Changes to Terms',
      content: `We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately
      upon posting on the platform. Your continued use of the platform after any changes constitutes your acceptance of the
      new terms.`,
    },
    {
      title: '8. Governing Law',
      content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which
      ChangeXpert is located, without regard to its conflict of law provisions.`,
    },
    {
      title: '9. Contact Us',
      content: `If you have any questions about these Terms and Conditions, please contact us at support@changexpert.com.`,
    },
  ];

  return (
    <div className="container p-4 rounded-3" 
    style={{
    backgroundColor: "#f4f6f8",
    marginBottom: "20px",
    marginTop: "80px"}}
    >
      {/* Header */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="fw-bold mb-0">Terms and Conditions</h1>
      </motion.div>

      {/* Terms Sections with animation */}
      {terms.map((term, index) => (
        <motion.div
          key={index}
          className="mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="fw-bold mb-3 h6">{term.title}</h2>
          <p className="text-muted lh-base">{term.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TermsAndConditions;