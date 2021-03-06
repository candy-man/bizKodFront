import { getEventListeners } from "events";
import React, { useEffect, useState } from "react";
import { Events } from "../interfaces/interfaces";
import Banner from "./Banner";
import EventListComponent from "./EventsListComponent";

interface Props {}

const Home: React.FC<Props> = () => {
  const [recentEvents, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      await fetch("http://localhost:5000/api/Events")
        .then((res) => res.json())
        .then((data) => setEvents(data));
    };
    getEvents();
  }, []);

  useEffect(() => {
    console.log(recentEvents);
  });

  return (
    <div>
      <Banner />
      <EventListComponent
        eventsList={recentEvents}
        listTitle="Predstojeći događaji"
        state="live"
      ></EventListComponent>
    </div>
  );
};
export default Home;
