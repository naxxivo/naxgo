
import React from 'react';
import { CourseInfo } from '../types';
import Rating from './Rating';

interface CourseCardProps {
  course: CourseInfo;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <img src={course.imageUrl} alt={`${course.title} course image`} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-1 leading-snug">{course.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{course.instructor}</p>
        <Rating score={course.rating} />
         <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 flex-grow line-clamp-2">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
