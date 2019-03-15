import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
// import io from 'socket.io-client';
const write = gql`
  mutation write($writer: String!, $description: String!, $roomName: String!) {
    write(writer: $writer, description: $description, roomName: $roomName)
  }
`;

const Input = () => {
  const [writer, setWriter] = useState("");
  useEffect(() => {
    // const socket = io(`http://localhost:4000`);
    // const writer = prompt('Name');
    const writer = "AA";
    setWriter(writer);
  }, []);
  const [description, setDescription] = useState("");
  const mutation = useMutation(write, {
    variables: {
      writer,
      description,
      roomName: "RoomA"
    }
  });
  return (
    // <button onClick={mutation}>ClickMe!</button>
    <div>
      <input
        type="text"
        value={description}
        placeholder="내용을 입력하세요"
        onChange={e => {
          setDescription(e.target.value);
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            setDescription("");
            mutation();
          }
        }}
      />
      <button
        onClick={() => {
          setDescription("");
          mutation();
        }}
      >
        확인
      </button>
    </div>
  );
};

export default Input;
