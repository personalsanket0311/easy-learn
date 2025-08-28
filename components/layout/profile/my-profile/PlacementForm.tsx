"use client"
import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import "../style.css";
import studentservice from "@/services/student-service";
import PlacementFormModal from "./PlacementFormModal";
import { Toast } from "primereact/toast";

interface studentRegFormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  permanentAddress: string;
  currentAddress: string;
  city: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  highestQualification: string;
  specialization: string;
  passingYear: string;
  collageName: string;
  university: string;
  cgpaPercentage: string;
  sscPercentage: string;
  hscPercentage: string;
  technicalFields: string;
  softSkills: string;
  programmingLanguages: string;
  projectTitle: string;
  projectDescription: string;
  technologiesUsed: string;
  githubLink: string;
  companyName: string;
  role: string;
  duration: string;
  description: string;
  resume: File | null;
  certificates: File | null;
  declaration: boolean;
}

interface PlacementFormProps {
  studentRegFormData?: studentRegFormData;
  id: string;
}

const initialValues = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  permanentAddress: "",
  currentAddress: "",
  city: "",
  state: "",
  pincode: "",
  mobileNumber: "",
  highestQualification: "",
  specialization: "",
  passingYear: "",
  collageName: "",
  university: "",
  cgpaPercentage: "",
  sscPercentage: "",
  hscPercentage: "",
  technicalFields: "",
  softSkills: "",
  programmingLanguages: "",
  projectTitle: "",
  projectDescription: "",
  technologiesUsed: "",
  githubLink: "",
  companyName: "",
  role: "",
  duration: "",
  description: "",
  resume: null,
  certificates: null,
  declaration: false
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  permanentAddress: Yup.string().required("Required"),
  currentAddress: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  mobileNumber: Yup.string().required("Required"),
  highestQualification: Yup.string().required("Required"),
  specialization: Yup.string().required("Required"),
  passingYear: Yup.string().required("Required"),
  collageName: Yup.string().required("Required"),
  university: Yup.string().required("Required"),
  cgpaPercentage: Yup.string().required("Required"),
  declaration: Yup.bool().oneOf([true], "Declaration must be accepted")
});

const genderOptions = ["Male", "Female", "Other"];
const qualificationOptions = ["B.Tech", "B.E", "M.Tech", "MCA"];

