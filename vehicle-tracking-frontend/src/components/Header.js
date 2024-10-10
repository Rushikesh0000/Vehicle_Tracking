import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/upload">Upload GPS Data</Link></li>
        <li><Link to="/trip-page">View Trips</Link></li> {/* Adjusted to match "/trip-page" route */}
      </ul>
    </nav>
  );
};

export default Header;
