import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from "./resolvers";
import Blog from './mongoose/model';
import connect from './mongoose';

connect();
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "schema.graphql",
  resolvers: resolvers,
  context: { pubsub, Blog }
});
const opt = {
  port: 4000,
  playground: "/playground"
};

server.start(opt, ({ port }) =>
  console.log(`Graphql Server Running on ${port}`)
);
