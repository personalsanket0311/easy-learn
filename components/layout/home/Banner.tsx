
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Banner: React.FC = () => {
  const router = useRouter();

  const handleExplore = () => {
    router.push('/explore');
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between bg-green-100 p-6 md:p-8 rounded-lg mb-8 gap-6 md:gap-0">
      {/* ✅ Text */}
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Hello, Sara!</h1>
        <p className="mb-5 text-base md:text-lg text-gray-700">
          Welcome back to ChangeXpert. Continue your learning journey with our recommended courses.
        </p>
        <button
          onClick={handleExplore}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-medium transition"
        >
          Explore Courses
        </button>
      </div>

      {/* ✅ Image */}
      <img
        src="/images/IMG1.png"
        alt="Banner"
        className="w-full md:w-1/3 max-w-xs md:max-w-none rounded-lg shadow-md object-cover"
      />
    </div>
  );
};

export default Banner;
