'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaReact,
  FaAngular,
  FaPython,
} from 'react-icons/fa';
import './style.css';

const TopCourses: React.FC = () => {
  const courses = [
    {
      id: 1,
      icon: <FaReact size={80} color="#61DBFB" />,
      title: "MERN Stack",
      description:
        "Dive into the MERN stack with designed for modern web developers.",
      link: "/courses/course-details/CO0000000001",
    },
    {
      id: 2,
      icon: <FaAngular size={80} color="#DD0031" />,
      title: "MEAN Stack",
      description:
        "Master the MEAN stack with our in-depth course designed for aspiring developers.",
      link: "/courses/course-details/CO0000000002",
    },
    {
      id: 3,
      icon: <FaPython size={80} color="#4B8BBE" />,
      title: "Python Full Stack",
      description:
        "Become a proficient full-stack developer with our comprehensive Python course.",
      link: "/courses/course-details/CO0000000003",
    },
  ];

  return (
    <div className="container mb-5">
      <motion.h2
        className="text-center fw-bold mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Full Stack Developer Course (Job Guaranteed Track)
      </motion.h2>
      <motion.h6
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
       Get industry-ready with comprehensive training in frontend, backend, databases, and DevOps, plus guaranteed placement after course completion.
      </motion.h6>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className="col d-flex justify-content-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.2,
              type: "spring",
              stiffness: 100,
              damping: 10,
              bounce: 0.4,
            }}
            viewport={{ once: true }}
          >

            <div className="flip-card mb-5">
              <div className="flip-card-inner">

                {/* Front Side */}
                <div className="flip-card-front d-flex flex-column justify-content-center align-items-center p-3">
                  <div className="icon-wrapper mb-2">
                    {course.icon}
                  </div>
                  <h5 className="course-title text-center mb-3">{course.title}</h5>
                  <Link
                    href={course.link}
                    className="btn btn-outline-primary enroll-btn fw-semibold"
                    style={{ borderRadius: '25px', fontSize: '0.85rem' }}
                  >
                    Enroll Now
                  </Link>
                </div>

                {/* Back Side */}
                <div className="flip-card-back d-flex flex-column justify-content-center align-items-center text-white p-3">
                  <p className="text-center">{course.description}</p>
                  <Link
                    href={course.link}
                    className="btn btn-light mt-3 enroll-btn fw-semibold"
                    style={{ borderRadius: '25px', fontSize: '0.9rem' }}
                  >
                    Enroll Now
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopCourses;
