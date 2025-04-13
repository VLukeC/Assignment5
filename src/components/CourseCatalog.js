import React, { useContext } from 'react';
import courses from '../data/courses';
import CourseItem from './CourseItem';
// Assuming AuthContext provides the logged in student's id
import { AuthContext } from './LoginForm';

const CourseCatalog = () => {
  // Retrieve student_id from your authentication context. Adjust the key if needed.
  const { student_id } = useContext(AuthContext);

  const handleEnroll = (course) => {
    if (!student_id) {
      alert("Please log in to enroll in courses.");
      return;
    }

    // Call the backend enroll API using student_id and the selected course.
    fetch(`http://localhost:5000/enroll/${student_id}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ course })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert(result.message);
          // Optionally, update the frontend state or trigger an event to refresh courses.
          window.dispatchEvent(new Event('enrollmentUpdated'));
        } else {
          alert(result.message);
        }
      })
      .catch(error => {
        console.error("Enrollment error:", error);
        alert("Error enrolling in course.");
      });
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
