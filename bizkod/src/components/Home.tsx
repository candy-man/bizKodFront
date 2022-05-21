import React from 'react';
// import { Button, Modal } from 'antd';
// import EventCalendar from './EventCalendar';
// import NavBar from './NavBar';
import Banner from './Banner';
import EventCard from './EventCard';

interface Props {};

const Home: React.FC<Props> = () => {

  return (
    <div>
      <Banner />
      <EventCard id={1} name="Event" type="Event" date="11.02.2022." />
      <EventCard id={2} name="Event" type="Event" date="11.02.2022." />
      <EventCard id={3} name="Event" type="Event" date="11.02.2022." />
      <EventCard id={4} name="Event" type="Event" date="11.02.2022." />
      <EventCard id={5} name="Event" type="Event" date="11.02.2022." />
    </div>
  );
};
export default Home;
