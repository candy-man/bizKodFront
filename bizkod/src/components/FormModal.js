import { useState, useRef, useCallback, useEffect } from 'react';
import { Modal, DatePicker, Form, Input, Button, Select, notification } from 'antd';
import Map, { Marker } from 'react-map-gl';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { Switch } from 'antd';
import "./styles.css";
const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 32 },
};
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2FzYWJpemtvZCIsImEiOiJjbDNnN2pwaWEwemU5M2ZwcnJyYmlkejI2In0.DtWqRLwaTKgAlUuQOenTUA';
const FormModal = ({ show, setShow, hasData }) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    type: '',
    description: '',
    cords: [],
    longtitude: '',
    latitude: '',
    uploadedFileName: "",
    originalFileName: "",
    status: "Pending",
    users: [],
    startDate: "",
    endDate: ""
  });

  const [eventTypes, setEventTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [fileList, setFileList] = useState([]);
  const [search, setSearch] = useState(true);
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
    form.cords = form.cords.filter((item, idx) => {
      if (idx % 2 == 1) {
        return item;
      }
    });
    console.log(form);
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

  useEffect(()=>{
      fetch('http://bizkodapi.local/api/Events/eventTypes').then(res => res.json()).then(e => setEventTypes(e))
  },[])

  useEffect(() => {
    if (search) {
      setForm((prevState) => ({
        ...prevState,
        cords: [
          { longtitude: viewport.longitude, latitude: viewport.latitude },
        ],
      }));
    }
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);

  useEffect(() => {
    console.log(markers);
  }, [markers]);
  useEffect(() => {
    console.log(form);
  }, [form]);

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  const handleSubmit = async ()=>{

    var userId = uuidv4();
    var uploadedName = await handleUpload(userId);
    var toPost = {
      id: userId,
      name: form.name,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      originalFileName: image.name,
      uploadFileName: uploadedName,
      status: "Pending",
      longtitude:form.cords[0]?.latitude.toString() ,
      latitude: form.cords[0]?.longtitude.toString(),
      type: form.type
    }
    console.log(toPost);
    await fetch(`http://bizkodapi.local/api/Events/post`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(toPost),
    });
    
  }
  const handleUpload = async (userId)=> {
    var data = new FormData();
    data.append('file', image);
    //imagesam samo ubacio da ne izabcuje error
    var res = await fetch(`http://bizkodapi.local/api/Events/uploadFile?eventId=${userId}`, {
      method: 'POST',
      body: data,
    });
    return res.text();
  }
  const handleFile = (e) =>{
    setImage(e.target.files[0]);
  }
  const handleSetType =(e)=>{
    setForm((prevState) => ({
      ...prevState,
      type: e,
    }));
  }

  const dateChange =(value, dateString)=>{

    setForm((prevState) => ({
      ...prevState,
      startDate:dateString[0] ,
      endDate:dateString[1]
    }));
  }

  return (
    <div>
      <Modal
        title={hasData ? 'Izmeni dogadjaj' : 'Dodaj dogadjaj'}
        centered
        visible={show}
        onOk={ handleSubmit}
        onCancel={() => setShow(!show)}
        okText={hasData ? 'Izmeni' : 'Kreiraj'}
        cancelText="Otkaži"
      >
        <Form {...layout} onFinish={handleSubmit}>
        

          <Form.Item label="Slika:">
            <input className='inputCustom' type="file" onChange={handleFile} />
          </Form.Item>
          <Form.Item label="Ime:" required>
            <Input
              name="name"
              onChange={(e) => inputHandler(e)}
              value={form.name}
            />
          </Form.Item>
          <Form.Item label="Tip:" required>
            <Select
                name="type"
                showSearch
                placeholder="Izaberi tip dogadjaja..."
                onChange={(e)=>handleSetType(e)}
              >
              {eventTypes.map(e =>{
                return <Option key={e.eventTypeId} value={e.eventTypeId}>{e.name}</Option>
              } )}
              
              </Select>
          </Form.Item>
          <Form.Item label="Opis:" required>
            <Input.TextArea
              name="description"
              onChange={(e) => inputHandler(e)}
              value={form.description}
            />
          </Form.Item>
          <Form.Item label="Datum:">
          <RangePicker onChange={dateChange} />
        </Form.Item>
          <div className="flex-align">
            <Switch
              onClick={() => {
                setSearch(!search);
                setForm((prevState) => ({ ...prevState, cords: [] }));
              }}
              unCheckedChildren="Tura"
              checkedChildren="Događaj"
              checked={search}
              autoFocus="Događaj"
              style={{ marginRight: '10px' }}
            />

            {!search && (
              <Button
                type="dashed"
                onClick={() =>
                  setForm((prevState) => ({ ...prevState, cords: [] }))
                }
                style={{ border: 'none' }}
              >
                Reset
              </Button>
            )}
          </div>
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
                  console.log('pozvano');
                  let obj = {
                    longtitude: value.lngLat[0],
                    latitude: value.lngLat[1],
                  };

                  setForm((prevState) => ({
                    ...prevState,
                    cords: [...prevState.cords, obj],
                  }));
                }}
              >
                {form.cords.length > 0 &&
                  form.cords.map((marker, idx) => {
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
