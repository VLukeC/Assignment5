import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';
import courses from '../data/courses';
import { useAuth } from '../context/AuthContext';

const CoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { student_id } = useContext(AuthContext);

  const fetchEnrolledCourses = () => {
    if (!student_id) return;
    fetch(`http://localhost:5000/student_courses/${student_id}`)
      .then(response => response.json())
      .then(data => setEnrolledCourses(data))
      .catch(error => {
        console.error('Error fetching enrolled courses:', error);
        setEnrolledCourses([]);
      });
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, [student_id]);

  const handleEnroll = (course) => {
    if (!student_id) {
      alert("Please log in to enroll in courses.");
      return;
    }

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
          fetchEnrolledCourses(); 
        } else {
          alert(result.message);
        }
      })
      .catch(error => {
        console.error("Error enrolling in course:", error);
        alert("Error enrolling in course.");
      });
  };

  const handleRemove = (course) => {
    if (!student_id) {
      alert("Please log in to manage your enrollments.");
      return;
    }
    
    fetch(`http://localhost:5000/drop/${student_id}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ course: { id: course.id } })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert(result.message);
          fetchEnrolledCourses(); // Update the enrollment list on success.
        } else {
          alert(result.message);
        }
      })
      .catch(error => {
        console.error("Error dropping course:", error);
        alert("Error dropping course.");
      });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      
      <div style={{ 
        flex: 1,
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ color: '#004080' }}>Available Courses</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {courses.map(course => (
              <CourseItem 
                key={course.id} 
                course={course} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
        
        <EnrollmentList 
          enrolledCourses={enrolledCourses}
          onRemove={handleRemove}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
