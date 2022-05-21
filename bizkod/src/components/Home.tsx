import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EventCalendar from './EventCalendar';
import NavBar from './NavBar';
import Banner from './Banner';
import EventCard from './EventCard';

const Home = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <div>
      <Banner />
      <EventCard name="Event" type="Event" date="11.02.2022." />
      <EventCard name="Event" type="Event" date="11.02.2022." />
      <EventCard name="Event" type="Event" date="11.02.2022." />
      <EventCard name="Event" type="Event" date="11.02.2022." />
      <EventCard name="Event" type="Event" date="11.02.2022." />
    </div>
  );
};
export default Home;
