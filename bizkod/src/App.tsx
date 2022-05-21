import React from 'react';
import './App.css';
import EventCard from './components/event';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <EventCard name={'Event'} type="Event" date="22.02.2022." />
    </div>
  );
}

export default App;
