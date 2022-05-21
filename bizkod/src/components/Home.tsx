import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import EventCard from './event';
import NavBar from './NavBar';
import Banner from './Banner';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Banner />
      <EventCard name={'Event'} type="Event" date="22.02.2022." />
    </div>
  );
};
export default Home;
