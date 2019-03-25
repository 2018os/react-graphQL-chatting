import React, { useState, Fragment } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";
// import { useQuery } from "react-apollo-hooks";

const getChatting = gql`
  query chatting($roomName: String!) {
    chatting(roomName: $roomName) {
      id
      writer
      description
    }
  }
`;

const newChat = gql`
  subscription newChat($roomName: String!) {
    newChat(roomName: $roomName) {
      id
      writer
      description
    }
  }
`;

let unsubscribe = null; //publish 했을때

const Chatting =  () => {
  const [roomName, setRoom] = useState("RoomA");
  return (
    <Fragment>
      <button onClick={() => setRoom("RoomA")}>RoomA</button>
      <button onClick={() => setRoom("RoomB")}>RoomB</button>
      <Query query={getChatting} variables={{roomName}}>
        {({ loading, data, subscribeToMore }) => {
          if (loading) {
            return null;
          }
          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: newChat,
              variables: { roomName },
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
                <h3 key={x.id}>
                  {x.writer}: {x.description}
                </h3>
              ))}
            </div>
          );
        }}
      </Query>
    </Fragment>
  )
};

export default Chatting;

// const Home = () => {
//   const { data, error, loading, subscribeToMore } = useQuery(gql`
//     query {
//       movies {
//         id
//         title
//       }
//     }
//   `);
//   return (
//     <div>
//       {loading && "loading"}
//       {error && "something happend"}
//       {!loading && data && data.movies.map((movie) => <h1 key={movie.id}>{movie.title}</h1>)}
//     </div>
//   );
// };

// export default Home;
