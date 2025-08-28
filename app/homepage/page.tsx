"use client";
import React from "react";
import BenefitsSection from "@/components/layout/homepage/BenefitsSection";
import HeroSection from "@/components/layout/homepage/HeroSection";
import InquiryForm from "@/components/layout/inquiryForm/InquiryForm";
import { PremiumTestimonials } from "@/components/layout/testimonials/Testimonials";
import CompanyLogo from "@/components/layout/companiesLogoCarousel/CompanyLogo";
import FreeDemoCourse from "@/components/layout/demoSection/FreeDemoCourse";
import TopCourses from "@/components/layout/topCourses/TopCourses";
import HeroCarousel from "@/components/layout/homepage/HeroCarousel";
import ContactPage from "@/components/layout/contact/ContactPage";

const HomePage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* <HeroSection /> */}
      <HeroCarousel/>
      <div className="min-vh-100 w-100 position-relative bg-grey">
        <div className="w-100">
          <BenefitsSection />
        </div>
        <TopCourses />
        <FreeDemoCourse />
        <PremiumTestimonials />
      </div>
      <div className="w-100 my-5">
        <CompanyLogo />
      </div>
      <ContactPage />
      {/* <BenefitsSection /> */}
      <InquiryForm />
    </div>
  );
};

export default HomePage;
