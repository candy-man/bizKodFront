import React from 'react';
import './App.css';
<<<<<<< HEAD
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
     <Routes/>
=======
import EventCard from './components/event';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <EventCard name={'Event'} type="Event" date="22.02.2022." />
>>>>>>> b69e537f9f6b3fe14453ea33b6ac32d0adf59885
    </div>
  );
}

export default App;
