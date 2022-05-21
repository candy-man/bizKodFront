import React, { useState } from "react";
import {Button, Modal} from "antd";
import EventCalendar from "./EventCalendar";

interface Props {};

const Events: React.FC<Props> =()=>{

  const [visibleModal, setVisibleModal]=useState(false);

  return(
<div>
  <div className="eventButton">
    <Button onClick={()=>setVisibleModal(true)}>Kalendar događaja</Button>
  </div>
  <Modal
    className="eventModal"
    visible={visibleModal}
    footer=""
    onCancel={()=>setVisibleModal(false)}
    >
      <EventCalendar/>
  </Modal>
</div>
  )
}
export default Events;