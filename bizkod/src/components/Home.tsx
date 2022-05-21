import React, {useState} from "react";
import { Button, Modal } from "antd";
import EventCalendar from "./EventCalendar";

const Home=()=>{

const [visibleModal, setVisibleModal]=useState(false);

    return(
       <div>
        <Button onClick={()=>setVisibleModal(true)}>
            Events
        </Button>
        <Modal
        className="eventModal"
        visible={visibleModal}
        footer=''
        onCancel={()=>setVisibleModal(false)}
        >
            <EventCalendar/>
        </Modal>
      </div>
    )
}
export default Home;