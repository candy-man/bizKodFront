import React from 'react';
import { Modal, Button } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Collapse, Select } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;
const genExtra = () => (
  <>
    10 <UserOutlined />
  </>
);

interface ViewModalProp {
  loading: boolean,
  visible: boolean,
  changeVisible: () => void,
  changeLoading: () => void,
  data:{
    title: String
    startDate: Date,
    endDate: Date,
    desc: String,
  }
}

const EventViewModal: React.FC<ViewModalProp> = ({ loading, visible, changeVisible, changeLoading, data }) => {

  const dummyUsers = [
    {
      key: 1,
      name: 'Marko Markovic',
      sektor: 'Razvoj',
      slika: ''
    },
    {
      key: 2,
      name: 'Sanja Markovic',
      sektor: 'Prodaja',
      slika: ''
    },
    {
      key: 3,
      name: 'Jovana Markovic',
      sektor: 'Polovni',
      slika: ''
    }
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => {
        return <h3>{name}</h3>
      }
    },
    {
      title: 'Sektor',
      dataIndex: 'Sektor',
      key: 'sektor'
    },
    {
      title: 'Slika',
      dataIndex: 'slika',
      key: 'slika',
      render: () => {
        return <Avatar size={40} icon={<UserOutlined />} />
      }
    }
  ];


  const handleOk = () => {
    changeLoading();
    setTimeout(() => {
      changeVisible();
      changeLoading()
    }, 3000);
  };

  const handleCancel = () => {
    changeVisible();
  };

// let year = new Intl.DateTimeFormat('sr', { year: 'numeric' }).format(data.startDate);
// let month = new Intl.DateTimeFormat('sr', { month: 'numeric' }).format(data.startDate);
// let day = new Intl.DateTimeFormat('sr', { day: '2-digit' }).format(data.startDate);
let date=data.startDate.toLocaleString('sr-SR')
let secondDate;
if(data.startDate.getTime()!==data.endDate.getTime()){
  secondDate=data.endDate.toLocaleString('sr-SR')
}
    // const { visible, loading } = this.state;
    return (
      <>
       
        <Modal
          visible={visible}
          title="Dogadjaj"
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Zatvori
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Prijavi se
            </Button>
          ]}
        >
          <div>
            <span>Naziv:</span>
            <h1>{data.title}</h1>
          </div>
          <div>
            <span>Datum i vreme:</span>
            <h3>{date} {secondDate?`- ${secondDate}`:''}</h3>
          </div>
          <div>
            <span>Opis:</span>
            <p>{data.desc}</p>
          </div>
          <div>
            <span>Mapa:</span>
            <p>XXX</p>
          </div>
          <Collapse
            defaultActiveKey={[]}
            expandIconPosition='right'
          >
            <Panel header="Prijavljeno:" key="1" extra={genExtra()}>
              <div>
                <Table pagination={false} dataSource={dummyUsers} columns={columns}/>
              </div>
            </Panel>
          </Collapse>
        </Modal>
      </>
    );
}

export default EventViewModal;