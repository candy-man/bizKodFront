import React, { useState } from 'react';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

interface Props {}

const NavBar: React.FC<Props> = ({}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const logOut = () => {
    console.log('logging out');
  };

  return (
    <nav className="navbar">
      <img src="/images/logo.png" alt="logo" />
      <ul className="menu-links">
        <li>
          <span>
            <a href="/">Početna strana</a>
          </span>
        </li>
        <li>
          <span>
            <a href="/dogadjaji">Događaji</a>
          </span>
        </li>
        <li
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>Profil</span>
          <CaretDownFilled />
        </li>
        {showDropdown && (
          <ul className="dropdown">
            <li>
              <a href="#">Vidi profil</a>
            </li>
            <li onClick={logOut}>Odjavi se</li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
