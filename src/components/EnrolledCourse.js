import React from 'react';

const EnrolledCourse = ({ course, onDrop }) => {
  const containerStyle = {
    backgroundColor: '#e6f2ff',
    border: '1px solid lightgray',
    borderRadius: '10px',
    padding: '15px',
    margin: '10px',
    textAlign: 'center',
    width: '250px'
  };

  const buttonStyle = {
    backgroundColor: '#D32F2F',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <div className="enrolled-course" style={containerStyle}>
      <h3>{course.name}</h3>
      <p>Credit Hours: {course.creditHours}</p>
      <p>Enrolled: {course.count}</p>
      <button onClick={() => onDrop(course.id)} style={buttonStyle}>
        Drop Course
      </button>
    </div>
  );
};

export default EnrolledCourse;
