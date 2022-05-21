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
  changeLoading: () => void
}

const EventViewModal: React.FC<ViewModalProp> = ({ loading, visible, changeVisible, changeLoading }) => {

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
            <h1>Neki event name</h1>
          </div>
          <div>
            <span>Datum i vreme:</span>
            <h3>11.2.3</h3>
          </div>
          <div>
            <span>Opis:</span>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
                <Table dataSource={dummyUsers} />;
              </div>
            </Panel>
          </Collapse>
        </Modal>
      </>
    );
}

export default EventViewModal;