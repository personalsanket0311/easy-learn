"use client";
import { Button } from 'primereact/button';
import React from 'react';

const Banner: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat rounded-xl mt-6 text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/Banner.png')",
        minHeight: '300px',
        height: '100%',
        width: '100%',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4 md:p-8">
        <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 leading-snug">
          Unlock Your Potential with a 100% Job Guarantee
        </h1>
        <p className="text-sm md:text-base max-w-md md:max-w-xl mb-4">
          Our courses are designed to equip you with the skills employers demand. Learn, practice & land your dream job.
        </p>

        {/* Add Button Here */}
        {/* <button
          className="bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-6 rounded-full transition duration-200"
        >
          Browse Courses
        </button> */}
 <div className="d-flex justify-content-center gap-3">
          <Button label="Explore Courses" className="p-button-primary me-2" />
          <Button label="Get Started" className="p-button-outlined" />
        </div>
        {/* OR use your custom button */}
        {/* <CustomButton label="Browse Courses" /> */}
      </div>
    </section>
  );
};

export default Banner;

