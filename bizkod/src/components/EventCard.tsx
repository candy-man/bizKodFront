import { Button } from 'antd';
import React from 'react';

interface EventCardProps {
  name: string;
  date: string;
  type: string;
}
const EventCard: React.FC<EventCardProps> = ({ name, date, type }) => {
  return (
    <div className="eventCard">
      <div className="eventCard-left">
        <img className='event-img' src="/images/placeholder.png" alt="event image" />
      </div>
      <div className="eventCard-right">
        <div className="eventCard-right-info flex-column-jcenter">
          <div><span className='label'>Naziv:</span> <span className='event-values'>{name}</span></div>
        <div><span className='label'>Datum:</span><span className='event-values'>{date}</span></div>
        <div><span className='label'>Tip:</span><span className='event-values'> {type}</span></div>
        </div>
        <div className='eventCard-buttonContainer flex-column-jcenter'>
          <span>Broj prijavljenih:</span>
          <h2>35</h2>
          <Button type="primary">Prijavi se</Button>
          <Button type='ghost'>Detalji</Button>
        </div>

      </div>
    </div>
  );
};

export default EventCard;
