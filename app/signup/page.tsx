'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Toast } from 'primereact/toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Phone, User, ArrowRight, Eye, EyeClosed } from 'lucide-react';
import './style.css';

const SignupPage: React.FC = () => {
  const { signup, loading } = useAuth();
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2).required('First name is required'),
    lastName: Yup.string().min(2).required('Last name is required'),
    mobileNo: Yup.string()
      .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
      .required('Mobile number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/, 'Weak password')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const showToast = (severity: 'success' | 'error', summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 4000 });
  };

  const handleSubmit = async (values: any, { setSubmitting, setFieldError }: any) => {
    setIsSubmitting(true);
    try {
      const result = await signup({
        ...values,
        emailPassword: values.password,
        role: 'student',
      });

      if (result.success) {
        showToast('success', 'Success', result.message || 'Account created!');
        setTimeout(() => router.push('/signin'), 2000);
      } else {
        showToast('error', 'Failed', result.message || 'Signup failed');
        if (result.message?.toLowerCase().includes('email')) {
          setFieldError('email', result.message);
        }
      }
    } catch (error) {
      showToast('error', 'Error', 'Something went wrong');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 bg-home">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container"
        >
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-5">
              <div className="bg-black rounded-4 p-4">
                <div className="text-white mb-3 text-center">
                  <h3 className="fw-bold fs-3">Create your account</h3>
                  <small className="text-white-50">Register to get started</small>
                </div>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isSubmitting: formSubmitting }) => (
                    <Form>
                      <div className="mb-2">
                        <div className="auth-input-wrapper">
                          <User className="auth-icon-left" size={16} />
                          <Field
                            name="firstName"
                            placeholder="First Name"
                            className="form-control auth-form-control border-secondary"
                          />
                        </div>
                        <ErrorMessage name="firstName" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="mb-2">
                        <div className="auth-input-wrapper">
                          <User className="auth-icon-left" size={16} />
                          <Field
                            name="lastName"
                            placeholder="Last Name"
                            className="form-control auth-form-control border-secondary"
                          />
                        </div>
                        <ErrorMessage name="lastName" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="mb-2">
                        <div className="auth-input-wrapper">
                          <Phone className="auth-icon-left" size={16} />
                          <Field
                            name="mobileNo"
                            placeholder="Mobile Number"
                            className="form-control auth-form-control border-secondary"
                          />
                        </div>
                        <ErrorMessage name="mobileNo" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="mb-2">
                        <div className="auth-input-wrapper">
                          <Mail className="auth-icon-left" size={16} />
                          <Field
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control auth-form-control border-secondary"
                          />
                        </div>
                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="mb-2">
                        <div className="auth-input-wrapper">
                          <Lock className="auth-icon-left" size={16} />
                          <Field
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className="form-control auth-form-control border-secondary"
                          />
                          <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="auth-icon-right"
                          >
                            {showPassword ? <Eye size={16} className='text-white' /> : <EyeClosed size={16} />}
                          </div>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="mb-2">
                        <div className="auth-input-wrapper">
                          <Lock className="auth-icon-left" size={16} />
                          <Field
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="form-control auth-form-control border-secondary"
                          />
                          <div
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="auth-icon-right"
                          >
                            {showConfirmPassword ? <Eye size={16} className='text-white' /> : <EyeClosed size={16} />}
                          </div>
                        </div>
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger small mt-1" />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting || formSubmitting || loading}
                        className="btn w-100 btn-lg mt-2 fw-semibold text-white navbar-login-button">
                        <AnimatePresence mode="wait">
                          {(isSubmitting || formSubmitting) ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="d-flex align-items-center justify-content-center gap-2"
                            >
                              <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                              <span>Creating account...</span>
                            </motion.div>
                          ) : (
                            <motion.span
                              key="text"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="d-flex align-items-center justify-content-center gap-2 fs-6"
                            >
                              Create Account <ArrowRight size={16} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <p className="text-center text-white-50 small mt-2">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-white fw-medium ms-1">
                          Login
                        </Link>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignupPage;