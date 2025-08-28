

'use client';

import React from 'react';
import CourseCard from './CourseCard';

const courses = [
  {
    image: '/images/IMG2.png',
    title: 'Data Science Fundamentals',
    description: 'Learn the basics of data analysis and visualization.'
  },
  {
    image: '/images/IMG3.png',
    title: 'Web Development Bootcamp',
    description: 'Build responsive websites with HTML, CSS, and JavaScript.'
  },
  {
    image: '/images/IMG4.png',
    title: 'Digital Marketing Mastery',
    description: 'Master SEO, social media, and content marketing.'
  }
];

const RecommendedCourses: React.FC = () => (
  <section>
    <h2 className="text-2xl font-bold mb-6">Recommended Courses</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
  </section>
);

export default RecommendedCourses;

