



"use client";

import React from "react";
import { Carousel } from "primereact/carousel";
import Image from "next/image";

// Sample stories
const stories = [
  {
    name: "Saisha's Career Transformation",
    story: "From novice to data scientist in 6 months.",
    img: "/images/Saisha.png",
  },
  {
    name: "Mark's Journey to Tech",
    story: "Switched from finance to web development.",
    img: "/images/RT.png",
  },
  {
    name: "Anita's Upskill Story",
    story: "Became a cloud engineer after upskilling online.",
    img: "/images/AT.png",
  },
];

// Responsive breakpoints
const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
    numScroll: 1,
  },
];

// Card Template
const StoryTemplate = (story: any) => {
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
        aria-label={`Success story of ${story.name}`}
      >
        <Image
          src={story.img}
          alt={story.name}
          width={130}
          height={130}
          style={{
            borderRadius: "50%",
            marginBottom: "1rem",
            objectFit: "cover",
            border: "2px solid #f3f4f6",
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
          {story.name}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#4b5563",
            marginTop: "0.5rem",
            lineHeight: "1.5rem",
          }}
        >
          {story.story}
        </p>
      </div>
    </div>
  );
};

const Stories = () => {
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
        🏆 Success Stories
      </h2>
      <Carousel
        value={stories}
        itemTemplate={StoryTemplate}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular
        autoplayInterval={4000}
      />
    </section>
  );
};

export default Stories;
