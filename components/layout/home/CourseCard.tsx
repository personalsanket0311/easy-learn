'use client';
import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, image }) => (
  <div className="rounded-lg shadow-md p-3 bg-white w-64">
    <img src={image} alt={title} className="rounded-md mb-3" />
    <h4 className="font-bold">{title}</h4>
    <p className="text-sm">{description}</p>
  </div>
);

export default CourseCard;
