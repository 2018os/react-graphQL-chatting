import { GraphQLServer, PubSub } from "graphql-yoga";
const pubsub = new PubSub();
const NEW_CHAT = "NEW_CHAT";
let chattingLog = [];

const typeDefs = `
type Chat {
  id: Int!
  writer: String!
  description: String!
}
type Query {
  chatting: [Chat]!
}
type Mutation {
  write(writer: String!, description: String!): String!
}
type Subscription {
  newChat: Chat
}
`;
const resolvers = {
  Query: {
    chatting: () => {
      return chattingLog;
    }
  },
  Mutation: {
    write: (_, { writer, description }, { pubsub }) => {
      const id = chattingLog.length;
      const newChat = {
        id,
        writer,
        description
      };
      chattingLog.push(newChat);
      pubsub.publish(NEW_CHAT, {
        newChat
      });
      return "YES";
    }
  },
  Subscription: {
    newChat: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_CHAT)
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: { pubsub }
});

server.start(() => console.log("Graphql Server Running"));
