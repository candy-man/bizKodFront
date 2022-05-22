import React, { useRef, useCallback, useState } from 'react';
import { Modal, Button } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Collapse, Select } from 'antd';
import Map, { Marker } from 'react-map-gl';
import MapGL from 'react-map-gl';

const { Panel } = Collapse;
const { Option } = Select;
const genExtra = () => (
  <>
    10 <UserOutlined />
  </>
);
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2FzYWJpemtvZCIsImEiOiJjbDNnN2pwaWEwemU5M2ZwcnJyYmlkejI2In0.DtWqRLwaTKgAlUuQOenTUA';

// interface ViewModalProp {
//   loading: boolean;
//   visible: boolean;
//   changeVisible: () => void;
//   changeLoading: () => void;
//   data: {
//     title: String;
//     startDate: Date;
//     endDate: Date;
//     desc: String;
//   };
//   event: object;
// }

const EventViewModal = ({
  loading,
  visible,
  changeVisible,
  changeLoading,
  data,
  event,
}) => {
  const eventData = event;

  console.log(eventData);
  eventData.latitude = +eventData.latitude;
  eventData.longtitude = +eventData.longtitude;

  const [viewport, setViewport] = useState({
    longitude: eventData.longitude,
    latitude: eventData.latitude,
    zoom: 10,
  });
  const mapRef = useRef();
  const dummyUsers = [
    {
      key: 1,
      name: 'Marko Markovic',
      sektor: 'Razvoj',
      slika: '',
    },
    {
      key: 2,
      name: 'Sanja Markovic',
      sektor: 'Prodaja',
      slika: '',
    },
    {
      key: 3,
      name: 'Jovana Markovic',
      sektor: 'Polovni',
      slika: '',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => {
        return <h3>{name}</h3>;
      },
    },
    {
      title: 'Sektor',
      dataIndex: 'Sektor',
      key: 'sektor',
    },
    {
      title: 'Slika',
      dataIndex: 'slika',
      key: 'slika',
      render: () => {
        return <Avatar size={40} icon={<UserOutlined />} />;
      },
    },
  ];

  const handleOk = () => {
    changeLoading();
    setTimeout(() => {
      changeVisible();
      changeLoading();
    }, 3000);
  };

  const handleCancel = () => {
    changeVisible();
  };

  let date = data.startDate.toLocaleDateString('sr-SR');
  let secondDate;
  if (data.startDate.getTime() !== data.endDate.getTime()) {
    secondDate = data.endDate.toLocaleDateString('sr-SR');
  }
  // const { visible, loading } = this.state;

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  console.log(event);
  return (
    <>
      <Modal
        visible={visible}
        title="Događaj"
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Zatvori
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Prijavi se
          </Button>,
        ]}
      >
        <div>
          <span>Naziv:</span>
          <h1>{data.title}</h1>
        </div>
        <div>
          <span>Datum i vreme:</span>
          <h3>
            {date} {secondDate ? `- ${secondDate}` : ''}
          </h3>
        </div>
        <div>
          <span>Opis:</span>
          <p>{data.desc}</p>
        </div>
        <div>
          <span>Mapa:</span>
          {/* {eventData && typeof eventData.latitude == 'number' && (
            <Map
              ref={mapRef}
              {...viewport}
              width="100%"
              height={400}
              onViewportChange={handleViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker
                longitude={viewport.longitude}
                latitude={viewport.latitude}
              >
                <img
                  style={{ width: '30px', height: '30px' }}
                  src="/images/pin.png"
                  alt="pin"
                />
              </Marker>
            </Map>
          )} */}
        </div>
        <Collapse defaultActiveKey={[]} expandIconPosition="right">
          <Panel header="Prijavljeno:" key="1" extra={genExtra()}>
            <div>
              <Table
                pagination={false}
                dataSource={dummyUsers}
                columns={columns}
              />
            </div>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
};

export default EventViewModal;
