import React,{useState, useEffect, useRef, useCallback} from "react";
import { Modal, Button } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Collapse, Select } from "antd";
import { computeHeadingLevel } from "@testing-library/react";
import moment from "moment";
import Map, { Marker } from "react-map-gl";
import MapGL from "react-map-gl";
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2FzYWJpemtvZCIsImEiOiJjbDNnN2pwaWEwemU5M2ZwcnJyYmlkejI2In0.DtWqRLwaTKgAlUuQOenTUA';
const { Panel } = Collapse;
const { Option } = Select;


// interface ViewModalProp {
//   loading: boolean;
//   visible: boolean;
//   changeVisible: () => void;
//   changeLoading: () => void;
//   data: any;
// }

const EventViewModal = ({
  loading,
  visible,
  changeVisible,
  changeLoading,
  data,
  event
}) => {
  const dummyUsers = [
    {
      key: 1,
      name: "Marko Markovic",
      sektor: "Razvoj",
      slika: "",
    },
    {
      key: 2,
      name: "Sanja Markovic",
      sektor: "Prodaja",
      slika: "",
    },
    {
      key: 3,
      name: "Jovana Markovic",
      sektor: "Polovni",
      slika: "",
    },
  ];

  const genExtra = () => (
    <>
      {event?.users?.length} <UserOutlined />
    </>
  );

  
  const mapRef = useRef();

  const eventData = event;

  console.log(event)

  if(eventData){
    eventData.longtitude = +eventData.longtitude;
    eventData.latitude= +eventData.latitude;
  }

  const [viewport, setViewport] = useState({
    longitude:eventData.latitude,
    latitude:eventData.longtitude,
    zoom: 15,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => {
        return <h3>{name}</h3>;
      },
    },
    {
      title: "Sektor",
      dataIndex: "Sektor",
      key: "sektor",
    },
    {
      title: "Slika",
      dataIndex: "slika",
      key: "slika",
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

  console.log(data);
  // let date = data.startDate.toLocaleDateString("sr-SR");
  // let secondDate;
  // if (data.startDate.getTime() !== data.endDate.getTime()) {
  //   secondDate = data.endDate.toLocaleDateString("sr-SR");
  // }
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

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/Events/eventTypes")
  //     .then((res) => res.json())
  //     .then((e) => setEventTypes(e));
  // }, []);

  // useEffect(() => {
  //   if (search) {
  //     setForm((prevState) => ({
  //       ...prevState,
  //       cords: [
  //         { longtitude: viewport.longitude, latitude: viewport.latitude },
  //       ],
  //     }));
  //   }
  // }, [viewport]);

  console.log('ev',data)
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
          <h1>{eventData.name}</h1>
        </div>
        <div>
          <span>Datum i vreme:</span>
          <h3>
            <>
              {(data?.startDate).split('T')[0].split('-').reverse().join('.')}
              {(data?.endDate).split('T')[0].split('-').reverse().join('.') ? `- ${(data?.endDate).split('T')[0].split('-').reverse().join('.')}` : ""}
            </>
          </h3>
        </div>
        <div>
          <span>Opis:</span>
          <p>{eventData.description}</p>
        </div>
        <div>
          <span>Mapa:</span>
          <Map
            ref={mapRef}
            {...viewport}
            width="100%"
            height={400}
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {eventData  && (
              <Marker
              longitude={eventData.latitude}
              latitude={eventData.longtitude}
            >
              <img
                style={{ width: '30px', height: '30px' }}
                src="/images/pin.png"
                alt="pin"
              />
            </Marker>
            )}
          </Map>
        </div>
        <Collapse defaultActiveKey={[]} expandIconPosition="right">
          <Panel header="Prijavljeno:" key="1" extra={genExtra()}>
            <div>
              <Table
                pagination={false}
                dataSource={eventData.users}
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
