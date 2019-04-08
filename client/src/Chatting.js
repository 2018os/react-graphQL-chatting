import React, { Fragment } from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";

const getChatting = gql`
  query chatting($roomName: String!) {
    chatting(roomName: $roomName) {
      _id
      writer
      description
    }
  }
`;

const newChat = gql`
  subscription {
    newChat {
      _id
      writer
      description
    }
  }
`;

let unsubscribe = null; //publish 했을때

const Chatting = props => {
  const { roomName, setRoom } = props;
  return (
    <Fragment>
      <button onClick={() => setRoom("RoomA")}>RoomA</button>
      <button onClick={() => setRoom("RoomB")}>RoomB</button>
      <Query query={getChatting} variables={{ roomName }}>
        {({ loading, data, subscribeToMore }) => {
          if (loading) {
            return null;
          }
          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: newChat,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { newChat } = subscriptionData.data;
                return {
                  ...prev,
                  chatting: [...prev.chatting, newChat]
                };
              }
            });
          }
          return (
            <div>
              {data.chatting.map(x => (
                <h3 key={x._id}>
                  {x.writer}: {x.description}
                </h3>
              ))}
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default Chatting;
