import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src="/weather-icon.png" alt="Weather Icon" className="header-icon" />
      <h1 className="header-title">Weather Check</h1>
    </header>
  );
};

export default Header;
