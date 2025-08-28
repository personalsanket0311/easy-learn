"use client";

import React from "react";
import { Carousel } from "primereact/carousel";

// Sample courses
const courses = [
  {
    title: "Data Science Bootcamp",
    description: "Master data analysis, ML, and visualization.",
    icon: "/images/course.png",
  },
  {
    title: "Web Development",
    description: "Build responsive sites with React & Node.",
    icon: "/images/web.png",
  },
  {
    title: "Digital Marketing Mastery",
    description: "Learn SEO, content, and social media and more..",
    icon: "/images/marketing.png",
  },
];

// Responsive breakpoints
const responsiveOptions = [
  { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
  { breakpoint: "768px", numVisible: 2, numScroll: 1 },
  { breakpoint: "560px", numVisible: 1, numScroll: 1 },
];

// Card Template
const CourseTemplate = (course: any) => {
  return (
    <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          padding: "1.5rem",
          maxWidth: "20rem",
          width: "100%",
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
        aria-label={`Course: ${course.title}`}
      >
        <img
          src={course.icon}
          alt={course.title}
          width={150}
          height={150}
          style={{
            marginBottom: "1rem",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "1rem",
          }}
        />
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#1f2937",
            lineHeight: "1.375rem",
          }}
        >
          {course.title}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#000000",
            marginTop: "0.5rem",
            lineHeight: "1.5rem",
          }}
        >
          {course.description}
        </p>
      </div>
    </div>
  );
};

const FeaturedCourses = () => {
  return (
    <section
      style={{
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "#f9fafb",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#1f2937",
        }}
      >
        🚀 Featured Courses
      </h2>
      <Carousel
        value={courses}
        itemTemplate={CourseTemplate}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular
        autoplayInterval={4000}
      />
    </section>
  );
};

export default FeaturedCourses;
