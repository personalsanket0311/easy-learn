import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import jsPDF from "jspdf";

interface FormValues {
  paymentId: string;
  studentName: string;
  email: string;
  phoneNumber: string;
  course: string;
  batchType: string;
  feeType: string;
  paymentType: string;
  baseAmount: number;
  manualAmount?: number;
}

interface Receipt {
  receiptNo: string;
  paymentId: string;
  orderId: string;
  date: string;
  studentName: string;
  email: string;
  phoneNumber: string;
  course: string;
  batchType: string;
  feeType: string;
  paymentType: string;
  paymentMode: string; // Added payment mode
  baseAmount: number;
  gst: number;
  totalAmount: number;
}

const ReceiptGenerationForm: React.FC = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<Receipt | null>(null);
  const toast = useRef<Toast>(null);

  // Updated course options with placement availability
  const courseOptions = [
    {
      label: "MERN Stack Developer",
      value: "MERN Stack Developer",
      hasPlacement: true,
    },
    {
      label: "MEAN Stack Developer",
      value: "MEAN Stack Developer",
      hasPlacement: true,
    },
    {
      label: "Python Full Stack Developer",
      value: "Python Full Stack Developer",
      hasPlacement: true,
    },
    {
      label: "React.js Developer",
      value: "React.js Developer",
      hasPlacement: false,
    },
    {
      label: "React Native Developer",
      value: "React Native Developer",
      hasPlacement: false,
    },
    {
      label: "Angular Developer",
      value: "Angular Developer",
      hasPlacement: false,
    },
    {
      label: "Node.js Developer",
      value: "Node.js Developer",
      hasPlacement: false,
    },
    {
      label: "Python Developer",
      value: "Python Developer",
      hasPlacement: false,
    },
    {
      label: "JavaScript & Typescript",
      value: "JavaScript & Typescript",
      hasPlacement: false,
    },
    { label: "Django", value: "Django", hasPlacement: false },
    { label: "DRF", value: "DRF", hasPlacement: false },
    { label: "MongoDB", value: "MongoDB", hasPlacement: false },
    { label: "MySQL", value: "MySQL", hasPlacement: false },
    { label: "AWS", value: "AWS", hasPlacement: false },
    { label: "DevOps", value: "DevOps", hasPlacement: false },
  ];

  const batchTypeOptions = [
    { label: "Weekdays", value: "Weekdays" },
    { label: "Weekends", value: "Weekends" },
    { label: "Fast Track", value: "Fast Track" },
  ];

  // Dynamic fee type options based on course selection
  const getFeeTypeOptions = (course: string) => {
    const selectedCourse = courseOptions.find((c) => c.value === course);
    if (selectedCourse?.hasPlacement) {
      return [
        { label: "WithPlacement", value: "WithPlacement" },
        { label: "WithoutPlacement", value: "WithoutPlacement" },
      ];
    } else {
      return [{ label: "WithoutPlacement", value: "WithoutPlacement" }];
    }
  };

  // Dynamic payment type options based on fee type
  const getPaymentTypeOptions = (feeType: string) => {
    const baseOptions = [
      { label: "Registration Fees", value: "Registration Fees" },
      { label: "Full Pay", value: "Full Pay" },
    ];

    if (feeType === "WithPlacement") {
      return [
        ...baseOptions,
        { label: "Installment 1", value: "Installment 1" },
        { label: "Installment 2", value: "Installment 2" },
        { label: "Installment 3", value: "Installment 3" },
      ];
    } else if (feeType === "WithoutPlacement") {
      return [
        ...baseOptions,
        { label: "Installment 1", value: "Installment 1" },
        { label: "Installment 2", value: "Installment 2" },
      ];
    }

    return baseOptions;
  };

  // Updated fee structure with new courses
  const getFeeStructure = (course: string, feeType: string): number => {
    const feeStructure: { [key: string]: { [key: string]: number } } = {
      // Courses with placement options
      "MERN Stack Developer": {
        WithPlacement: 69999,
        WithoutPlacement:19999
      },
      "MEAN Stack Developer": {
        WithPlacement: 69999,
        WithoutPlacement:19999
      },
      "Python Full Stack Developer": {
        WithPlacement: 74999,
        WithoutPlacement: 24999,
      },
      // Courses without placement (only WithoutPlacement option)
      "React.js Developer": {
        WithoutPlacement: 6999,
      },
      "React Native Developer": {
        WithoutPlacement: 6999,
      },
      "Angular Developer": {
        WithoutPlacement: 6999,
      },
      "Node.js Developer": {
        WithoutPlacement: 8999,
      },
      "Python Developer": {
        WithoutPlacement: 6999,
      },
      "JavaScript & Typescript": {
        WithoutPlacement: 4999,
      },
      Django: {
        WithoutPlacement: 6999,
      },
      DRF: {
        WithoutPlacement: 4999,
      },
      MongoDB: {
        WithoutPlacement: 4999,
      },
      MySQL: {
        WithoutPlacement: 4999,
      },
      AWS: {
        WithoutPlacement: 9999,
      },
      DevOps: {
        WithoutPlacement: 14999,
      },
    };

    return feeStructure[course]?.[feeType] || 0;
  };

  // Generate unique IDs
  const generateReceiptNumber = (): string => {
    return `RCP-${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const generateOrderId = (): string => {
    return `SC${String(Date.now()).slice(-9)}`;
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    paymentId: Yup.string().required("Payment ID is required"),
    studentName: Yup.string().required("Student name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid phone number")
      .required("Phone number is required"),
    course: Yup.string().required("Course is required"),
    batchType: Yup.string().required("Batch type is required"),
    feeType: Yup.string().required("Fee type is required"),
    paymentType: Yup.string().required("Payment type is required"),
    manualAmount: Yup.number().when("paymentType", {
      is: "Registration Fees",
      then: (schema) =>
        schema
          .required("Manual amount is required for registration fees")
          .min(1, "Amount must be greater than 0"),
      otherwise: (schema) => schema.nullable(),
    }),
  });

const handleSubmit = (values: FormValues) => {
    let baseAmount: number;
    let gst: number;
    let totalAmount: number;

    if (values.paymentType === "Registration Fees") {
      // For registration fees, the entered amount is the total amount paid
      totalAmount = values.manualAmount || 0;
      // Calculate GST as included in the total amount (reverse calculation)
      gst = Math.round(((totalAmount * 18) / 118) * 100) / 100;
      baseAmount = totalAmount - gst;
    } else {
      // For course fees, the total amount is fixed, so calculate GST as included
      totalAmount = getFeeStructure(values.course, values.feeType);
      gst = Math.round(((totalAmount * 18) / 118) * 100) / 100;
      baseAmount = totalAmount - gst;
    }

    const receipt: Receipt = {
      receiptNo: generateReceiptNumber(),
      paymentId: values.paymentId,
      orderId: generateOrderId(),
      date: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      studentName: values.studentName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      course: values.course,
      batchType: values.batchType,
      feeType: values.feeType,
      paymentType: values.paymentType,
      paymentMode: "Cash", // Set payment mode as Cash
      baseAmount: baseAmount,
      gst: gst,
      totalAmount: totalAmount,
    };

    setReceiptData(receipt);
    setShowReceipt(true);

    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Receipt generated successfully!",
      life: 3000,
    });
  };

  const downloadPDF = () => {
    if (!receiptData) return;

    const doc = new jsPDF();
    doc.setFont("courier");
    // Header
    doc.setFontSize(21);
    doc.setTextColor(55, 174, 179);
    doc.text("ChangeXpert", 105, 20, { align: "center" });

    doc.setFontSize(13);
    doc.setTextColor(108, 117, 125);
    doc.text("A product of Skramby Technology Solutions Pvt Ltd", 105, 29, {
      align: "center",
    });
    doc.setFontSize(11);
    doc.text(
      "Office No 101, Shreyas Crest, S.No. 48/1/5, Shreyas Crest, 6 & 7, Pashan - Sus Rd,",
      105,
      35,
      { align: "center" }
    );
    doc.setFontSize(11);
    doc.text("Baner, Pune, Maharashtra 411045", 105, 40, { align: "center" });
    doc.text(
      "Phone: +91 96 84706232 | Email: support@changexpert.com",
      107,
      45.5,
      { align: "center" }
    );
    doc.text(
      "GST No: 27ABOCS7080G1ZU | CIN NO: U62010PN2024PTC235864",
      105,
      51,
      { align: "center" }
    );

    doc.setLineWidth(0.25); // 1.5mm thick
    doc.setDrawColor(0); // black color
    doc.line(15, 63, 190, 63); // from (30,63) to (180,63) - adjust y for position

    // Receipt title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("PAYMENT RECEIPT", 105, 75, { align: "center" });

    // Receipt details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPos = 90;

    const addLine = (label: string, value: string) => {
      doc.text(`${label}:`, 20, yPos);
      doc.text(value, 120, yPos);
      yPos += 8;
    };

    addLine("Receipt No", receiptData.receiptNo);
    addLine("Payment ID", receiptData.paymentId);
    addLine("Order ID", receiptData.orderId);
    addLine("Date", receiptData.date);
    addLine("Student Name", receiptData.studentName);
    addLine("Email", receiptData.email);
    addLine("Phone", receiptData.phoneNumber);
    addLine("Course", receiptData.course);
    addLine("Batch Type", receiptData.batchType);
    addLine("Fee Type", receiptData.feeType);
    addLine("Payment Type", receiptData.paymentType);
    addLine("Payment Mode", receiptData.paymentMode); // Added payment mode line

    yPos += 10;
    doc.rect(15, yPos, 180, 30);
    yPos += 8;

    const rupee = "\u20B9"; // Unicode rupee symbol

    addLine("Base Amount", `INR ${receiptData.baseAmount.toFixed(2)}`);
    addLine("GST (18%)", `INR ${receiptData.gst.toFixed(2)}`);

    doc.setFont("courier", "bold"); 
    doc.setFontSize(12);
    doc.text("Total Amount:", 20, yPos + 0);
    doc.text(`INR ${receiptData.totalAmount.toFixed(2)}`, 120, yPos + 0);

    // Border before thank you
    doc.line(15, yPos + 20, 195, yPos + 20); // line before thank you

    // Footer
    doc.setFont("courier", "normal");
    doc.setFontSize(14);
    doc.setTextColor(74, 144, 226);
    doc.text("Thank you for your payment!", 105, yPos + 30, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    doc.text(
      "For any queries, please contact us at support@skramby.com or +91 96 84706232",
      105,
      yPos + 37,
      {
        align: "center",
      }
    );
    doc.text(
      "This is a computer-generated receipt and does not require a signature.",
      105,
      yPos + 41.5,
      {
        align: "center",
      }
    );

    doc.save(`receipt_${receiptData.receiptNo}.pdf`);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="p-4 d-flex justify-content-center">
      <Toast ref={toast} />

      <Card title="Generate Payment Receipt - The ChangeXpert" className="mb-4 w-50">
        <Formik
          initialValues={{
            paymentId: "",
            studentName: "",
            email: "",
            phoneNumber: "",
            course: "",
            batchType: "",
            feeType: "",
            paymentType: "",
            baseAmount: 0,
            manualAmount: undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => {
            // Calculate amount when course or feeType changes
            const isRegistrationFees = values.paymentType === "Registration Fees";
            
            let baseAmount: number;
            let gst: number;
            let totalAmount: number;

            if (isRegistrationFees) {
              // For registration fees, the entered amount is the total amount paid
              totalAmount = values.manualAmount || 0;
              // Calculate GST as included in the total amount (reverse calculation)
              gst = Math.round(((totalAmount * 18) / 118) * 100) / 100;
              baseAmount = totalAmount - gst;
            } else {
              // For course fees, the total amount is fixed, so calculate GST as included
              totalAmount = values.course && values.feeType
                ? getFeeStructure(values.course, values.feeType)
                : 0;
              gst = Math.round(((totalAmount * 18) / 118) * 100) / 100;
              baseAmount = totalAmount - gst;
            }

            // Get dynamic options based on selected course and fee type
            const feeTypeOptions = values.course
              ? getFeeTypeOptions(values.course)
              : [];
            const paymentTypeOptions = values.feeType
              ? getPaymentTypeOptions(values.feeType)
              : [];

            return (
              <Form>
                <div className="d-flex flex-wrap gap-4">
                  <div className="col-12 md:col-6">
                    <div className="field">
                      <label htmlFor="paymentId">Payment ID *</label>
                      <Field name="paymentId">
                        {({ field }: any) => (
                          <InputText
                            id="paymentId"
                            {...field}
                            className={`w-full ${
                              errors.paymentId && touched.paymentId
                                ? "p-invalid"
                                : ""
                            }`}
                            placeholder="Enter payment ID"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="paymentId"
                        component="small"
                        className="p-error"
                      />
                    </div>
                  </div>

                  <div className="col-12 md:col-6">
                    <div className="field">
                      <label htmlFor="studentName">Student Name *</label>
                      <Field name="studentName">
                        {({ field }: any) => (
                          <InputText
                            id="studentName"
                            {...field}
                            className={`w-full ${
                              errors.studentName && touched.studentName
                                ? "p-invalid"
                                : ""
                            }`}
                            placeholder="Enter student name"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="studentName"
                        component="small"
                        className="p-error"
                      />
                    </div>
                  </div>

                  <div className="col-12 md:col-6">
                    <div className="field">
                      <label htmlFor="email">Email *</label>
                      <Field name="email">
                        {({ field }: any) => (
                          <InputText
                            id="email"
                            {...field}
                            type="email"
                            className={`w-full ${
                              errors.email && touched.email ? "p-invalid" : ""
                            }`}
                            placeholder="Enter email address"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="email"
                        component="small"
                        className="p-error"
                      />
                    </div>
                  </div>

                  <div className="col-12 md:col-6">
                    <div className="field">
                      <label htmlFor="phoneNumber">Phone Number *</label>
                      <Field name="phoneNumber">
                        {({ field }: any) => (
                          <InputText
                            id="phoneNumber"
                            {...field}
                            className={`w-full ${
                              errors.phoneNumber && touched.phoneNumber
                                ? "p-invalid"
                                : ""
                            }`}
                            placeholder="Enter phone number"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="phoneNumber"
                        component="small"
                        className="p-error"
                      />
                    </div>
                  </div>

                  <div className="col-12 md:col-6">
                    <div className="field">
                      <label htmlFor="course">Course *</label>
                      <Dropdown
                        id="course"
                        value={values.course}
                        options={courseOptions}
                        onChange={(e) => {
                          setFieldValue("course", e.value);
                          setFieldValue("feeType", ""); // Reset fee type when course changes
                          setFieldValue("paymentType", ""); // Reset payment type
                        }}
                        placeholder="Select course"
                        className={`w-full ${
                          errors.course && touched.course ? "p-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="course"
                        component="small"
                        className="p-error"
                      />
                    </div>
                  </div>

                  <div className="col-12 md:col-6">
                    <div className="field">
                      <label htmlFor="batchType">Batch Type *</label>
                      <Dropdown
                        id="batchType"
                        value={values.batchType}
                        options={batchTypeOptions}
                        onChange={(e) => setFieldValue("batchType", e.value)}
                        placeholder="Select batch type"
                        className={`w-full ${
                          errors.batchType && touched.batchType
                            ? "p-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="batchType"
                        component="small"
                        className="p-error"
                      />
                    </div>
                  </div>

                  <div className="col-12 md:col-6">
                    <div className="field">
                      <label htmlFor="feeType">Fee Type *</label>
                      <Dropdown
                        id="feeType"
                        value={values.feeType}
                        options={feeTypeOptions}
                        onChange={(e) => {
                          setFieldValue("feeType", e.value);
                          setFieldValue("paymentType", ""); // Reset payment type when fee type changes
                        }}
                        placeholder="Select fee type"
                        className={`w-full ${
                          errors.feeType && touched.feeType ? "p-invalid" : ""
                        }`}
                        disabled={!values.course}
                      />
                      <ErrorMessage
                        name="feeType"
                        component="small"
                        className="p-error"
                      />
                    </div>
                  </div>

                  <div className="col-12 md:col-6">
                    <div className="field">
                      <label htmlFor="paymentType">Payment Type *</label>
                      <Dropdown
                        id="paymentType"
                        value={values.paymentType}
                        options={paymentTypeOptions}
                        onChange={(e) => {
                          setFieldValue("paymentType", e.value);
                          if (e.value !== "Registration Fees") {
                            setFieldValue("manualAmount", undefined);
                          }
                        }}
                        placeholder="Select payment type"
                        className={`w-full ${
                          errors.paymentType && touched.paymentType
                            ? "p-invalid"
                            : ""
                        }`}
                        disabled={!values.feeType}
                      />
                      <ErrorMessage
                        name="paymentType"
                        component="small"
                        className="p-error"
                      />
                    </div>
                  </div>

                  {/* Manual Amount Input for Registration Fees */}
                  {values.paymentType === "Registration Fees" && (
                    <div className="col-12 md:col-6">
                      <div className="field">
                        <label htmlFor="manualAmount">
                          Registration Amount *
                        </label>
                        <Field name="manualAmount">
                          {({ field }: any) => (
                            <InputNumber
                              id="manualAmount"
                              value={values.manualAmount}
                              onValueChange={(e) =>
                                setFieldValue("manualAmount", e.value)
                              }
                              mode="currency"
                              currency="INR"
                              locale="en-IN"
                              className={`w-full ${
                                errors.manualAmount && touched.manualAmount
                                  ? "p-invalid"
                                  : ""
                              }`}
                              placeholder="Enter registration amount"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="manualAmount"
                          component="small"
                          className="p-error"
                        />
                      </div>
                    </div>
                  )}

                  {/* Amount Calculation Display */}
                  {baseAmount > 0 && (
                    <div className="col-12">
                      <Card className="bg-blue-50">
                        <div className="d-flex flex-wrap gap-4">
                          <div className="col-12 md:col-4">
                            <div className="field">
                              <label>Base Amount:</label>
                              <div className="text-xl font-bold">
                                ₹{baseAmount.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 md:col-4">
                            <div className="field">
                              <label>GST (18%):</label>
                              <div className="text-xl font-bold">
                                ₹{gst.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 md:col-4">
                            <div className="field">
                              <label>Total Amount:</label>
                              <div className="text-2xl font-bold text-green-600">
                                ₹{totalAmount.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}

                  <div className="col-12">
                    <Button
                      type="submit"
                      label="Generate Reciept"
                      icon="pi pi-file"
                      className="w-full md:w-auto border-0 rounded-3"
                      size="large"
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Card>

      {/* Receipt Preview Dialog */}
      <Dialog
        header="Payment Receipt"
        visible={showReceipt}
        onHide={() => setShowReceipt(false)}
        style={{ width: "90vw", maxWidth: "800px" }}
        footer={
          <div className="flex gap-2">
            <Button
              label="Print"
              icon="pi pi-print"
              onClick={printReceipt}
              className="p-button-secondary border-0 rounded-3"
            />
            <Button
              label="Download PDF"
              icon="pi pi-download"
              onClick={downloadPDF}
              className="bg-deepblue-300 border-0 rounded-3"
            />
            <Button
              label="Close"
              icon="pi pi-times"
              onClick={() => setShowReceipt(false)}
              className="p-button-danger border-0 rounded-3"
            />
          </div>
        }
      >
        {receiptData && (
          <div
            className="receipt-content"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-blue-600 text-2xl font-bold mb-2">
                The ChangeXpert
              </h2>
              <p className="text-sm mb-1 fs-16">
                A product of Skramby Technology Solutions Pvt Ltd
              </p>
              <p className="text-sm mb-1">
                Office No 101, Shreyas Crest, S.No. 48/1/5, Shreyas Crest, 6 & 7, Pashan - Sus Rd,<br />Baner, Pune, Maharashtra 411045
              </p>
              <p className="text-sm mb-1">
                Phone: +91 96 84706232 | Email: support@changexpert.com
              </p>
              <p className="text-sm mb-4">
                GST No: 27ABOCS7080G1ZU | CIN NO: U62010PN2024PTC235864
              </p>
              <hr />
              <h3 className="text-xl font-bold">PAYMENT RECEIPT</h3>
            </div>

            {/* Receipt Details */}
            <div className="d-flex justify-content-center flex-wrap">
              <div className="col-5">
                <p>
                  <strong>Receipt No:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>
                  {receiptData.receiptNo}
                  </p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Payment ID:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.paymentId}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Order ID:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.orderId}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Date:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.date}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Student Name:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.studentName}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Email:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.email}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Phone:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.phoneNumber}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Course:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.course}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Batch Type:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.batchType}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Fee Type:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.feeType}</p>
              </div>

              <div className="col-5">
                <p>
                  <strong>Payment Type:</strong>
                </p>
              </div>
              <div className="col-4">
                <p>{receiptData.paymentType}</p>
              </div>
            </div>

            <Divider />

            {/* Amount Details */}
            <div className="border-2 border-gray-300 p-3 mt-3">
              <div className="flex flex-wrap justify-content-center">
                <div className="col-6">
                  <p>
                    <strong>Base Amount:</strong>
                  </p>
                </div>
                <div className="col-6 ps-4 text-end">
                  <p>₹{receiptData.baseAmount.toFixed(2)}</p>
                </div>

                <div className="col-6">
                  <p>
                    <strong>GST (18%):</strong>
                  </p>
                </div>
                <div className="col-6 ps-4 text-end">
                  <p>₹{receiptData.gst.toFixed(2)}</p>
                </div>

                <div className="col-6">
                  <p className="text-xl font-bold">
                    <strong>Total Amount:</strong>
                  </p>
                </div>
                <div className="col-6 ps-4 text-end">
                  <p className="text-xl font-bold">
                    ₹{receiptData.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-deepblue text-lg font-bold">
                Thank you for your payment!
              </p>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ReceiptGenerationForm;