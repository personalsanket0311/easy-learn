"use client";

import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import InquiryService from "@/services/inquiry-service";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
   mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});

const FreeDemoCourse: React.FC = () => {
  const toast = useRef<Toast>(null);

  const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
    try {
      setSubmitting(true);
      
      // Convert mobileNumber to number for API
      const apiData = {
        fullName: values.fullName,
        email: values.email,
        mobileNumber: parseInt(values.mobileNumber),
      };

      const response = await InquiryService.createDemoCourseInquiry(apiData);
      
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Demo Course booked successfully!",
        life: 3000,
      });
      
      resetForm();
    } catch (error: any) {
      console.error("Error submitting demo course inquiry:", error);
      
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "Failed to book demo course. Please try again.",
        life: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container bg-light position-relative pb-5">
      <Toast ref={toast} />

      <div className="row align-items-center justify-content-center bg-white rounded-5 shadow-lg pb-5 ">
        {/* Left Section */}
        <div className="col-lg-7 mb-4 mb-lg-0 ps-0 free-course-left-wrapper">
          <div className="bg-darkgreen text-white p-5 rounded-5 h-100 left-wrapper">
            {/* <span className="text-warning fw-bold">Sign up for a demo</span> */}
            <h1 className="display-5 fw-semibold mt-3">
              Javascript Course <br />
              <span className="cx-text-dark">Starting From <strong className="text-warning">₹199</strong> Only</span>
            </h1>

            <ul className="list-unstyled mt-4">
              <li className="mb-4">
                <h5 className="fw-semibold">⏰ Starts From 15th August 2025</h5>
                <p>Enroll now to begin your journey with us!</p>
              </li>
              <li className="mb-4">
                <h5 className="fw-semibold">👩🏻‍🎓 Anyone Can Join</h5>
                <p>Anyone can join and be a part of this free course!</p>
              </li>
              <li className="mb-4">
                <h5 className="fw-semibold">
                  👨🏻‍💻 Trainer with 15+ Years of Experience
                </h5>
                <p>
                  Learn from an expert with over 15 years of industry
                  experience!
                </p>
              </li>
            </ul>

            <div className="mt-4">
              <span className="badge bg-accent text-dark p-3 rounded fs-6 rounded-4 text-wrap">
                500+ Students Already Register From PAN India
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Booking Form */}
        <div className="col-lg-5">
          <div className="bg-white p-4 rounded-4 animated-form">
            <h4 className="mb-4 text-center fw-semibold">Book Free Course</h4>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                mobileNumber: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <FormikForm className="p-fluid">
                  <div className="mb-3">
                    <label className="form-label">
                      Full Name<sup className="text-danger">*</sup>
                    </label>
                    <Field
                      name="fullName"
                      className="form-control"
                      placeholder="Enter your full name"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="fullName" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Email<sup className="text-danger">*</sup>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="email" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Mobile<sup className="text-danger">*</sup>
                    </label>
                    <Field
                      name="mobileNumber"
                      className="form-control"
                      placeholder="Enter your mobile number"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="mobileNumber" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    label={isSubmitting ? "Booking..." : "Book a demo"}
                    className="bg-darkgreen d-flex align-items-center justify-content-center py-2 rounded-pill fw-semibold w-100 animated-btn border-0"
                    disabled={isSubmitting}
                  />
                </FormikForm>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FreeDemoCourse;