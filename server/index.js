import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from "./resolvers";

const express = require("express");
const app = express();
const socketServer = require("http").Server(app);

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "schema.graphql",
  resolvers: resolvers,
  context: { pubsub }
});
const opt = {
  port: 4000,
  playground: "/playground"
};

server.start(opt, ({ port }) =>
  console.log(`Graphql Server Running on ${port}`)
);

const io = require("socket.io")(server);

io.on("connection", () => console.log("user connected"));

// const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const schema = buildSchema(`
//   type Chat {
//     id: Int!
//     writer: String!
//     description: String!
//   }
//   type Query {
//     chatting: [Chat]!
//   }
//   type Mutation {
//     write(writer: String!, description: String!): String!
//   }
//   type Subscription {
//     newChat: Chat
//   }
// `);
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server)

// io.on('connection', socket => {
//   console.log('User connected')

//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: resolvers,
//   graphiql: true,
//   context: { pubsub },
//   formatError(err) {
//     return {
//       message: err.message
//     };
//   }
// }));

// server.listen(3019, () => console.log('listening 3019'));
