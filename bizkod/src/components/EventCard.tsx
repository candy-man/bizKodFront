import { Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import EventViewModal from '../modals/EventViewModal';
import { UserOutlined } from '@ant-design/icons';
import { Events } from '../interfaces/interfaces';

interface EventCardProps {
  event: Events;
  state: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, state }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeVisible = () => {
    setVisible(!visible);
  };

  const changeLoading = () => {
    setLoading(!loading);
  };

  const signUpForEvent = () => {
    // request prijavi se za event
  };
  const cancelEvent = () => {
    // request otkazi event
  };

  const accpetEvent = () => {};

  const signOutOfEvent = () => {
    // request odjavi se sa eventa
  };

  useEffect(() => {
    switch (state) {
    }
  }, [state]);

  let data = {
    title: event ? event.name : 'Event',
    startDate: event ? new Date(event.startDate) : new Date(),
    endDate: event ? new Date(event.startDate) : new Date(),
    desc: '',
  };

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
              35 <UserOutlined />
            </span>
          </div>
          <h2>{event.name}</h2>
        </div>
        <div className="content">
          <div className="eventCard-right-info flex-column-jcenter">
            <div>
              <span>Datum:</span>
              <h4>{data.startDate.toLocaleDateString('sr-SR')}</h4>
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
                onClick={cancelEvent}
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
        data={data}
        event={event}
      ></EventViewModal>
    </div>
  );
};

export default EventCard;
