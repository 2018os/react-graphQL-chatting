import { GraphQLServer, PubSub } from "graphql-yoga";
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

server.start(() => console.log("Graphql Server Running"));
