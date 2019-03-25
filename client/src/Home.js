import React, { useState } from "react";
import Chatting from "./Chatting";
import Input from "./input";

const Home = () => {
  const [room, setRoom] = useState("roomA");
  console.log(room);
  return (
    <div>
      {/* <RoomInput /> */}
      <Chatting room={room} setRoom={setRoom} />
      <Input room={room} setRoom={setRoom} />
    </div>
  );
};

export default Home;