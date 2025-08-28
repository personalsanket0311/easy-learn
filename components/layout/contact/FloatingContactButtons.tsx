'use client';

import React from 'react';

import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

import './Style.css';

const FloatingContactButtons: React.FC = () => {
  return (
    <div className="floating-contact-buttons">
      <a
        href="https://wa.me/919684706232"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <a
        href="tel:+919684706232"
        className="floating-btn call"
        aria-label="Call Now"
      >
        <FaPhoneAlt />
      </a>
    </div>
  );
};

export default FloatingContactButtons;
