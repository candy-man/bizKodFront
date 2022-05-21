import React, { useState } from 'react';
import './App.css';
// import { EventViewModal } from './modals/EventViewModal';
import EventCard from './components/EventCard';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import FormModal from './components/FormModal';

function App() {
  const [show, setShow] = useState(true);

  return (
    <div className="App">
      <NavBar />
      <FormModal setShow={setShow} show={show} hasData={true} />
      {/* <Routes /> */}
      <Routes />
    </div>
  );
}

export default App;
