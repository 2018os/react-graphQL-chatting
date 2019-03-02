import React from "react";
import { Subscription } from "react-apollo";
import { gql } from "apollo-boost";

const newMovie = gql`
  subscription{
    newMovie{
      id
      title
    }
  }
`;

export default () => (
  <Subscription subscription={newMovie}>
    {({ data }) => {
      return <h3>Movie: {!data ? "waiting..." : data.newMovie.title}</h3>;
    }}
  </Subscription>
);