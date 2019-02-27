import React from "react";
import gql from "graphql-tag";

import { useQuery } from "react-apollo-hooks";

const Home = () => {
  const { data, error, loading } = useQuery(gql`
    query {
      movies {
        id
        title
      }
    }
  `);
  return (
    <div>
      {loading && "loading"}
      {error && "something happend"}
      {!loading && data && data.movies.map((movie) => <h1>{movie.title}</h1>)}
    </div>
  );
};

export default Home;