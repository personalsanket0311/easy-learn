"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/layout/explorecourses/CourseCard";
import CourseService from "@/services/course-service";
import "./style.css";

interface Course {
  grossFees: number;
  netFees: number;
  courseMode: string;
  _id: string;
  courseName: string;
  courseDescription: string;
  courseImage: string;
  courseType: "WithPlacement" | "WithoutPlacement"; 
  discount?: number;
}

const ExploreCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filterType, setFilterType] = useState<"WithPlacement" | "WithoutPlacement">("WithPlacement");

  useEffect(() => {
    CourseService.readAllCourses()
      .then((response: any) => {
        console.log("Courses fetched successfully", response.data.courses);
        if (response.data.courses) {
          const allCourses: Course[] = response.data.courses.map((course: Course) => ({
            ...course,
            discount: Math.floor(((course.grossFees - course.netFees) / course.grossFees) * 100),
          }));
          setCourses(allCourses);

          // Filter default: WithPlacement
          const placementCourses = allCourses.filter(c => c.courseType === "WithPlacement");
          setFilteredCourses(placementCourses);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses", error);
        setCourses([]);
        setFilteredCourses([]);
      });
  }, []);

  const handleFilter = (type: "WithPlacement" | "WithoutPlacement") => {
    setFilterType(type);
    setFilteredCourses(courses.filter(course => course.courseType === type));
  };

  return (
    <div style={{ paddingTop: "88px", paddingBottom: "40px" }}>
      <div className="container">
        <h2 className="h2 fw-bold text-dark mb-5">Explore Courses</h2>

        <div className="filter-button-group">
             <button
            className={`filter-btn ${filterType === "WithPlacement" ? "filter-btn-active" : "filter-btn-inactive"}`}
            onClick={() => handleFilter("WithPlacement")}
          >
            PLACEMENT GUARANTEE COURSES
          </button>
          <button
            className={`filter-btn ${filterType === "WithoutPlacement" ? "filter-btn-active" : "filter-btn-inactive"}`}
            onClick={() => handleFilter("WithoutPlacement")}
          >
            PLACEMENT ASSURANCE COURSES
          </button>
       

        </div>

        <div className="mt-5 d-flex align-items-center justify-content-center flex-wrap gap-2">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.courseName}
              courseImage={course.courseImage}
              courseMode={course.courseMode}
              grossFees={course.grossFees}
              netFees={course.netFees}
              discount={course.discount || 0}
              courseType={course.courseType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
