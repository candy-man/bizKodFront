import { Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import EventViewModal from '../modals/EventViewModal';
import { UserOutlined } from '@ant-design/icons';
import { Events } from '../interfaces/interfaces';

// interface EventCardProps {
//   event: Events;
//   state: string;
// }


const EventCard = ({ event, state }) => {

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setFormattedData] = useState(null);

  const changeVisible = () => {
    setVisible(!visible);
  };

  const changeLoading = () => {
    setLoading(!loading);
  };

  const signUpForEvent = () => {
    // request prijavi se za event
  };

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  const acceptEvent = async () => {
    var userId = uuidv4();
    var toPost = {
      id: userId,
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      originalFileName: event.originalFileName,
      uploadFileName: event.uploadFileName,
      status: 'Odobren',
      longtitude: event.cords[0]?.latitude.toString(),
      latitude: event.cords[0]?.longtitude.toString(),
      type: event.type,
    };
    console.log(toPost);
    await fetch(`http://bizkodapi.local/api/Events/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toPost),
    });
  };

  const cancelEvent = async () => {
    var userId = uuidv4();
    var toPost = {
      id: userId,
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      originalFileName: event.originalFileName,
      uploadFileName: event.uploadFileName,
      status: 'Odobren',
      longtitude: event.cords[0]?.latitude.toString(),
      latitude: event.cords[0]?.longtitude.toString(),
      type: event.type,
    };
    console.log(toPost);
    await fetch(`http://bizkodapi.local/api/Events/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toPost),
    });
  };

  const signOutOfEvent = () => {
    // request odjavi se sa eventa
  }

  useEffect(() => {
    setFormattedData({
      title: event.name,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      desc: event.desc ? event.desc : ''
    })
  }, [event])

  useEffect(() => {
    console.log(event);
  });

  return (
    <div className="eventCard">
      <div className="eventCard-left">
        <img
          className="event-img"
          src="/images/placeholder.png"
          alt="event image"
        />
      </div>
      <div className="cardContent">
        <div className="cardTitleContainer">
          <div>
            <span>Naziv:</span>
            <span>
              5 <UserOutlined />
            </span>
          </div>
          <h2>{event.name}</h2>
        </div>
        <div className="content">
          <div className="eventCard-right-info flex-column-jcenter">
            <div>
              <span>Datum:</span>
              <h4>{data?.startDate.toLocaleDateString('sr-SR')}</h4>
            </div>
            <div>
              <span>Tip:</span>
              <h4>{event.eventType}</h4>
            </div>
          </div>
          <div className="eventCard-buttonContainer flex-column-jcenter">
            {state === 'selected' && (
              <Button type="primary" onClick={signOutOfEvent}>
                Odjavi se
              </Button>
            )}
            //ako je admin ovako
            {state === 'awaiting' && (
              <Button
                style={{ marginBlock: '2px' }}
                type="primary"
                onClick={acceptEvent}
              >
                Prihvati
              </Button>
            )}
            {state === 'awaiting' && (
              <Button
                style={{ marginBlock: '2px' }}
                danger
                onClick={cancelEvent}
              >
                Otkaži
              </Button>
            )}
            //ako je evenet live
            {state === 'live' && (
              <Button type="primary" onClick={signUpForEvent}>
                Prijavi se
              </Button>
            )}
            <Button type="ghost" onClick={changeVisible}>
              Detalji
            </Button>
          </div>
        </div>
      </div>

      <EventViewModal
        changeVisible={changeVisible}
        changeLoading={changeLoading}
        visible={visible}
        loading={loading}
        data={data? data : null}
        event={event}
      ></EventViewModal>
    </div>
  );
};

export default EventCard;
