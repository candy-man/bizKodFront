import React, { useState, useRef, useCallback } from 'react';
import { Modal, Form, Input, Button, notification, Upload } from 'antd';
import { UploadOutlined, StarOutlined } from '@ant-design/icons';
import Map, { Marker } from 'react-map-gl';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2FzYWJpemtvZCIsImEiOiJjbDNnN2pwaWEwemU5M2ZwcnJyYmlkejI2In0.DtWqRLwaTKgAlUuQOenTUA';
const FormModal = ({ show, setShow, hasData }) => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
    longtitude: '',
    latitude: '',
    users: [],
  });

  const [fileList, setFileList] = useState([]);

  const sendData = () => {
    if (!form.name || !form.type || !form.description) {
      notification.error({
        placement: 'bottomRight',
        message: 'Popunite sve podatke.',
      });
      return;
    }
    // if (form.map && !form.map.includes('https')) {
    //   notification.error({
    //     placement: 'bottomRight',
    //     message: 'Google Map url nije u dobrom formatu, pokušajte kasnije.',
    //   });
    //   return;
    // }

    console.log('data is being sent');
    notification.success({
      placement: 'bottomRight',
      message: 'Uspesno dodat događaj.',
    });
    setShow(false);
  };

  const inputHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const props = {
    // action: 'http://bizkodapi.local/api/Events/eventTypes',
    onChange: (info) => handleChange(info),
    multiple: true,
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: 'Download',
      showRemoveIcon: true,
      removeIcon: <p>&#x2716;</p>,
    },
  };

  const handleChange = async (info) => {
    let fileList = [];
    fileList = [...info.fileList];

    // console.log('info', info.file.originFileObj);

    // let input = info.file.originFileObj;

    // var data = new FormData();
    // data.append('file', input);

    // fetch('http://bizkodapi.local/api/Events/eventTypes', {
    //   method: 'POST',
    //   body: data,
    // });

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
  };

  const [lang, setLang] = useState(0);
  const [lat, setLat] = useState(0);

  const [viewport, setViewport] = useState({
    longitude: 19.6646,
    latitude: 46.0997,
    zoom: 15,
  });
  const mapRef = useRef();
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

  return (
    <div>
      <Modal
        title={hasData ? 'Izmeni dogadjaj' : 'Dodaj dogadjaj'}
        centered
        visible={show}
        onOk={() => sendData()}
        onCancel={() => setShow(!show)}
        okText={hasData ? 'Izmeni' : 'Kreiraj'}
        cancelText="Otkaži"
      >
        <Form {...layout} onFinish={() => console.log('finished')}>
          <Form.Item label="Slika:">
            <Upload className="modal" {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Ime:" required>
            <Input
              name="name"
              onChange={(e) => inputHandler(e)}
              value={form.name}
            />
          </Form.Item>
          <Form.Item label="Tip:" required>
            <Input
              name="type"
              onChange={(e) => inputHandler(e)}
              value={form.type}
            />
          </Form.Item>
          <Form.Item label="Opis:" required>
            <Input.TextArea
              name="description"
              onChange={(e) => inputHandler(e)}
              value={form.description}
            />
          </Form.Item>

          <MapGL
            ref={mapRef}
            {...viewport}
            width="100%"
            height={400}
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position="top-left"
            />
            <Marker
              longitude={19.6646}
              latitude={46.0997}
              color="red"
              anchor="center"
            />
          </MapGL>
        </Form>
      </Modal>
    </div>
  );
};

export default FormModal;
