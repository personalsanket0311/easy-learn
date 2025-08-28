'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CourseService from '@/services/course-service';
import BackButton from '@/components/ui/backButton/BackButton';
import KeyFeatures from '@/components/layout/courseDetails/KeyFeatures';
import CourseDetails from '@/components/layout/courseDetails/CourseDetails';
import FeesStructure from '@/components/layout/courseDetails/fees-structure/FeesStructure';
import SyllabusDownload from '@/components/layout/courseDetails/SyllabusDownload';
import { motion } from 'framer-motion';

interface InstallmentOption {
  number: number;
  amount: number;
}

interface FeeOption {
  type: string;
  totalFee: number;
  installments: InstallmentOption[];
}

const transformFeeData = (courseFees: any[]): { withPlacement: FeeOption[]; withoutPlacement: FeeOption[] } => {
  const withPlacement: FeeOption[] = [];
  const withoutPlacement: FeeOption[] = [];

  courseFees.forEach((fee) => {
    const installmentsRaw = fee.feeInstallments?.[0]?.courseFeesInstallments || [];
    const installments: InstallmentOption[] = installmentsRaw.map((amount: number, index: number) => ({
      number: index + 1,
      amount,
    }));

    const option: FeeOption = {
      type: fee.feesType,
      totalFee: fee.courseFees,
      installments,
    };

    if (fee.feesType === 'WithPlacement') {
      withPlacement.push(option);
    } else if (fee.feesType === 'WithoutPlacement') {
      withoutPlacement.push(option);
    }
  });

  return { withPlacement, withoutPlacement };
};

const CourseDetailsPage: React.FC = () => {
  const params = useParams();
  const courseId = params?.id as string;

  const [course, setCourse] = useState<any>(null);
  const [courseFees, setCourseFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await CourseService.readCourseByCourseId(courseId);
        setCourse(res.data.course);
        setCourseFees(res.data.courseFees);
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) return <div className="container my-5">Loading...</div>;
  if (!course || Object.keys(course).length === 0) return <div className="container my-5">Course not found</div>;

  const { withPlacement, withoutPlacement } = transformFeeData(courseFees);

  return (
    <div className="container my-4 py-5">
      {/* Title & Description */}
      <motion.div
        className="row"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="col col-md-6">
          <BackButton />
          <h2 className="fw-bold">{course?.courseName}</h2>
          <p>{course?.courseDescription}</p>
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div
        className="row my-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="col">
          <KeyFeatures />
        </div>
      </motion.div>

      {/* Course Details */}
      <motion.div
        className="row my-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="col">
          <CourseDetails
            data={{
              duration: course?.courseDuration || 'N/A',
              validity: course?.courseValidity || 'N/A',
              placement: course?.placementDuration || 'N/A',
            }}
          />
        </div>
      </motion.div>

      {/* Fees Structure */}
      <motion.div
        className="row my-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="col">
          <FeesStructure
            withPlacement={withPlacement}
            withoutPlacement={withoutPlacement}
          />
        </div>
      </motion.div>

      {/* Syllabus Download */}
      <motion.div
        className="row my-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="col">
          <SyllabusDownload syllabusUrl={course?.courseSyllabus} />
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetailsPage;