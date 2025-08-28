"use client"
import React from 'react';
import { Button } from 'primereact/button';
import './style.css';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
    const router = useRouter();

    const values = [
        {
            title: "Accessibility:",
            description: "Making education available to everyone, regardless of their circumstances."
        },
        {
            title: "Quality:",
            description: "Delivering high-quality, relevant, and engaging learning experiences."
        },
        {
            title: "Innovation:",
            description: "Continuously improving our platform and offerings to meet the evolving needs of learners."
        },
        {
            title: "Community:",
            description: "Fostering a supportive and collaborative learning community."
        },
        {
            title: "Integrity:",
            description: "Operating with transparency, honesty, and ethical principles."
        }
    ];

    return (
        <div className="container p-4 rounded-3"
            style={{
                backgroundColor: "#f4f6f8",
                marginBottom: "20px",
                marginTop: "80px"
            }}>
            {/* About Us Header */}
            <motion.div
                className="row mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="col-12">
                    <h1 className="fw-bold mb-4 display-5">About Us</h1>
                    <p className="text-muted lh-base">
                        ChangeXpert is a leading online learning platform dedicated to providing high-quality educational content to learners
                        worldwide. Our mission is to make education accessible, affordable, and engaging for everyone, regardless of their
                        background or location. We believe that learning should be a lifelong journey, and we are committed to supporting our
                        learners every step of the way.
                    </p>
                </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div
                className="row mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="col-12">
                    <h2 className="fw-bold mb-3 h4">Our Mission</h2>
                    <p className="text-muted lh-base">
                        Our mission is to empower individuals through education, fostering personal and professional growth. We strive to
                        create a dynamic learning environment that encourages curiosity, critical thinking, and collaboration. By partnering
                        with top trainers and experienced developers, we deliver courses that are both relevant and impactful, preparing learners for
                        success in today's rapidly evolving world.
                    </p>
                </div>
            </motion.div>

            {/* Our Values */}
            <motion.div
                className="row mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="col-12">
                    <h2 className="fw-bold mb-3 h4">Our Values</h2>
                    <p className="text-muted mb-4 lh-base">
                        At ChangeXpert, we are guided by a set of core values that shape our work and interactions. We believe in:
                    </p>

                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className="mb-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <p className="mb-1">
                                <span className="fw-bold">{value.title}</span> {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Contact Button */}
            <motion.div
                className="row"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="col-12">
                    <Button
                        label="Contact Us"
                        className="rounded-pill bg-blue border-0"
                        onClick={() => router.push('/contact-us')}
                    />
                </div>
            </motion.div>

        </div>
    );
};

export default AboutUs;