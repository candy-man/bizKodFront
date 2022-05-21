import React from 'react';
import './App.css';
import {EventViewModal} from './modals/EventViewModal';
import EventCard from './components/event';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <EventCard name={'Event'} type="Event" date="22.02.2022." />
      <EventViewModal></EventViewModal>
    </div>
  );
}

export default App;
