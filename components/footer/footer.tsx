"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import "./style.css";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [year, setYear] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);

  // Run once on client side to avoid hydration issues
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    setHydrated(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const footerSections = [
    {
      title: "Courses",
      links: [
        ["MERN Stack Developer", "CO0000000001"],
        ["MEAN Stack Developer", "CO0000000002"],
        ["Python Full Stack Developer", "CO0000000003"],
        ["React JS Developer", "CO0000000004"],
        ["React Native Developer", "CO0000000005"],
        ["Angular Developer", "CO0000000006"],
        ["Node.js Developer", "CO0000000007"],
        // ["Python Developer", "CO0000000008"],
        // ["Javascript & Typescript", "CO0000000009"],
        // ["Django", "CO0000000010"],
        // ["Django REST Framework", "CO0000000011"],
        // ["MongoDB", "CO0000000012"],
        // ["MySQL", "CO0000000013"],
        // ["AWS", "CO0000000014"],
        // ["DevOps", "CO0000000015"],
      ],
    },
    {
      title: "Services",
      links: [
        ["About Us", "/about-us"],
        ["Contact Us", "/contact-us"],
        ["Cancellation & Refund", "/cancellation-and-refund-policy"],
        ["Careers", "/careers"],
        ["Customer Support", "/customer-support-and-faq"],
      ],
    },
  ];

  const socialIcons = [
    {
      icon: <Facebook size={20} />,
      href: "https://www.facebook.com/profile.php?id=61577801651484",
    },
    {
      icon: <FaXTwitter size={20} />,
      href: "https://x.com/XpertChange",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/company/107791961/admin/dashboard/",
    },
    {
      icon: <FaInstagram size={20} />,
      href: "https://www.instagram.com/changexpert/",
    },
  ];

  return (
    <>
      <div style={{ position: "relative", backgroundColor: "#339fa5" }}>
        <svg
          viewBox="0 0 1440 80"
          style={{
            display: "block",
            width: "100%",
            height: "84px",
            position: "absolute",
            top: "-38px",
            // rotate: "180deg",
            transform: "rotate(180deg)",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#339fa5"
            d="M0,64 C480,0 960,128 1440,64 L1440,0 L0,0 Z"
          ></path>
        </svg>
      </div>
      <footer className="text-white footer-section py-5 px-3">
        <div className="container">
          <div className="row">
            {/* Logo and Description */}
            <div className="col-12 col-md-3 mb-4">
              <Link href="/">
                <img
                  src="changexpert-mono.svg"
                  alt="changexpert-logo"
                  style={{ width: "190px" }}
                  className="mb-3"
                />
              </Link>
              <p>
                Changexpert is a learning platform offering a wide range of
                courses in web development and more. Our mission is to empower
                learners with the skills they need to succeed in the digital
                world.
              </p>
              <div className="d-flex gap-3 social-icons">
                {socialIcons.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, color: "#00b7b7" }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, idx) => (
              <div className="col-12 col-md-3 mb-4" key={idx}>
                <motion.h5
                  className="fw-semibold mb-3 text-white d-flex justify-content-between align-items-center cursor-pointer"
                  onClick={() => toggleSection(section.title)}
                  whileHover={{ scale: 1.05, color: "#00b7b7" }}
                >
                  {section.title}
                  {hydrated && isMobile && (
                    <span>{openSection === section.title ? "-" : "+"}</span>
                  )}
                </motion.h5>
                {(openSection === section.title || !hydrated || !isMobile) && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="list-unstyled"
                  >
                    {section.links.map(([label, href], subIdx) => (
                      <li key={subIdx} className="mb-2">
                        <Link
                          href={
                            section.title === "Courses"
                              ? `/courses/course-details/${href}`
                              : href
                          }
                          className="text-decoration-none links"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            ))}

            {/* Contact Section */}
            <motion.div
              className="col-12 col-md-3 mb-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h5 className="fw-semibold mb-3 text-white contact-text">
                Contact
              </h5>
              <p className="mb-2 d-flex align-items-center text-nowrap">
                <i className="pi pi-envelope me-2 mt-1"></i>
                <span>contact@changexpert.com</span>
              </p>
              <p className="mb-2 d-flex align-items-center text-nowrap">
                <i className="pi pi-phone me-2 mt-1"></i>
                <span>+91 9684706232</span>
              </p>
              <p className="mb-2 d-flex align-items-start">
                <i className="pi pi-map-marker me-2 mt-2"></i>
                <span>
                  Office No. 101, 1st floor, Shreyas Crest, Pashan-Sus Road,
                  Baner, Pune, Maharashtra 411041
                </span>
              </p>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <hr className="my-4" />
          <div className="row">
            <div className="col-12 col-md-6 text-center text-md-start">
              <small>
                © {year} Skramby Technology Solutions Pvt. Ltd. All rights
                reserved.
              </small>
            </div>
            <div className="col-12 col-md-6 text-center text-md-end">
              <small>
                <Link
                  href="/terms-and-conditions"
                  className="text-decoration-none me-3 text-white"
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-decoration-none text-white"
                >
                  Privacy Policy
                </Link>
              </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
