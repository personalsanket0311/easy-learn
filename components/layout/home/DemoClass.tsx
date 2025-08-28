
'use client';

import React from 'react';

//import { Button } from 'primereact/button';
        
// If using auth & router later:
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/navigation';

const DemoClass: React.FC = () => {
  // Uncomment if using auth:
  // const { isLoggedIn } = useAuth();
  // const router = useRouter();

  const handleStartDemo = () => {
    // Example: 
    // if (isLoggedIn) {
    //   router.push('/explore');
    // } else {
    //   router.push('/login');
    // }
    alert('Start Demo button clicked!');
  };

  return (
    <section className="bg-gray-50 p-6 rounded-lg shadow flex flex-col md:flex-row items-center gap-6">
      <img
        src="/images/IMG5.png"
        alt="Demo Class"
        className="w-full md:w-1/3 rounded-md"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Free Demo Class</h2> 
        <h3 className="text-xl font-semibold mb-2">Introduction to Machine Learning</h3>
        <p className="mb-4 text-gray-700">
          Get a taste of our Machine Learning course with this free demo class.
          Learn the core concepts and algorithms.
        </p>
        {/* <Button label="Success" severity="success" /> */}
        <button
          onClick={handleStartDemo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition"
        >
          Start Demo
        </button> 
      </div>
    </section>
  );
};

export default DemoClass;

