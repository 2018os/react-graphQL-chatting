import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useQuery } from "react-apollo-hooks";

const getChatting = gql`
  query {
    chatting {
      id
      writer
      description
    }
  }
`;

const newChat = gql`
  subscription {
    newChat {
      id
      writer
      description
    }
  }
`;

let unsubscribe = null;

export default () => (
  <Query query={getChatting}>
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
            <h3 key={x.id}>
              {x.writer}: {x.description}
            </h3>
          ))}
        </div>
      );
    }}
  </Query>
);

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
