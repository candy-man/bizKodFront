import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { useLocation, useParams } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import EventListComponent from './EventsListComponent';
import { Events } from '../interfaces/interfaces';

const dummyUserData = [{
    username: 'markomarkovic@infostud.com',
    name: 'Marko Markovic',
    image: '',
    contact: '9304820384',
    sector: 'Prodaja',
    selectedEvents: [
        {
            id: '33333',
            name: 'Stopama grada kroz period secesije',
            startDate: '22.03.2022.',
            endDate: 'ssss',
            location: 'ssss',
            eventTypeId: 'icvkjhdskfl',
            eventType: 'Tura',
            status: 'pending'
        },
        {
            id: '4444',
            name: 'Vinska tura',
            startDate: '22.03.2022.',
            endDate: 'ssss',
            location: 'ssss',
            eventTypeId: 'icvkjhdskfl',
            eventType: 'Tura',
            status: 'approved'
        }
    ],
    users: [
    ]
}];


interface props { };

const UserProfile: React.FC<props> = ({ }) => {

    let { userId } = useParams();

    const [pendingEvents, setPendingEvents] = useState<Events[]>([]);
    const [selectedEvents, setSelectedEvents] = useState<Events[]>([]);

    useEffect(() => {
        let pending = [...dummyUserData[0].selectedEvents.filter((event) => event.status === 'pending')];
        setPendingEvents(pending);
        let selected = [...dummyUserData[0].selectedEvents.filter((event) => event.status === 'approved')];
        setSelectedEvents(selected);
    }, []);

    return (
        <div className="userProfileContainer">
            <div className="profileInfo">
                <div className="profile">
                    <div className="profilePicture">
                        {dummyUserData[0].image ?
                            <img className='event-img' alt='Profilna slika' src={dummyUserData[0].image} />
                            : <Avatar size={64} icon={<UserOutlined />} />
                        }
                    </div>
                    <div className="userInfo">
                        <h1>{dummyUserData[0].name}</h1>
                        <span className='profileLabel'>{dummyUserData[0].sector}</span>
                        <div>
                            <span className='profileLabel'>Kontakt: {dummyUserData[0].contact}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="eventsContainer">
                {pendingEvents ?
                    <>
                        <div>
                           <EventListComponent eventsList={pendingEvents} listTitle={"Na čekanju"} state={"awaiting"}></EventListComponent>
                        </div>
                    </>
                    :
                    <></>
                }
                <div>
                    <EventListComponent eventsList={selectedEvents} listTitle={"Odabrani događaji"} state={"selected"}></EventListComponent>
                </div>
            </div>
        </div>
    )
}


export default UserProfile;