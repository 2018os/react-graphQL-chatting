import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from './resolvers';

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "schema.graphql",
  resolvers: resolvers,
  context: { pubsub }
});

server.start(() => console.log("Graphql Server Running"));
