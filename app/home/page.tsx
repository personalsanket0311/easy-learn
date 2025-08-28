import Banner from "@/components/layout/home/Banner";
import DemoClass from "@/components/layout/home/DemoClass";
import RecommendedCourses from "@/components/layout/home/Recommondedcourses";
import React from "react";

const Home = () => {
  return (
    <main className="p-6">
      <Banner />
      <RecommendedCourses />
      <DemoClass />
    </main>
  );
};

export default Home;
