import React, { useEffect, useState } from 'react';

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(response => response.json())
      .then(data => {
        const shuffledCourses = [...data].sort(() => 0.5 - Math.random());
        setFeaturedCourses(shuffledCourses.slice(0, 3));
      })
      .catch(error => console.error("Error fetching courses:", error));

    fetch('http://localhost:5000/testimonials')
      .then(response => response.json())
      .then(data => {
        const shuffledTestimonials = [...data].sort(() => 0.5 - Math.random());
        setRandomTestimonials(shuffledTestimonials.slice(0, 2));
      })
      .catch(error => console.error("Error fetching testimonials:", error));
  }, []);

  return (
    <main>
      <section className="about">
        <h2>About LMS</h2>
        <p>Manage courses and track progress efficiently.</p>
      </section>

      <section className="featured-courses">
        <h3>Featured Courses</h3>
        {featuredCourses.map(course => (
          <div key={course.id}>
            <img src={course.image} alt={course.name} />
            <h4>{course.name}</h4>
          </div>
        ))}
      </section>

      <section className="testimonials">
        <h3>Student Testimonials</h3>
        {randomTestimonials.map((testimonial, idx) => (
          <div key={idx}>
            <p>{testimonial.studentName}</p>
            <p>{'★'.repeat(testimonial.rating)}</p>
            <p>{testimonial.review}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MainSection;
