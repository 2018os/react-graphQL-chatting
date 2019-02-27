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
      {!loading && data && console.log("DATA!" + data.movies[0].title)}
    </div>
  );
};

export default Home;