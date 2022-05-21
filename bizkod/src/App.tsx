import React from 'react';
import logo from './logo.svg';
import './App.css';
import EventCard from './components/event';

function App() {
  return (
    <div>
      <EventCard name={'Event'} type="Event" date="22.02.2022." />
    </div>
  );
}

export default App;
