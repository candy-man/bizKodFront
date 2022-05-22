import { Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import EventViewModal from '../modals/EventViewModal';
import { UserOutlined } from '@ant-design/icons';
import { Events } from '../interfaces/interfaces';

interface EventCardProps {
  event: Events;
  state: string;
}

interface DataDetails {
  title: string,
  startDate: Date,
  endDate: Date,
  desc: string
}

const EventCard: React.FC<EventCardProps> = ({ event, state }) => {

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [data, setFormattedData] = useState<DataDetails>();

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
  }

  const signOutOfEvent = () => {
    // request odjavi se sa eventa
  }

  useEffect(() => {
    setFormattedData({
      title: event.name,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      desc: ''
    })
    // let data = {
    //   title: event.name,
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   desc: ''
    // }  
  }, [event])

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
      ></EventViewModal>
    </div>
  );
};

export default EventCard;
