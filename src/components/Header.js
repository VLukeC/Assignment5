import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';
import logo from '../images/logo.jpg'; 

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img 
          src={logo} 
          alt="LMS Logo" 
          className={styles.logo}
        />
        <h1 className={styles.title}>LMS</h1>
      </div>
      
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/courses" className={styles.navLink}>Courses</Link>
        {isLoggedIn ? (
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        ) : (
          <Link to="/login" className={styles.navLink}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
