"use client";
import React, { useEffect, useState } from "react";
import LiveClasses from "./LiveClasses";
import CourseDetails from "./CourseDetails";
import PurchaseDetails from "./PurchaseDetails";
import PaymentPlan from "./PaymentPlan";
import { useParams } from "next/navigation";
import studentservice from "@/services/student-service";
import BackButton from "@/components/ui/backButton/BackButton";
import ReceiptModal from "@/components/ui/receipt-modal/ReceiptModal";
import CustomButton from "@/components/ui/custom-button/CustomButton";

const PurchaseCourseDetails = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<any>(null);
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!courseId) return;

      try {
        setLoading(true);

        // Fetch both course and student data simultaneously
        const [courseRes, profileRes] = await Promise.all([
          studentservice.getStudentCourseById(courseId as string),
          studentservice.getStudentProfile(),
        ]);

        const studentCourse = courseRes.data?.studentCourse;
        const student = profileRes.data?.student;

        setCourseData(studentCourse);
        setStudentProfile(student);

        setReceiptData({
          receiptNumber: `RCP-${Date.now()}`,
          paymentId: studentCourse?.coursePayment?.installments?.[0]?.payment || "--",
          orderId: studentCourse?._id,
          studentName: `${student?.firstName ?? ""} ${student?.lastName ?? ""}`,
          studentEmail: student?.email ?? "",
          courseName: studentCourse?.course?.courseName,
          batchType: studentCourse?.courseBatch?.batchType,
          paymentType: studentCourse?.paymentType,
          amount: studentCourse?.coursePayment?.installments?.[0]?.payableAmount || 0,
          paymentDate: new Date(
            studentCourse?.coursePayment?.installments?.[0]?.paidDate || Date.now()
          ).toLocaleString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          feeType: studentCourse?.courseFee?.feesType,
        });
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load course or profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [courseId]);

  const transformInstallments = (installments: any[]) =>
    installments?.map((inst) => ({
      id: inst._id,
      transactionType: inst.transactionType,
      paidDate: inst.paidDate,
      payableDate: inst.payableDate,
      payableAmount: inst.payableAmount,
      paymentStatus: inst.payment
        ? "Paid"
        : new Date(inst.payableDate) <= new Date()
        ? "Due"
        : "Pending",
    })) || [];

  const handlePaymentSuccess = () => {
    // Refresh course data only
    if (!courseId) return;
    studentservice.getStudentCourseById(courseId as string).then((res) => {
      const studentCourse = res.data?.studentCourse;
      setCourseData(studentCourse);

      // Update amount & payment info in receipt
      setReceiptData((prev: any) => ({
        ...prev,
        paymentId: studentCourse?.coursePayment?.installments?.[0]?.payment || "--",
        amount: studentCourse?.coursePayment?.installments?.[0]?.payableAmount || 0,
        paymentDate: new Date(
          studentCourse?.coursePayment?.installments?.[0]?.paidDate || Date.now()
        ).toLocaleString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="text-center text-danger my-5">
        {error || "No course data found."}
      </div>
    );
  }

  const transformedInstallments = transformInstallments(courseData.coursePayment?.installments);
  const hasInstallments = transformedInstallments.length > 1;

  return (
    <div className="container my-2">
      <BackButton />
      <h2 className="container fw-semibold">{courseData.course?.courseName}</h2>

      {/* <LiveClasses /> */}

      <CourseDetails
        course={courseData.course}
        trainer={courseData.courseBatch.trainer}
      />

      <PurchaseDetails
        paidAmount={courseData.coursePayment.paidAmount}
        purchaseDate={courseData.studentAdmissionDate}
      />

      <div className="pt-5 d-flex justify-content-center">
        <CustomButton
          label="Preview Receipt"
          icon="pi pi-eye"
          onClick={() => setShowReceipt(true)}
          className="download-btn border-0 py-2 px-4"
        />
      </div>

      {hasInstallments && (
        <PaymentPlan
          installments={transformedInstallments}
          courseId={courseData.course._id}
          batchId={courseData.courseBatch._id}
          courseFeeId={courseData.courseFee._id}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {receiptData && (
        <ReceiptModal
          visible={showReceipt}
          onHide={() => setShowReceipt(false)}
          receiptData={receiptData}
        />
      )}
    </div>
  );
};

export default PurchaseCourseDetails;
