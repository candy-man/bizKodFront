import React from 'react';
import { Events } from '../interfaces/interfaces';
import EventCard from './EventCard';

interface EventListProps {
  eventsList: Events[];
  listTitle: string;
  state: string;
}

const EventListComponent: React.FC<EventListProps> = ({
  eventsList,
  listTitle,
  state,
}) => {
  return (
    <>
      <h2 className="subsection">{listTitle}</h2>
      <div className="listOfEvents">
        {eventsList.map((event) => {
          return <EventCard key={event.id} event={event} state={state} />;
        })}
      </div>
    </>
  );
};

export default EventListComponent;
