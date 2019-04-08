import React, { useState, useEffect } from "react";
import Chatting from "./Chatting";
import Input from "./input";

const Home = () => {
  const [writer, setWriter] = useState("");
  useEffect(() => {
    const writer = prompt("Name");
    setWriter(writer);
  }, []);
  const [roomName, setRoom] = useState("RoomA");
  return (
    <div>
      <Chatting roomName={roomName} setRoom={setRoom} />
      <Input roomName={roomName} writer={writer} />
    </div>
  );
};

export default Home;
