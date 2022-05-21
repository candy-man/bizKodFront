import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Modal, Form, Input, Button, notification, Upload } from 'antd';
import { UploadOutlined, StarOutlined } from '@ant-design/icons';
import Map, { Marker } from 'react-map-gl';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import uuid from 'uuidv4';

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
  const [search, setSearch] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [image, setImage] = useState('');
  const [lang, setLang] = useState(0);
  const [lat, setLat] = useState(0);

  const [viewport, setViewport] = useState({
    longitude: 19.6646,
    latitude: 46.0997,
    zoom: 15,
  });
  const mapRef = useRef();

  const sendData = () => {
    if (!form.name || !form.type || !form.description) {
      notification.error({
        placement: 'bottomRight',
        message: 'Popunite sve podatke.',
      });
      return;
    }

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
    let input = info.file.originFileObj;
    setImage(input);

    fileList = fileList.slice(-2);

    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
  };

  const handleUpload = () => {
    var data = new FormData();
    data.append('file', image);
    //imagesam samo ubacio da ne izabcuje error
    fetch(`http://bizkodapi.local/api/Events/uploadFile?eventId=${image}`, {
      method: 'POST',
      body: data,
    });
  };

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

  useEffect(() => {
    if (search) {
      setForm((prevState) => ({
        ...prevState,
        longtitude: viewport.longitude,
        latitude: viewport.latitude,
      }));
    }
  }, [viewport]);

  useEffect(() => {
    console.log(markers);
  }, [markers]);
  useEffect(() => {
    console.log(form);
  }, [form]);
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

          {search && (
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
            </MapGL>
          )}
          {!search && (
            <>
              <Map
                ref={mapRef}
                {...viewport}
                width="100%"
                height={400}
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onClick={(value) => {
                  // setLang(value.lngLat[0]);
                  // setLat(value.lngLat[1]);
                  let obj = {
                    longtitude: value.lngLat[0],
                    latitude: value.lngLat[1],
                  };
                  setMarkers((prevState) => [...prevState, obj]);
                }}
              >
                {markers.length > 0 &&
                  markers.map((marker, idx) => {
                    return (
                      <Marker
                        key={idx}
                        longitude={marker.longtitude}
                        latitude={marker.latitude}
                      >
                        <img
                          style={{ width: '30px', height: '30px' }}
                          src="/images/pin.png"
                          alt="pin"
                        />
                      </Marker>
                    );
                  })}
              </Map>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default FormModal;
