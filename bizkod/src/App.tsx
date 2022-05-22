import React, { useEffect, useState } from "react";
import "./App.css";
// import { EventViewModal } from './modals/EventViewModal';
import EventCard from "./components/EventCard";
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import FormModal from "./components/FormModal";
import useToken from "./components/Login/UseToken";
import Login from "./components/Login/Login";

function App() {
  const { token, setToken } = useToken();

  useEffect(() => {}, []);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <NavBar />
      {/* <Routes /> */}
      <Routes />
    </div>
  );
}

export default App;
