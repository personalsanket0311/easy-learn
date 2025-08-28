'use client';
import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Toast } from "primereact/toast";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import InquiryService from "@/services/inquiry-service";
import './style.css';

interface BookDemoProps {
  visible: boolean;
  onClose: () => void;
}

const initialValues = {
  fullName: '',
  email: '',
  mobileNumber: '',
  course: '',
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, 'Enter valid 10-digit mobile number')
    .required('Mobile number is required'),
  course: Yup.string().required('Course name is required'),
});

const BookDemo: React.FC<BookDemoProps> = ({ visible, onClose }) => {
  const toast = useRef<Toast>(null);

  const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
    try {
      setSubmitting(true);
      
      // Convert data to match API requirements
      const apiData = {
        fullName: values.fullName,
        email: values.email,
        mobileNumber: parseInt(values.mobileNumber),
        interestedCourse: values.course,
      };

      const response = await InquiryService.createDemoCourseInquiry(apiData);
      
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Demo request submitted successfully!",
        life: 3000,
      });
      
      resetForm();
      onClose();
    } catch (error: any) {
      console.error("Error submitting demo enquiry:", error);
      
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "Failed to submit demo request. Please try again.",
        life: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Book Your Free Demo – Let's Get Started!"
        visible={visible}
        style={{ width: '70vw', maxWidth: '600px' }}
        onHide={onClose}
        breakpoints={{ '960px': '95vw', '640px': '100vw' }}
        className="inquiry-dialog text-center"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="inquiry-form mt-3">
              <div className="row gy-4">
                <div className="col-md-6 text-start">
                  <label>Full Name<sup className="text-danger">*</sup></label>
                  <Field name="fullName" className="form-control input-field" />
                  <div className="text-danger"><ErrorMessage name="fullName" /></div>
                </div>

                <div className="col-md-6 text-start">
                  <label>Email<sup className="text-danger">*</sup></label>
                  <Field name="email" type="email" className="form-control input-field" />
                  <div className="text-danger"><ErrorMessage name="email" /></div>
                </div>

                <div className="col-md-6 text-start">
                  <label>Mobile Number<sup className="text-danger">*</sup></label>
                  <Field
                    name="mobileNumber"
                    className="form-control input-field"
                    maxLength={10}
                    inputMode="numeric"
                  />
                  <div className="text-danger"><ErrorMessage name="mobileNumber" /></div>
                </div>

                <div className="col-md-6 text-start">
                  <label>Interested Course<sup className="text-danger">*</sup></label>
                  <Field as="select" name="course" className="form-select input-field">
                    <option value="">Select Course</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="MEAN Stack">MEAN Stack</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                  </Field>
                  <div className="text-danger"><ErrorMessage name="course" /></div>
                </div>

                <div className="col-12 text-center">
                  <Button 
                    type="submit" 
                    label={isSubmitting ? "Submitting..." : "Submit"} 
                    className="mt-2 submit-button" 
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default BookDemo;