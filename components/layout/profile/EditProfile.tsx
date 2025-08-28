"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import CustomButton from "@/components/ui/custom-button/CustomButton";
import studentservice from "@/services/student-service";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";
import { Button } from "primereact/button";

interface EditProfileProps {
  onClose?: () => void;
  visible?: boolean;
  initialData: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
  onProfileUpdate: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  onClose,
  visible,
  initialData,
  onProfileUpdate,
}) => {
  const handleHide = onClose ?? (() => {});

  const formik = useFormik({
    initialValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      mobileNumber: initialData.mobileNumber || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await studentservice.updateStudentProfile(values);
        onProfileUpdate(); // Refresh parent data
        handleHide(); // Close dialog
      } catch (err) {
        console.error("Profile update failed:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog
      header="Edit Profile"
      visible={visible}
      onHide={handleHide}
      style={{ width: "50vw", maxWidth: "95vw" }}
      className="dialog-container responsive-dialog"
    >
      <form onSubmit={formik.handleSubmit} className="profile-row">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="p-inputtext p-component w-100 my-2"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <small className="text-danger">{formik.errors.firstName}</small>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="p-inputtext p-component w-100 mb-2"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <small className="text-danger">{formik.errors.lastName}</small>
        )}

        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          className="p-inputtext p-component w-100 mb-2"
          value={formik.values.mobileNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={10}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            e.currentTarget.value = e.currentTarget.value.replace(
              /[^0-9]/g,
              ""
            );
          }}
        />
        {formik.touched.mobileNumber && formik.errors.mobileNumber && (
          <small className="text-danger">{formik.errors.mobileNumber}</small>
        )}

        <div className="d-flex justify-content-end align-items-center gap-2 pt-3">
          <Button
            label="Cancel"
            type="button"
             onClick={handleHide}
            className="p-button-outlined rounded-pill px-5"
            severity="secondary"
          />
          <CustomButton
            type="submit"
            label={formik.isSubmitting ? "Updating..." : "Update"}
            className="bg-blue py-2 px-5 border-0"
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditProfile;
