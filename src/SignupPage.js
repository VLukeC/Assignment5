import React from 'react';
import Header from './Header';
import RegForm from './RegForm';
import Footer from './Footer';
import '../App.css';

function SignupPage() {
  return (
    <div>
      <Header />
      <main className="signup">
        <h2>Sign Up</h2>
        <RegForm />
      </main>
      <Footer />
    </div>
  );
}

export default SignupPage;
