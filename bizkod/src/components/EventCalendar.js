import React, { useEffect, useState } from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import EventViewModal from "../modals/EventViewModal";

const EventCalendar= () =>{
  const [visible, setVisible]=useState(false);
  const [events, setEvents] = useState();
  const [event, setEvent]=useState();

  useEffect(() => {
    async function FetchEvents() {
      if(!events){
        await fetch('http://localhost:5000/api/Events/calendar').then(res => res.json()).then(setEvents)
      }
    }
    FetchEvents()
  }, [events])
  

let eventData={
  name:event?event.name:'',
  startDate:event?event.start:new Date().toString(),
  endDate:event?event.end:new Date().toString(),
  desc: '',
  originalFileName:  event?event.uploadFileName:'',
  uploadFileName:  event?event.uploadFileName:'',
  status:  event?event.status:'',
  longtitude:  event?event.longtitude:'',
  latitude: event?event.latitude:'',
   type: event?event.type:'',
}

const hideModal=()=>{
  setVisible(false);
}

const showDetails=(data)=>{
  setEvent(data)
  setVisible(true)
}
console.log(eventData)
  return(
    <div style={{ height: 750 }}>
    <Calendar
      style={{marginRight:'15px'}}
      localizer={momentLocalizer(moment)}
      events={events||[]}
      step={60}
      defaultDate={new Date()}
      onSelectEvent={(value)=>showDetails(value)}
    />
    {eventData&&<EventViewModal data={eventData} event={eventData} loading={false} visible={visible} changeLoading={()=>{}} changeVisible={hideModal}/>}
  </div>
  )
}
export default EventCalendar;