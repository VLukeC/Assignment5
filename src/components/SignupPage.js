import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  const validateForm = () => {
    let validationErrors = [];
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    if (!usernameRegex.test(username)) {
      validationErrors.push(
        'Invalid username (3-20 chars, start with a letter, and only letters, digits, "-" or "_" allowed).'
      );
    }
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
        // eslint-disable-next-line no-useless-escape
    const hasSpecial = /[\]!@#$%^&*()_=+\[{}|;:'",.<>?\/`~-]/.test(password);
    const hasSpace = /\s/.test(password);
    if (password.length < 8 || !hasUpper || !hasLower || !hasDigit || !hasSpecial || hasSpace) {
      validationErrors.push(
        'Invalid password (min 8 characters, must have uppercase, lowercase, digit, special character, and no spaces).'
      );
    }

    if (password !== confirmPassword) {
      validationErrors.push('Passwords do not match.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;
    if (!emailRegex.test(email)) {
      validationErrors.push(
        'Invalid email address (must be something@domain.com/.net/.io, with no spaces).'
      );
    }

    return validationErrors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setMessage('');
    } else {
      setErrors([]);
      const payload = {
        username: username.trim(),
        password: password,
        confirmPassword: confirmPassword,
        email: email.trim(),
      };

      fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setMessage('Signup successful! Redirecting to login...');
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 2000);
          } else {
            setErrors(data.errors || ['An error occurred. Please try again.']);
            setMessage('');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrors(['An unexpected error occurred. Please try again later.']);
        });
    }
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#45A049';
    e.target.style.opacity = '1.0';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#4CAF50';
    e.target.style.opacity = '0.5';
  };

  return (
    <div>
      <Header />
      <main className="signup">
        <h2>Sign Up</h2>
        <form id="signupForm" onSubmit={handleSignup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="signupBtn"
            id="signupBtn"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Sign Up
          </button>
        </form>
        {(errors.length > 0 || message) && (
          <div id="errorBox" className="loginStatusBox" style={{ display: 'flex' }}>
            <p id="errorMessages">
              {errors.length > 0 ? errors.join('  \n\n ') : message}
            </p>
          </div>
        )}
        <br />
        <br />
        <a href="login.html">Already have an account? Login here</a>
      </main>
      <Footer />
    </div>
  );
}

export default SignupPage;
