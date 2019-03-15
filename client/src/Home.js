import React from "react";
import Chatting from "./Chatting";
import Input from "./input";
import RoomInput from "./RoomInput";

const Home = () => {
  return (
    <div>
      {/* <RoomInput /> */}
      <Chatting />
      <Input />
    </div>
  );
};

export default Home;