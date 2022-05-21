import React from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from "./Events";
import moment from 'moment'

const EventCalendar=()=>{

return(
    <div style={{ height: 700 }}>
    <Calendar
      localizer={momentLocalizer(moment)}
      events={events}
      step={60}
      defaultDate={new Date(2022, 3, 1)}
      onSelectEvent={(value)=>console.log(value)}
    />
  </div>
  )
}
export default EventCalendar;