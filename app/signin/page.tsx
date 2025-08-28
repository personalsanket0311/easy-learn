'use client';

import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import "./style.css";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const { signin, loading } = useAuth();
  const toast = useRef<Toast>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    role: 'student',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6).required('Password is required'),
    role: Yup.string().required(),
  });

  const showToast = (severity: 'success' | 'error', summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  const handleSubmit = async (values: any, { setSubmitting, setFieldError }: any) => {
    setIsSubmitting(true);
    try {
      const result = await signin(values);
      if (result.success) {
        showToast('success', 'Login Successful', result.message || '');
        
        // Check for return path in sessionStorage
        const returnPath = typeof window !== 'undefined' ? sessionStorage.getItem('returnPath') : null;
        
        setTimeout(() => {
          if (returnPath) {
            // Clear the stored return path
            sessionStorage.removeItem('returnPath');
            // Redirect to the stored path
            router.push(returnPath);
          } else {
            // Default redirect to home page
            router.push('/');
          }
        }, 1000);
      } else {
        showToast('error', 'Login Failed', result.message || 'Invalid credentials');
        if (result.message?.toLowerCase().includes('email')) {
          setFieldError('email', result.message);
        }
        if (result.message?.toLowerCase().includes('password')) {
          setFieldError('password', result.message);
        }
      }
    } catch (err) {
      showToast('error', 'Error', 'Something went wrong');
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
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
                <div className="text-center text-white mb-4">
                  <div className="mb-2 d-flex justify-content-center">
                    <Link href="/">
                      <img
                        src="changexpert-mono.svg"
                        alt="changexpert-logo"
                        style={{ width: "190px" }}
                      />
                    </Link>
                  </div>
                  <small className="text-white-50">Login to continue</small>
                </div>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isSubmitting: formSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <div className="auth-input-wrapper">
                          <Mail className="auth-icon-left" size={16} />
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="form-control auth-form-control border-secondary"
                          />
                        </div>
                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="mb-3">
                        <div className="auth-input-wrapper">
                          <Lock className="auth-icon-left" size={16} />
                          <Field
                            name="password"
                            type={showPassword ? 'text' : 'password'}
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

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting || loading}
                        className="btn w-100 btn-lg mt-3 mb-2 fw-semibold text-white navbar-login-button"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="d-flex align-items-center justify-content-center gap-2"
                            >
                              <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                              <span>Signing In...</span>
                            </motion.div>
                          ) : (
                            <motion.span
                              key="button-text"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="d-flex align-items-center justify-content-center gap-2 fs-6 "
                            >
                              Login <ArrowRight size={16} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <div className="text-center mt-3">
                        <small className="text-white-50">
                          Don't have an account?{' '}
                          <Link href="/signup" className="text-white fw-medium ms-1">
                            Register Now
                          </Link>
                        </small>
                      </div>
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

export default SignInPage;