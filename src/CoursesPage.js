import React from 'react';
import Header from './components/header';
import CourseCatalog from './components/CourseCatalog';
import EnrollmentList from './components/EnrollmentList';
import Footer from './components/footer';

const CoursesPage = () => (
  <div className="courses-page">
    <Header />
    <div className="content">
      <CourseCatalog />
      <EnrollmentList />
    </div>
    <Footer />
  </div>
);

export default CoursesPage;