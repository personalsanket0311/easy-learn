"use client";

import React from 'react';
import { Button } from 'primereact/button';
import { motion } from 'framer-motion';

interface JobPosition {
  id: number;
  title: string;
  department: string;
}

const Careers: React.FC = () => {
  const jobPositions: JobPosition[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design"
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing"
    }
  ];

  const cultureImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      alt: "Team collaboration"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop",
      alt: "Success and innovation"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop",
      alt: "Team meeting"
    }
  ];

  const handleApply = (jobTitle: string) => {
    const subject = encodeURIComponent(`Application for ${jobTitle}`);
    const body = encodeURIComponent(
      `Dear ChangeXpert Team,\n\nI am interested in the ${jobTitle} position.\n\nPlease find my resume attached.\n\nRegards,\n[Your Name]`
    );
    window.location.href = `mailto:careers@ChangeXpert.com?subject=${subject}&body=${body}`;
  };


  return (
    <div className="container p-4 rounded-3" 
    style={{
    backgroundColor: "#f4f6f8",
    marginBottom: "20px",
    marginTop: "80px"
    }}>
      {/* Header */}
      <motion.div
        className="row mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="col-12">
          <h1 className="fw-bold mb-4 display-5">Join our team</h1>
          <p className="text-muted lh-base">
            We're a passionate group of educators, engineers, and creatives dedicated to making learning accessible and engaging for everyone.
            If you're looking for a challenging and rewarding career, we'd love to hear from you.
          </p>
        </div>
      </motion.div>

      {/* Open Positions */}
      <motion.div
        className="row mb-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="col-12">
          <h2 className="fw-bold mb-4 h4">Open Positions</h2>

          {jobPositions.map((position, index) => (
            <motion.div
              key={position.id}
              className="d-flex justify-content-between align-items-center py-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.h5
                  className="fw-bold mb-1 h6 mb-1"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="position-relative d-inline-block">
                    {position.title}
                    <motion.span
                      layoutId="underline"
                      className="position-absolute bottom-0 start-0 w-100"
                      style={{ height: 2, backgroundColor: '#00b7b7' }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.h5>

                <p className="text-muted small mb-0">{position.department}</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 250 }}>
                <Button
                  label="Apply"
                  className="p-button-text rounded-pill text-secondary bg-light"
                  onClick={() => handleApply(position.title)}
                />
              </motion.div>

            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Our Culture */}
      <motion.div
        className="row mb-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="col-12">
          <h2 className="fw-bold mb-4 h4">Our Culture</h2>
          <p className="text-muted mb-4 lh-base">
            At ChangeXpert, we believe in fostering a collaborative and inclusive environment where everyone can thrive.
            We value creativity, innovation, and a commitment to excellence. Our team is passionate about learning and
            dedicated to making a positive impact on the world through education.
          </p>

          <div className="row g-4">
            {cultureImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="col-12 col-md-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="img-fluid rounded-3 w-100"
                  style={{ height: '220px', objectFit: 'cover' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* How to Apply */}
      <motion.div
        className="row"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="col-12">
          <h2 className="fw-bold mb-3 h4">How to Apply</h2>
          <p className="text-muted lh-base">
            To apply for a position, please submit your resume and cover letter to careers@ChangeXpert.com.
            Be sure to include the position title in the subject line. We look forward to hearing from you!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Careers;