const PlacementForm: React.FC<PlacementFormProps> = ({
  studentRegFormData,
  id
}) => {
  const [showFormData, setShowFormData] = useState(false);
  const [placementFormData, setPlacementFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExistingData, setIsExistingData] = useState(false);

  const toast = useRef<Toast>(null);

  function showToast(severity: "success" | "error" | "info" | "warn", summary: string, detail: string) {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 2000,
    });
  }

  const handleOnSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const formData = { ...values, stdRegId: id };

      if (isExistingData) {
        // Update existing data
        await studentservice.updatePlacementDetailsFormById(formData, id);
        showToast("success", "Success", "Form updated successfully!");
      } else {
        // Create new data
        await studentservice.createPlacementDetailsForm(formData);
        // console.log("Form submitted successfully:", formData);
        showToast("success", "Success", "Form submitted successfully!");
        setIsExistingData(true); // Mark as existing for future submissions
      }
      setPlacementFormData(formData);
    }
    catch (err) {
      console.error("Form submission failed:", err);
      showToast("error", "Error", "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mt-4">
      <Toast ref={toast} position="top-center" />
      <h3 className="mb-3 text-center">Student Registration Form</h3>
      <Formik
        initialValues={{ ...initialValues, ...(studentRegFormData || {}) }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
        enableReinitialize
      >
        {({ setFieldValue, resetForm, values }) => {
          const handleCancel = () => {
            resetForm();
          };
          const handlePreview = () => {
            // If the form is empty, show last submitted data; else show current values
            const isFormEmpty = Object.values(values).every(
              v => v === "" || v === null || v === false
            );
            setPlacementFormData(isFormEmpty ? placementFormData : values);
            setShowFormData(true);
          };
          return (
            <Form>
              <Accordion multiple activeIndex={[0]}>
                {/* Personal Information */}
                <AccordionTab header="Personal Information">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label>Full Name *</label>
                      <Field name="fullName" className="form-control" />
                      <ErrorMessage name="fullName" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>Date of Birth *</label>
                      <Field name="dateOfBirth" type="date" className="form-control" />
                      <ErrorMessage name="dateOfBirth" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>Gender *</label>
                      <Field name="gender" as="select" className="form-select">
                        <option value="">Select Gender</option>
                        {genderOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="gender" component="div" className="text-danger" />
                    </div>
                  </div>
                </AccordionTab>

                {/* Contact Details */}
                <AccordionTab header="Contact Details">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label>Permanent Address *</label>
                      <Field name="permanentAddress" as="textarea" className="form-control" />
                      <ErrorMessage name="permanentAddress" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-12">
                      <label>Current Address *</label>
                      <Field name="currentAddress" as="textarea" className="form-control" />
                      <ErrorMessage name="currentAddress" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>City *</label>
                      <Field name="city" className="form-control" />
                      <ErrorMessage name="city" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>State *</label>
                      <Field name="state" className="form-control" />
                      <ErrorMessage name="state" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>Pincode *</label>
                      <Field name="pincode" className="form-control" />
                      <ErrorMessage name="pincode" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>Mobile Number *</label>
                      <Field name="mobileNumber" className="form-control" />
                      <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                    </div>
                  </div>
                </AccordionTab>

                {/* Educational Details */}
                <AccordionTab header="Educational Details">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>Highest Qualification *</label>
                      <Field name="highestQualification" as="select" className="form-select">
                        <option value="">Select Qualification</option>
                        {qualificationOptions.map((q, index) => (
                          <option key={index} value={q}>{q}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="highestQualification" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-6">
                      <label>Specialization *</label>
                      <Field name="specialization" className="form-control" />
                      <ErrorMessage name="specialization" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>Year of Passing *</label>
                      <Field name="passingYear" className="form-control" />
                      <ErrorMessage name="passingYear" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>College Name *</label>
                      <Field name="collageName" className="form-control" />
                      <ErrorMessage name="collageName" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label>University *</label>
                      <Field name="university" className="form-control" />
                      <ErrorMessage name="university" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-6">
                      <label>CGPA / Percentage *</label>
                      <Field name="cgpaPercentage" className="form-control" />
                      <ErrorMessage name="cgpaPercentage" component="div" className="text-danger" />
                    </div>
                  </div>
                </AccordionTab>

                {/* Academic History */}
                <AccordionTab header="Academic History">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>10th Details (Board / Year / Percentage)</label>
                      <Field name="sscPercentage" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label>12th / Diploma Details (Board / Year / Percentage)</label>
                      <Field name="hscPercentage" className="form-control" />
                    </div>
                  </div>
                </AccordionTab>

                {/* Skills */}
                <AccordionTab header="Skills">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label>Technical Skills</label>
                      <Field name="technicalFields" className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label>Soft Skills</label>
                      <Field name="softSkills" className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label>Programming Languages</label>
                      <Field name="programmingLanguages" className="form-control" />
                    </div>
                  </div>
                </AccordionTab>

                {/* Project Details */}
                <AccordionTab header="Project Details">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>Project Title</label>
                      <Field name="projectTitle" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label>Technologies Used</label>
                      <Field name="technologiesUsed" className="form-control" />
                    </div>
                    <div className="col-md-12">
                      <label>Project Description</label>
                      <Field name="projectDescription" as="textarea" className="form-control" />
                    </div>
                    <div className="col-md-12">
                      <label>Portfolio / GitHub Link</label>
                      <Field name="githubLink" className="form-control" />
                    </div>
                  </div>
                </AccordionTab>

                {/* Internships / Training */}
                <AccordionTab header="Internships / Training">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label>Company Name</label>
                      <Field name="companyName" className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label>Role / Position</label>
                      <Field name="role" className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label>Duration</label>
                      <Field name="duration" className="form-control" />
                    </div>
                    <div className="col-md-12">
                      <label>Description</label>
                      <Field name="description" as="textarea" className="form-control" />
                    </div>
                  </div>
                </AccordionTab>

                {/* Documents */}
                <AccordionTab header="Documents Upload">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>Resume (PDF / DOCX)</label>
                      <input type="file" className="form-control" onChange={(e) => setFieldValue("resume", e.target.files?.[0])} />
                    </div>
                    <div className="col-md-6">
                      <label>Certificates (optional)</label>
                      <input type="file" className="form-control" onChange={(e) => setFieldValue("certificates", e.target.files?.[0])} />
                    </div>
                  </div>
                </AccordionTab>

                {/* Declaration */}
                <AccordionTab header="Declaration">
                  <div className="form-check">
                    <Field type="checkbox" name="declaration" className="form-check-input" id="declaration" />
                    <label htmlFor="declaration" className="form-check-label">
                      I confirm that the information provided above is true to the best of my knowledge.
                    </label>
                    <ErrorMessage name="declaration" component="div" className="text-danger" />
                  </div>
                </AccordionTab>
              </Accordion>

              <div className="d-flex justify-content-center mt-4 mb-3 gap-3 flex-wrap register-form-buttons">
                <Button label="Pre View" type="button"
                  onClick={handlePreview}
                  icon="pi pi-eye"
                  className="p-button-success bg-success border-0 rounded-pill px-5" />
                <Button
                  label={isSubmitting ? (isExistingData ? "Updating..." : "Submitting...") : (isExistingData ? "Update" : "Submit")}
                  type="submit"
                  className="p-button-primary bg-blue border-0 rounded-pill px-5"
                  disabled={isSubmitting}
                />
                <Button label="Cancel" type="button"
                  onClick={handleCancel}
                  className="p-button-outlined rounded-pill px-5"
                  severity="secondary"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      {placementFormData &&
        <PlacementFormModal
          visible={showFormData}
          onHide={() => setShowFormData(false)}
          placementFormData={placementFormData}
        />
      }
    </div>
  );
};

export default PlacementForm;