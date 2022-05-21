import React from 'react';
import { Events } from '../interfaces/interfaces';
import EventCard from './EventCard';

interface EventListProps {
    eventsList: Events[];
    listTitle: string;
}

const EventListComponent: React.FC<EventListProps> = ({ eventsList, listTitle }) => {

    return (
        <>
            <h4 className="subsection">{listTitle}</h4>
            <div className="listOfEvents">
                {
                    eventsList.map((event)=> {
                        return <EventCard event={event} ></EventCard>
                    })
                }
            </div>
        </>
    )

}

export default EventListComponent;