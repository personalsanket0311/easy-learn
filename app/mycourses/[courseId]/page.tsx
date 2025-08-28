'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import PurchaseCourseDetails from '@/components/layout/mycourses/PurchaseCourseDetails';

const CourseDetailPage = () => {
  const params = useParams();
  const courseId = params?.courseId;

  return (
    <>
      <PurchaseCourseDetails />
    </>
  );
};

export default CourseDetailPage;
