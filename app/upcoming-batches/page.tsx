"use client";
import React, { useEffect, useState } from "react";
import CourseService from "@/services/course-service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Custom CSS

type RawBatch = {
  _id: string;
  course: { _id: string; courseName: string };
  trainer: { firstName: string; lastName: string };
  batchStartDate: string;
  batchStartTime: string;
  batchEndTime: string;
  batchType: string;
};

type Batch = {
  id: string;
  title: string; // "StartTime - EndTime"
  startDate: string; // formatted as 01-Aug-2025
  batchType: string;
};

type Course = {
  id: string;
  title: string;
  imageUrl: string;
  batches: Batch[];
};

// Function to format date to 01-Aug-2025
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-"); // e.g. 01 Aug 2025 -> 01-Aug-2025
};

const UpcomingBatches: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    CourseService.readUpcomingCourseBatches()
      .then((response: any) => {
        const rawBatches: RawBatch[] = response?.data?.courseBatches || [];
        console.log("Raw Batches:", rawBatches);

        const courseMap = new Map<string, Course>();

        rawBatches.forEach((batch) => {
          const courseId = batch.course._id;
          const courseName = batch.course.courseName;

          const formattedBatch: Batch = {
            id: batch._id,
            title: `${batch.batchStartTime} - ${batch.batchEndTime}`,
            startDate: formatDate(batch.batchStartDate),
            batchType: batch.batchType,
          };

          if (!courseMap.has(courseId)) {
            courseMap.set(courseId, {
              id: courseId,
              title: courseName,
              imageUrl: "/images/image6.svg",
              batches: [formattedBatch],
            });
          } else {
            courseMap.get(courseId)!.batches.push(formattedBatch);
          }
        });

        setCourses(Array.from(courseMap.values()));
      })
      .catch((error) => {
        console.error("Error fetching courses", error);
        setCourses([]);
      });
  }, []);

  return (
    <div className="container" style={{paddingTop: "88px", paddingBottom: "88px"}}>
      <h3 className="mb-4 fw-bold">Upcoming Batches</h3>

      <div className="table-responsive shadow  rounded table-custom">
        <table className="table table-bordered table-striped table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th className="text-center">Sr No</th>
              <th className="text-center" >Course</th>
              <th className="text-center">Date(s)</th>
              <th className="text-center">Time(s)</th>
              <th className="text-center">Batch Type</th>
              <th className="text-center">Training Mode</th>
         
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              const dates = Array.from(
                new Set(course.batches.map((batch) => batch.startDate))
              ).join(", ");
              const times = Array.from(
                new Set(course.batches.map((batch) => batch.title))
              ).join(", ");
              const batchTypes = Array.from(
                new Set(course.batches.map((batch) => batch.batchType))
              ).join(", ");

              return (
                <tr key={course.id}>
                  <td className=" text-center text-nowrap">{index + 1}</td>
                  <td className=" text-muted">{course.title}</td>
                  <td className=" text-center text-muted text-nowrap">{dates}</td>
                  <td className="text-center text-muted text-nowrap">{times}</td>
                  <td className="text-center text-muted text-nowrap">{batchTypes}</td>
                  <td className="text-center text-muted text-nowrap">Online</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingBatches;
