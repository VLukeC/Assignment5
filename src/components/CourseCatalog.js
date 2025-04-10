import React from 'react';
import courses from '../data/courses';
import CourseItem from './CourseItem';

const CourseCatalog = () => {
  const handleEnroll = (course) => {
    const stored = localStorage.getItem('enrollment');
    let enrolledCourses = stored ? JSON.parse(stored) : [];
    const existing = enrolledCourses.find(c => c.id === course.id);
    if (existing) {
      enrolledCourses = enrolledCourses.map(c =>
        c.id === course.id ? { ...c, count: c.count + 1 } : c
      );
    } else {
      enrolledCourses.push({ ...course, count: 1, creditHours: 3 });
    }
    localStorage.setItem('enrollment', JSON.stringify(enrolledCourses));
    window.dispatchEvent(new Event('enrollmentUpdated'));
  };

  return (
    <div
      className="course-catalog"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px'
      }}
    >
      {courses.map(course => (
        <CourseItem key={course.id} course={course} onEnroll={handleEnroll} />
      ))}
    </div>
  );
};

export default CourseCatalog;
