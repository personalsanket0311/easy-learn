'use client';
import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import './style.css';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const CustomerSupportFAQ: React.FC = () => {

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Is there any afternoon or evening batch available?",
      answer: "Yes, schedule of new batch will be updated as per availability of Trainer."
    },
    {
      id: 2,
      question: " Is it acceptable if I attend recorded sessions, as I am currently working?",
      answer: "Yes, you may attend recorded sessions if your work commitments prevent you from joining live classes. However, we encourage live participation whenever possible to benefit from real-time interaction and support."
    },
    {
      id: 3,
      question: "If I attend only recorded sessions, will I still be eligible for job placement assistance?",
      answer: "Yes, you will be eligible for placement assistance, provided you complete all course requirements, including assignments and assessments. Active engagement with the learning material is crucial, whether through live or recorded sessions. Also, your MCQ and Mocks interview will also be considered."
    },
    {
      id: 4,
      question: "What kind of salary package can I expect as an entry-level developer?",
      answer: "As an entry-level developer, you can typically expect a salary package ranging starts from 2.04 lakhs per annum. The exact figure may vary based on your skills, performance, and the recruiting company."
    },
    {
      id: 5,
      question: "In case of an emergency, if I am unable to attend the registered batch, can I join a different batch later?",
      answer: "Yes, in the event of an emergency, you may request to join a different batch. We understand such situations and will make every effort to accommodate your request, subject to availability and course policies."
    },
    {
      id: 6,
      question: "I am a fresher with no IT background. Can I join the course?",
      answer: "Absolutely. Our courses are designed for beginners as well as experienced individuals. Foundational training is provided to ensure a smooth learning curve."
    },
    {
      id: 7,
      question: "If I fulfil all the course requirements but still do not receive a placement, will my placement fee be fully refundable?",
      answer: "Placement assistance is provided to all eligible candidates who meet the course requirements, including successful completion of assignments, assessments, and active participation in placement activities such as mock interviews and resume reviews."
    },
    {
      id: 8,
      question: "I am facing technical issues with video playback or login. What should I do?",
      answer: "Please check your internet connection and try clearing your browser cache. If the issue persists, contact our technical support team via chat or email."
    },
    {
      id: 9,
      question: "What are the system requirements to access the online classes?",
      answer: "A stable internet connection and a device with a modern web browser (Chrome, Firefox, Safari) are sufficient. Headphones and a webcam are recommended for live sessions."
    },
    {
      id: 10,
      question: "What kind of placement do you provide?",
      answer: "We Provide you 100% placement guarantee in our own company or our network companies."
    },
    {
      id: 11,
      question: "When does placement support begin?",
      answer: "Placement support typically begins once you complete at least 90% of the course and pass the required assessments."
    }
  ];

  return (
    <div className="container p-4 rounded-3"
    style={{
    backgroundColor: "#f4f6f8",
    marginBottom: "20px",
    marginTop: "80px"
    }}>
      {/* Header Section */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="fw-bold text-dark mb-2">Customer Support & FAQs</h1>
        <p className="text-muted fs-5 fw-medium">
          Find answers to common questions or get in touch with our support team.
        </p>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="fs-4 fw-semibold text-dark mb-4">
          Frequently Asked Questions
        </div>

        <Accordion activeIndex={0}>
          {faqData.map((faq) => (
            <AccordionTab
              key={faq.id}
              header={faq.question}
              contentClassName="p-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="m-0 text-muted lh-base">{faq.answer}</p>
              </motion.div>
            </AccordionTab>
          ))}
        </Accordion>

      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="px-1 mb-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="fs-5 fw-medium text-muted lh-base">
          If you can't find the answer you're looking for, please reach out to our support team. We're here to help!
        </p>
        <Link href="/contact-us" className="fs-5 fw-semibold text-decoration-none bg-blue px-3 py-2 rounded-pill d-inline-block">
          Contact Us
        </Link>
      </motion.div>
    </div>
  );
};

export default CustomerSupportFAQ;
