'use client';
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InquiryService from '@/services/inquiry-service';
import { Button } from 'primereact/button';
import './style.css';

const initialValues = {
    fullName: '',
    email: '',
    mobileNumber: '',
    heardFrom: '',
    enquiryNote: '',
};

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: Yup.string()
        .matches(/^[6-9][0-9]{9}$/, 'Enter valid 10-digit mobile number')
        .required('Mobile number is required'),
    heardFrom: Yup.string().required('This field is required'),
    enquiryNote: Yup.string(),
});

const InquiryForm: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const submitted = localStorage.getItem('inquiryFormSubmitted') === 'true';
        setIsSubmitted(submitted);
    }, []);

    useEffect(() => {
        if (isSubmitted) return;
        const timer = setTimeout(() => setVisible(true), 10000);
        return () => clearTimeout(timer);
    }, [isSubmitted]);

    const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
        try {
            const response = await InquiryService.createInquiry(values);
            setVisible(false);
            setIsSubmitted(true);
            localStorage.setItem('inquiryFormSubmitted', 'true');
            resetForm();
        } catch (error: any) {
            console.error('Submission failed:', error);
            alert(error?.response?.data?.message || 'Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="inquiry-container">
            <Dialog
                header="Get in Touch – Start Your Learning Journey"
                visible={visible}
                style={{ width: '70vw', maxWidth: '600px' }}
                onHide={() => setVisible(false)}
                breakpoints={{ '960px': '95vw', '640px': '100vw' }}
                className="inquiry-dialog text-center"
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="inquiry-form mt-3">
                        <div className="row gy-4">
                            {[
                                { name: "fullName", label: "Full Name *", type: "text", required: true },
                                { name: "email", label: "Email *", type: "email", required: true },
                                { name: "mobileNumber", label: "Mobile Number *", type: "tel", required: true },
                                { name: "heardFrom", label: "How did you hear about us? *", type: "text", required: true },
                            ].map((field) => (
                                <div key={field.name} className="col-md-6 text-start">
                                    <label htmlFor={field.name}>{field.label}</label>
                                    <Field
                                        name={field.name}
                                        type={field.type}
                                        className="form-control input-field"
                                        maxLength={field.name === "mobileNumber" ? 10 : undefined}
                                        inputMode={field.name === "passoutYear" || field.name === "mobileNumber" ? "numeric" : undefined}
                                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                            if (field.name === "mobileNumber" || field.name === "passoutYear") {
                                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, field.name === "mobileNumber" ? 10 : 4);
                                            }
                                        }}
                                    />
                                    <div className="text-danger"><ErrorMessage name={field.name} /></div>
                                </div>
                            ))}

                            <div className="col-12 text-start">
                                <label htmlFor="enquiryNote">Enquiry Note</label>
                                <Field name="enquiryNote" as="textarea" rows={3} className="form-control input-field" />
                                <div className="text-danger"><ErrorMessage name="enquiryNote" /></div>
                            </div>

                            <div className="col-12 text-center mt-3">
                                <Button type="submit" className="submit-button">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
};

export default InquiryForm;
