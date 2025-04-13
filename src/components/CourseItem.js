import React, { useState } from 'react';

const CourseItem = ({ course, onEnroll }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [hovered, setHovered] = useState(false);

  const containerStyle = {
    backgroundColor: '#e6f2ff',
    borderRadius: '10px',
    padding: '15px',
    transition: 'transform 0.2s',
    transform: hovered ? 'translateY(-5px)' : 'none'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px'
  };

  const titleStyle = {
    margin: '15px 0',
    color: '#004080',
    cursor: 'pointer'
  };

  const buttonStyle = {
    width: '100%',
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={course.image}
        alt={course.name}
        style={imageStyle}
      />
      <h3
        style={titleStyle}
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        {course.name}
      </h3>

      {showDescription && (
        <p style={{ color: '#666', marginBottom: '15px' }}>
          {course.description}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#003366' }}>{course.instructor}</span>
        <span style={{ fontWeight: 'bold' }}>{course.duration}</span>
      </div>

      <button
        onClick={() => onEnroll(course)}
        style={buttonStyle}
        onMouseEnter={e => e.target.style.backgroundColor = '#45A049'}
        onMouseLeave={e => e.target.style.backgroundColor = '#4CAF50'}
      >
        Enroll Now
      </button>
    </div>
  );
};

export default CourseItem;
