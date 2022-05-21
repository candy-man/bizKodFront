import React from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

interface Props {};

const EventCalendar: React.FC<Props> = () =>{
  const dummyEvents= [
    {
      'title': 'All Day Event very long title',
      'allDay': true,
      'start': new Date(2022, 4, 1),
      'end': new Date(2022, 4, 1)
    },
    {
      'title': 'Long Event',
      'start': new Date(2022, 4, 7),
      'end': new Date(2022, 4, 10)
    },
  
    {
      'title': 'Some Event',
      'start': new Date(2022, 4, 9, 0, 0, 0),
      'end': new Date(2022, 4, 9, 0, 0, 0)
    },
    {
      'title': 'Conference',
      'start': new Date(2022, 4, 11),
      'end': new Date(2022, 4, 13),
      desc: 'Big conference for important people'
    },
    {
      'title': 'Meeting',
      'start': new Date(2022, 4, 12, 10, 30, 0, 0),
      'end': new Date(2022, 4, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
      'title': 'Lunch',
      'start': new Date(2022, 4, 12, 12, 0, 0, 0),
      'end': new Date(2022, 4, 12, 13, 0, 0, 0),
      desc: 'Power lunch'
    },
    {
      'title': 'Meeting',
      'start': new Date(2022, 4, 12, 14, 0, 0, 0),
      'end': new Date(2022, 4, 12, 15, 0, 0, 0)
    },
    {
      'title': 'Happy Hour',
      'start': new Date(2022, 4, 12, 17, 0, 0, 0),
      'end': new Date(2022, 4, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day'
    },
    {
      'title': 'Dinner',
      'start': new Date(2022, 4, 12, 20, 0, 0, 0),
      'end': new Date(2022, 4, 12, 21, 0, 0, 0)
    },
    {
      'title': 'Birthday Party',
      'start': new Date(2022, 4, 13, 7, 0, 0),
      'end': new Date(2022, 4, 13, 10, 30, 0)
    },
    {
      'title': 'Birthday Party 2',
      'start': new Date(2022, 4, 13, 7, 0, 0),
      'end': new Date(2022, 4, 13, 10, 30, 0)
    },
    {
      'title': 'Birthday Party 3',
      'start': new Date(2022, 4, 13, 7, 0, 0),
      'end': new Date(2022, 4, 13, 10, 30, 0)
    },
    {
      'title': 'Multi-day Event',
      'start': new Date(2022, 4, 20, 19, 30, 0),
      'end': new Date(2022, 4, 22, 2, 0, 0)
    }
  ]

return(
    <div style={{ height: 750 }}>
    <Calendar
    style={{marginRight:'15px'}}
      localizer={momentLocalizer(moment)}
      events={dummyEvents}
      step={60}
      defaultDate={new Date()}
      onSelectEvent={(value)=>console.log(value)}
    />
  </div>
  )
}
export default EventCalendar;