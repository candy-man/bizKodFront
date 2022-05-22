import React, { useState } from 'react';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';

interface Props {}

const NavBar: React.FC<Props> = ({}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const logOut = () => {
    console.log('logging out');
  };

  const dummyUserData = [
    {
      username: 'markomarkovic@infostud.com',
      name: 'Marko Markovic',
      image: '',
      contact: '9304820384',
      sector: 'Prodaja',
      selectedEvents: [
        {
          id: '33333',
          name: 'Stopama grada kroz period secesije',
          startDate: '22.03.2022.',
          endDate: 'ssss',
          location: 'ssss',
          eventTypeId: 'icvkjhdskfl',
          eventType: 'Tura',
          status: 'pending',
        },
        {
          id: '4444',
          name: 'Vinska tura',
          startDate: '22.03.2022.',
          endDate: 'ssss',
          location: 'ssss',
          eventTypeId: 'icvkjhdskfl',
          eventType: 'Tura',
          status: 'approved',
        },
      ],
      users: [],
    },
  ];

  return (
    <nav className="navbar">
      <a href="/">
        <img
          className="logoPicture"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5S3Qwkc1DetbZGgcP1FTMjGFm4Poi_W7RzN3z_xP71BohZ0gHQShg2HveYtnQcADI_A&usqp=CAU"
          alt="logo"
        />
      </a>
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
          // <ul className="dropdown">
          //   <li style={{ width: '200px' }}>
          //     <a href="/profil/2">Vidi prijave</a>
          //   </li>
          //   <li style={{ width: '200px' }} onClick={logOut}>
          //     Odjavi se
          //   </li>
          // </ul>
          <div className="profileInfo">
            <div className="profile">
              <div className="profilePicture">
                {dummyUserData[0].image ? (
                  <img
                    className="event-img"
                    alt="Profilna slika"
                    src={dummyUserData[0].image}
                  />
                ) : (
                  <Avatar size={64} icon={<UserOutlined />} />
                )}
              </div>
              <div className="userInfo">
                <h1>{dummyUserData[0].name}</h1>
                <span className="profileLabel">{dummyUserData[0].sector}</span>
                <div>
                  <span className="profileLabel">
                    Kontakt: {dummyUserData[0].contact}
                  </span>
                </div>
              </div>
            </div>
            <div className="links-container">
              <Button type="ghost">
                <a href="/profil/2">Vidi prijave</a>
              </Button>
              <Button onClick={logOut}>Odjavi se</Button>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
