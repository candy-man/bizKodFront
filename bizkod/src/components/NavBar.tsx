import React from 'react';

interface Props {}

const NavBar: React.FC<Props> = ({}) => {
  return (
    <nav className="navbar">
      <img src="/images/logo.png" alt="logo" />
      <ul className="menu-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Event</a>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

export default NavBar;
