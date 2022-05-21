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
        await fetch('http://bizkodapi.local/api/Events/calendar').then(res => res.json()).then(setEvents)
      }
    }
    FetchEvents()
  }, [events])

  // const dummyEvents= [
  //   {
  //     'title': 'All Day Event very long title',
  //     'allDay': true,
  //     'start': new Date(2022, 4, 1),
  //     'end': new Date(2022, 4, 1)
  //   },
  //   {
  //     'title': 'Long Event',
  //     'start': new Date(2022, 4, 7),
  //     'end': new Date(2022, 4, 10)
  //   },
  
  //   {
  //     'title': 'Some Event',
  //     'start': new Date(2022, 4, 9, 0, 0, 0),
  //     'end': new Date(2022, 4, 9, 0, 0, 0)
  //   },
  //   {
  //     'title': 'Conference',
  //     'start': new Date(2022, 4, 11),
  //     'end': new Date(2022, 4, 13),
  //     desc: 'Big conference for important people'
  //   },
  //   {
  //     'title': 'Meeting',
  //     'start': new Date(2022, 4, 12, 10, 30, 0, 0),
  //     'end': new Date(2022, 4, 12, 12, 30, 0, 0),
  //     desc: 'Pre-meeting meeting, to prepare for the meeting'
  //   },
  //   {
  //     'title': 'Lunch',
  //     'start': new Date(2022, 4, 12, 12, 0, 0, 0),
  //     'end': new Date(2022, 4, 12, 13, 0, 0, 0),
  //     desc: 'Power lunch'
  //   },
  //   {
  //     'title': 'Meeting',
  //     'start': new Date(2022, 4, 12, 14, 0, 0, 0),
  //     'end': new Date(2022, 4, 12, 15, 0, 0, 0)
  //   },
  //   {
  //     'title': 'Happy Hour',
  //     'start': new Date(2022, 4, 12, 17, 0, 0, 0),
  //     'end': new Date(2022, 4, 12, 17, 30, 0, 0),
  //     desc: 'Most important meal of the day'
  //   },
  //   {
  //     'title': 'Dinner',
  //     'start': new Date(2022, 4, 12, 20, 0, 0, 0),
  //     'end': new Date(2022, 4, 12, 21, 0, 0, 0)
  //   },
  //   {
  //     'title': 'Birthday Party',
  //     'start': new Date(2022, 4, 13, 7, 0, 0),
  //     'end': new Date(2022, 4, 13, 10, 30, 0)
  //   },
  //   {
  //     'title': 'Birthday Party 2',
  //     'start': new Date(2022, 4, 13, 7, 0, 0),
  //     'end': new Date(2022, 4, 13, 10, 30, 0)
  //   },
  //   {
  //     'title': 'Birthday Party 3',
  //     'start': new Date(2022, 4, 13, 7, 0, 0),
  //     'end': new Date(2022, 4, 13, 10, 30, 0)
  //   },
  //   {
  //     'title': 'Multi-day Event',
  //     'start': new Date(2022, 4, 20, 19, 30, 0),
  //     'end': new Date(2022, 4, 22, 2, 0, 0)
  //   }
  // ]

  if(events){
    events.map((item)=>{
      item.start=new Date(item.start);
      item.end=new Date(item.end);
      return item
    });
  }
  

let eventData={
  title:event?event.title:'',
  startDate:event?event.start:new Date(),
  endDate:event?event.end:new Date(),
  desc:event?event.desc:''
}

const hideModal=()=>{
  setVisible(false);
}

const showDetails=(data)=>{
  setEvent(data)
  setVisible(true)
}
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
    <EventViewModal data={eventData} loading={false} visible={visible} changeLoading={()=>{}} changeVisible={hideModal}/>
  </div>
  )
}
export default EventCalendar;