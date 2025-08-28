"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import studentservice from "@/services/student-service";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/custom-button/CustomButton";

interface Course {
  id: number;
  title: string;
  description: string;
  guarantee: string;
  daysLeft: number;
  courseImage: string;
}

const MyCourse: React.FC = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    studentservice
      .getAllStudentCourses()
      .then((response: any) => {
        const studentCourses = response.data?.studentCourses || [];

        // Transform API data to Course[]
        const mappedCourses: Course[] = studentCourses.map(
          (sc: any, index: number) => ({
            id: sc._id || `course-${index}`,
            title: sc.course?.courseName || "Untitled Course",
            description: sc.course?.courseDescription || "",
            guarantee: "100% Job Guarantee",
            daysLeft: 60,
            courseImage: sc.course?.courseImage || "",
          })
        );

        setCourses(mappedCourses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student courses:", err);
        setError("Failed to load courses.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-danger text-center">{error}</div>
    );
  }
  return (
    <div className="container my-2">
      <h3 className="fw-semibold text-dark mb-4">My Course</h3>
      {courses.length === 0 ? (
        <>
          <div className="text-center text-muted fw-semibold py-2">
            Add Courses
          </div>
          <div className="d-flex justify-content-center">
            <CustomButton
              label="Explore Courses"
              className="mt-2"
              onClick={() => router.push("/courses")}
              outlined
              size="small"
            />
          </div>
        </>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            className="d-flex align-items-start justify-content-between mb-4 flex-wrap border-bottom pb-3 purchased-course-card"
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              {/* <div className="me-3 text-center">
                <img
                  src={course.courseImage || "/images/data_science.svg"}
                  alt={course.title}
                  className="rounded img-fluid"
                />
                <p className="text-muted text-start fw-medium mt-2 mb-0 small">
                  {course.daysLeft} days left
                </p>
              </div> */}
              <div>
                <h5 className="text-dark fw-semibold">{course.title}</h5>
                <p className="mb-1 fw-normal w-75">
                  {course.description}
                </p>
                {/* <small className="text-muted fw-medium">
                  {course.guarantee}
                </small> */}
              </div>
              <div className="">
                <CustomButton
                  label="View Details"
                  className="min-width-140"
                  onClick={() => router.push(`/mycourses/${course.id}`)}
                  outlined
                  size="small"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyCourse;
