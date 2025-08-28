"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InquiryService from "@/services/inquiry-service";
import "./style.css";

const initialValues = {
  fullName: "",
  email: "",
  mobileNumber: "",
  heardFrom: "",
  enquiryNote: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, "Enter valid 10-digit mobile number")
    .required("Mobile number is required"),
  heardFrom: Yup.string().required("This field is required"),
  enquiryNote: Yup.string(),
});

const ContactUsPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleSubmit = async (
    values: any,
    { resetForm, setSubmitting }: any
  ) => {
    try {
      setSubmitError("");
      await InquiryService.createInquiry(values);
      setFormSubmitted(true);
      resetForm();

      // Reset success message after 4 seconds
      setTimeout(() => setFormSubmitted(false), 4000);
    } catch (error: any) {
      console.error("Submission failed:", error);
      setSubmitError(
        error?.response?.data?.message || "Submission failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container p-4 rounded-3"
      style={{
        marginBottom: "80px",
        marginTop: "80px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <motion.div
            className="p-5 rounded-3 shadow-sm"
            style={{ backgroundColor: "beige" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="row">
              {/* Contact Form */}
              <motion.div
                className="col-lg-6 mb-4 mb-lg-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="fw-bold mb-3 text-dark">Contact Us</h2>
                <p className="text-muted mb-4">
                  We're here to help! Reach out to us with any questions or
                  feedback you may have.
                </p>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* Full Name */}
                      <div className="mb-3">
                        <label className="text-muted contact-label">
                          Full Name<sup className="text-danger">*</sup>
                        </label>
                        <Field
                          name="fullName"
                          placeholder="Enter your Name"
                          className="w-100 p-2 border-0 rounded contact-input bg-ivory"
                        />
                        <div className="text-danger small mt-1">
                          <ErrorMessage name="fullName" />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <label className="text-muted contact-label">
                          Email<sup className="text-danger">*</sup>
                        </label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="w-100 p-2 border-0 rounded contact-input bg-ivory"
                        />
                        <div className="text-danger small mt-1">
                          <ErrorMessage name="email" />
                        </div>
                      </div>

                      {/* Mobile Number */}
                      <div className="mb-3">
                        <label className="text-muted contact-label">
                          Mobile Number<sup className="text-danger">*</sup>
                        </label>
                        <Field
                          name="mobileNumber"
                          placeholder="Enter your mobile number"
                          maxLength={10}
                          className="w-100 p-2 border-0 rounded contact-input bg-ivory"
                          onInput={(e: React.FormEvent<HTMLInputElement>) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 10);
                          }}
                        />
                        <div className="text-danger small mt-1">
                          <ErrorMessage name="mobileNumber" />
                        </div>
                      </div>

                      {/* Enquiry Note */}
                      <div className="mb-4">
                        <label className="text-muted contact-label">
                          Enquiry Note
                        </label>
                        <Field
                          name="enquiryNote"
                          as={InputTextarea}
                          rows={6}
                          placeholder="Enter your message..."
                          className="w-100 p-2 border-0 rounded contact-input bg-ivory "
                        />
                        <div className="text-danger small mt-1">
                          <ErrorMessage name="enquiryNote" />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.div
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="submit"
                          label={isSubmitting ? "Sending..." : "Send Message"}
                          className="navbar-login-button rounded-pill border-0 px-4 py-2"
                          disabled={isSubmitting}
                          loading={isSubmitting}
                        />
                      </motion.div>

                      {/* Success Message */}
                      <AnimatePresence>
                        {formSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-3 text-success fw-medium"
                          >
                            🎉 Thank you! Your inquiry has been submitted
                            successfully. We'll get back to you shortly.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Error Message */}
                      <AnimatePresence>
                        {submitError && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-3 text-danger fw-medium"
                          >
                            ❌ {submitError}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Form>
                  )}
                </Formik>
              </motion.div>

              {/* Contact Info Section */}
              <motion.div
                className="col-lg-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="fw-bold mb-4 text-dark">
                  Other Ways to Reach Us
                </h2>

                {/* Email */}
                <motion.div
                  className="d-flex align-items-start mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="me-3 mt-1 bg-ivory p-2 rounded">
                    <i className="pi pi-envelope text-muted fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">Email Us</h5>
                    <p className="mb-1 text-muted">support@changexpert.com</p>
                    <p className="mb-0 text-muted">contact@changexpert.com</p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="d-flex align-items-start mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="me-3 mt-1 bg-ivory p-2 rounded">
                    <i className="pi pi-phone text-muted fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">Call Us</h5>
                    <p className="mb-0 text-muted">+91 7410564103</p>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  className="d-flex align-items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="me-3 mt-1 bg-ivory p-2 rounded">
                    <i className="pi pi-map-marker text-muted fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">Our Location</h5>
                    <p className="mb-0 text-muted">
                      Office No. 101, 1st floor, Shreyas Crest, Pashan-Sus Road,
                      Baner, Pune, Maharashtra 411041
                    </p>
                  </div>
                </motion.div>

                {/* Map */}
                <motion.div
                  className="mt-4 ps-5 rounded"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.5804969806863!2d73.76793451066635!3d18.547849982478233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf123607fa99%3A0xd7948512ba3d0141!2sChangeXpert%20IT%20Training%20%26%20Placement!5e0!3m2!1sen!2sin!4v1754390691624!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    style={{ borderRadius: "8px" }}
                    className="contact-map"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
