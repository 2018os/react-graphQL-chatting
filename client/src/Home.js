import React from "react";
import gql from "graphql-tag";
import { Query } from 'react-apollo';
import { useQuery } from "react-apollo-hooks";

const getMovies = gql`
  query {
    movies {
      id
      title
    }
  }
`;

const newMovie = gql`
  subscription{
    newMovie{
      id
      title
    }
  }
`;

let unsubscribe = null;

export default () => (
  <Query query={getMovies}>
    {({ loading, data, subscribeToMore }) => {
      if (loading) {
        return null;
      }
      console.log(unsubscribe);
      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: newMovie,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { newMovie } = subscriptionData.data;
            return {
              ...prev,
              movies: [...prev.movies, newMovie]
            };
          }
        });
      }
      return <div>{data.movies.map(x => <h3 key={x.id}>{x.title}</h3>)}</div>;
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