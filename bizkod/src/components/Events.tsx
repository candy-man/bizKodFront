import React, { useEffect, useState } from "react";
import {Button, Modal} from "antd";
import EventCalendar from "./EventCalendar";
import { Events } from '../interfaces/interfaces';
import EventListComponent from "./EventsListComponent";


interface Props {};

const EventsPage: React.FC<Props> =()=>{

  const [visibleModal, setVisibleModal]=useState(false);
  const [allEvents, setEvents] = useState<Events[]>([]);

  useEffect(
    () => {
      const getEvents = async () => {
        await fetch('http://bizkodapi.local/api/Events').then(res => res.json()).then(data => setEvents(data));
      };
      getEvents();
    }, []
  )

return(
<div>
  <div className="eventButton">
    <Button onClick={()=>setVisibleModal(true)}>Kalendar događaja</Button>
  </div>
  <EventListComponent eventsList={allEvents} listTitle='Svi događaji' state='home'/>
  <Modal
    className="eventModal"
    visible={visibleModal}
    footer=""
    onCancel={()=>setVisibleModal(false)}
    >
      <EventCalendar/>
  </Modal>
</div>
  )
}
export default EventsPage;