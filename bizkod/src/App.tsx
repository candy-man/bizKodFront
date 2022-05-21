import React from 'react';
import './App.css';
import EventCard from './components/EventCard';
import NavBar from './components/NavBar';
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
      <NavBar />
      <EventCard name={'Event'} type="Event" date="22.02.2022." />
      <Routes />
    </div>
  );
}

export default App;
