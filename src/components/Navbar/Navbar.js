import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">📊</span>
          User Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
