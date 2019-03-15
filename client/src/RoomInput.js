import React from "react";
import { useSubscription } from "react-apollo-hooks";

const RoomInput = () => {
  return (
    <div>
      <button
        onClick={e => {
          console.log(e);
        }}
        name="RoomA"
      >
        RoomA
      </button>
      <button>RoomB</button>
    </div>
  );
};

export default RoomInput;
