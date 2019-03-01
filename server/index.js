import { GraphQLServer, PubSub, withFilter } from "graphql-yoga";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { graphqlExpress } from "apollo-server-express";

const pubsub = new PubSub();
const NEW_MOVIE = "NEW_MOVIE";
let movies = [
  {
    id: 0,
    title: "Iron Man1"
  }
];

const typeDefs = `
type Movie {
  id: Int!
  title: String!
}
type Query {
  movies: [Movie]!
}
type Mutation {
  addMovie(title: String!): String!
}
type Subscription {
  newMovie: Movie
}
`;
const resolvers = {
  Query: {
    movies: () => {
      return movies;
    }
  },
  Mutation: {
    addMovie: (_, { title }, { pubsub }) => {
      const id = movies.length;
      const newMovie = {
        id: id,
        title: title
      };
      movies.push(newMovie);
      pubsub.publish(NEW_MOVIE, {
        newMovie: newMovie
      });
      return "YES";
    }
  },
  Subscription: {
    newMovie: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_MOVIE)
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: { pubsub }
});

// const ws = createServer(server);

server.start(() => console.log("Graphql Server Running"));

// server.use('/graphiql', graphqlExpress({
//   endpointURL: '/graphql',
//   SubscriptionEndpoint: `ws://localhost:4000/subscriptions`
// }));

// ws.listen(3001, () => console.log('listening 30001 port'));
// new SubscriptionServer({
//   execute,
//   subscribe,
//   typeDefs
// }, {
//   server: ws,
//   path: '/subscriptions'
// });