import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { useLocation, useParams } from 'react-router-dom';

import EventListComponent from './EventsListComponent';
import { Events } from '../interfaces/interfaces';

const dummyUserData = [
  {
    username: 'markomarkovic@infostud.com',
    name: 'Marko Markovic',
    image: '',
    contact: '9304820384',
    sector: 'Prodaja',
    selectedEvents: [
      {
        id: '33333',
        name: 'Stopama grada kroz period secesije',
        startDate: '2022-03-22',
        endDate: 'ssss',
        location: 'ssss',
        eventTypeId: 'icvkjhdskfl',
        eventType: 'Tura',
        status: 'pending',
      },
      {
        id: '4444',
        name: 'Vinska tura',
        startDate: '2022-03-22',
        endDate: 'ssss',
        location: 'ssss',
        eventTypeId: 'icvkjhdskfl',
        eventType: 'Tura',
        status: 'approved',
      },
    ],
    users: [],
  },
];

interface props {}

const UserProfile: React.FC<props> = ({}) => {
  let { userId } = useParams();

  const [pendingEvents, setPendingEvents] = useState<Events[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Events[]>([]);

  useEffect(() => {
    let pending = [
      ...dummyUserData[0].selectedEvents.filter(
        (event) => event.status === 'pending'
      ),
    ];
    setPendingEvents(pending);
    let selected = [
      ...dummyUserData[0].selectedEvents.filter(
        (event) => event.status === 'approved'
      ),
    ];
    setSelectedEvents(selected);
  }, []);

  return (
    <div className="userProfileContainer">
      <div className="eventsContainer">
        {pendingEvents ? (
          <>
            <div>
              <EventListComponent
                eventsList={pendingEvents}
                listTitle={'Na čekanju'}
                state={'awaiting'}
              ></EventListComponent>
            </div>
          </>
        ) : (
          <></>
        )}
        <div>
          <EventListComponent
            eventsList={selectedEvents}
            listTitle={'Odabrani događaji'}
            state={'selected'}
          ></EventListComponent>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
