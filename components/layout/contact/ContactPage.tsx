"use client";
import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Phone } from "lucide-react";
import { Toast } from "primereact/toast";
import InquiryService from "@/services/inquiry-service";
import "./Style.css";
import { Button } from "primereact/button";

const ContactPage = () => {
  const toast = useRef<Toast>(null);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^[6-9][0-9]{9}$/, "Enter valid 10-digit mobile number")
      .required("Mobile number is required"),
  });

  const initialValues = {
    fullName: "",
    email: "",
    mobileNumber: "",
  };

  // API submission handler
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      const payload = {
        ...values,
        mobileNumber: parseInt(values.mobileNumber), //convert string to number
      };

      const response = await InquiryService.createInquiry(payload);

      toast.current?.show({
        severity: "success",
        summary: "Message Sent!",
        detail: "Thank you for contacting us.",
        life: 3000,
      });

      resetForm();
    } catch (err: any) {
      console.error("Submission Error:", err.response?.data || err.message);

      toast.current?.show({
        severity: "error",
        summary: "Submission Failed",
        detail: "Please try again later.",
        life: 3000,
      });
    }
  };

  return (
    <div className="container py-5 home-contact">
      <Toast ref={toast} />

      <div className="row g-4 align-items-center pb-5">
        {/* Left Content */}
        <div className="col-12 col-lg-6">
          <h1 className="fw-bold mb-2">Get in touch with us today!</h1>
          <p className="fs-5 mb-5 pe-2">
            Whatever you need, whenever you need it, our team is here to help
            dedicated to supporting you every step of the way.
          </p>

          <div className="row g-3 pt-5">
            <div className="col-sm-6">
              <div className="p-3 home-contact-left-card">
                <h4 className="fw-bold mb-3">Email Us</h4>
                <p className="mb-5">
                  Use the email address below to reach out to us.
                </p>
                <hr />
                <a
                  href="mailto:contact@changexpert.com"
                  className="text-decoration-none fw-medium text-muted"
                >
                  <Mail size={20} style={{ marginRight: 4 }} />
                  contact@changexpert.com
                </a>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="p-3 home-contact-left-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-3">Call us</h4>
                  <p className="mb-5">
                    We're here to help you. Give us a call!
                  </p>
                  <hr />
                </div>
                <div>
                  <a
                  href="tel:+919684706232"
                  className="text-decoration-none fw-medium text-muted"
                >
                  <i className="pi pi-phone"></i> +91 9684706232
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="col-12 col-lg-6">
          <div className="bg-white rounded-4 p-4 home-contact-left-card">
            <h4 className="fw-semibold mb-4 text-center">Contact Us</h4>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="row g-4 mb-3">
                    <div className="col-12">
                      <label>
                        Full Name<sup className="text-danger">*</sup>
                      </label>
                      <Field
                        type="text"
                        name="fullName"
                        className="form-control py-2"
                        placeholder="Enter your full name"
                      />
                      <small className="text-danger">
                        <ErrorMessage name="fullName" />
                      </small>
                    </div>
                    <div className="col-12">
                      <label>
                        Email<sup className="text-danger">*</sup>
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control py-2"
                        placeholder="Enter your email"
                      />
                      <small className="text-danger">
                        <ErrorMessage name="email" />
                      </small>
                    </div>
                    <div className="col-12 pb-4">
                      <label>
                        Mobile<sup className="text-danger">*</sup>
                      </label>
                      <Field
                        type="text"
                        name="mobileNumber"
                        className="form-control py-2"
                        placeholder="Enter your mobile number"
                      />
                      <small className="text-danger">
                        <ErrorMessage name="mobileNumber" />
                      </small>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="border-0 w-100 bg-darkgreen text-white rounded-pill d-flex justify-content-center align-items-center py-2"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
