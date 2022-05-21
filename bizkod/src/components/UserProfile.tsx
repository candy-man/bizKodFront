import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { useLocation, useParams } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const dummyUserData = [{
    username: 'markomarkovic@infostud.com',
    name: 'Marko Markovic',
    image: '',
    contact: '9304820384',
    sector: 'Prodaja',
    selectedEvents: [
        {
            id: 2,
            name: 'Stopama grada kroz period secesije',
            date: '22.03.2022.',
            type: 'Tura',
            status: 'pending'
        },
        {
            id: 3,
            name: 'Vinska ruta',
            date: '22.03.2022.',
            type: 'Tura',
            status: 'approved'
        }
    ],
    users: [
    ]
}];

interface SelectedEvents {
    id: number;
    name: string;
    date: string;
    type: string;
    status: string;
}

interface props { };

const UserProfile: React.FC<props> = ({ }) => {

    let { userId } = useParams();

    const [pendingEvents, setPendingEvents] = useState<SelectedEvents[]>([]);
    const [selectedEvents, setSelectedEvents] = useState<SelectedEvents[]>([]);

    useEffect(() => {
        let pending = [...dummyUserData[0].selectedEvents.filter((event) => event.status === 'pending')];
        setPendingEvents(pending);
        console.log(pendingEvents, 'pending');
        let selected = [...dummyUserData[0].selectedEvents.filter((event) => event.status === 'approved')];
        setSelectedEvents(selected);
        console.log(selectedEvents, 'selected');
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
                        <h2>{dummyUserData[0].name}</h2>
                        <div>
                            <span>Kontakt:</span>
                            <span className='profileLabel'>{dummyUserData[0].contact}</span>
                        </div>
                        <div>
                            <span>Sektor:</span>
                            <span className='profileLabel'>{dummyUserData[0].sector}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="eventsContainer">
                {pendingEvents ?
                    <>
                        <h4 className="subsection">Na čekanju</h4>
                        <div>
                            {pendingEvents.map((event) => {
                                return <EventCard key={event.id} id={event.id} name={event.name} date={event.date} type={event.type}></EventCard>
                            })}
                        </div>
                    </>
                    :
                    <></>
                }
                <h4 className="subsection">Odabrani događaji</h4>
                <div>
                    {dummyUserData[0]?.selectedEvents?.map((event) => {
                        return <EventCard key={event.id} id={event.id} name={event.name} date={event.date} type={event.type}></EventCard>
                    })}
                </div>
            </div>
        </div>
    )
}


export default UserProfile;