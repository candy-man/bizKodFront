import React, { useState } from 'react';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface Props {}

const NavBar: React.FC<Props> = ({}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const logOut = () => {
    console.log('logging out');
  };

  return (
    <nav className="navbar">
      <img className="logoPicture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5S3Qwkc1DetbZGgcP1FTMjGFm4Poi_W7RzN3z_xP71BohZ0gHQShg2HveYtnQcADI_A&usqp=CAU" alt="logo" />
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
            <li style={{width: '200px'}}>
              <Link to='/profil/2'>
                Vidi profil
              </Link>
            </li>
            <li  style={{width: '200px'}} onClick={logOut}>Odjavi se</li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
