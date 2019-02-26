import { GraphQLServer } from 'graphql-yoga';

const movies = [
  {
    id: 0,
    title: "Iron Man1"
  }, {
    id: 1,
    title: "Iron Man2"
  }
]

const server = new GraphQLServer({
  typeDefs: `
    type Movie {
      id: Int!
      title: String!
    }
    type Query {
      movies: [Movie]!
    }
  `,
  resolvers: {
    Query: {
      movies: () => movies
    }
  }
});

server.start(() => console.log("Graphql Server Running"))