import Certificate from "@/components/layout/landingPage/certificate-completion/certificate-completion";
import Curriculum from "@/components/layout/landingPage/curriculum/curriculum";
import Main from "@/components/layout/landingPage/main/Main";
import CourseReviews from "@/components/layout/landingPage/review-course/review-course";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="my-5">
      <Main />
      <Curriculum />
      <Certificate />
      <CourseReviews />
    </div>
  );
};

export default LandingPage;
