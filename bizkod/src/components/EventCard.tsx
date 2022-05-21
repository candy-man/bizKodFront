import { Button } from 'antd';
import React, { useState } from 'react';
import EventViewModal from '../modals/EventViewModal';
import { UserOutlined } from '@ant-design/icons';


interface EventCardProps {
  id: number
  name: string;
  date: string;
  type: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, name, date, type }) => {

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const changeVisible = () => {
    setVisible(!visible);
  }

  const changeLoading = () => {
    setLoading(!loading);
  }
let data={
  title:'Event',
  startDate: new Date(),
  endDate: new Date(),
  desc:''
}
  return (
    <div className="eventCard">
      <div className="eventCard-left">
        <img className='event-img' src="/images/placeholder.png" alt="event image" />
      </div>
      <div className="cardContent">
        <div className="cardTitleContainer">
          <div>
            <span>Naziv:</span>
            <span>35 <UserOutlined /></span>
          </div>
          <h2>{name}</h2>
        </div>
        <div className="content">
          <div className="eventCard-right-info flex-column-jcenter">
            <div>
              <span>Datum:</span>
              <h4>{date}</h4>
            </div>
            <div>
              <span>Tip:</span>
              <h4>{type}</h4>
            </div>
          </div>
          <div className='eventCard-buttonContainer flex-column-jcenter'>
            <Button type="primary">Prijavi se</Button>
            <Button type='ghost' onClick={changeVisible}>Detalji</Button>
          </div>

        </div>
      </div>

      <EventViewModal changeVisible={changeVisible} changeLoading={changeLoading} visible={visible} loading={loading} data={data}></EventViewModal>
    </div>
  );

};

export default EventCard;
