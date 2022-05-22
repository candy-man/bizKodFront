import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import EventCalendar from "./EventCalendar";
import { Events } from "../interfaces/interfaces";
import EventListComponent from "./EventsListComponent";
import FormModal from "./FormModal";

interface Props {}

const EventsPage: React.FC<Props> = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [allEvents, setEvents] = useState<Events[]>([]);
  const [show, setShow] = useState(false);
  console.log(allEvents);
  useEffect(() => {
    const getEvents = async () => {
      await fetch("http://localhost:5000/api/Events")
        .then((res) => res.json())
        .then((data) => setEvents(data));
    };
    getEvents();
  }, []);

  return (
    <div>
      <div className="eventButton">
        <Button style={{ width: "150px" }} onClick={() => setShow(true)}>
          Dodaj događaj
        </Button>
        <FormModal setShow={setShow} show={show} />
      </div>
      <div className="eventButton">
        <Button
          style={{ width: "150px" }}
          onClick={() => setVisibleModal(true)}
        >
          Kalendar događaja
        </Button>
      </div>
      <EventListComponent
        eventsList={allEvents}
        listTitle="Svi događaji"
        state="live"
      />
      <Modal
        className="eventModal"
        visible={visibleModal}
        footer=""
        onCancel={() => setVisibleModal(false)}
      >
        <EventCalendar />
      </Modal>
    </div>
  );
};
export default EventsPage;
