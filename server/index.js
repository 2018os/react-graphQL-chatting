// import { GraphQLServer, PubSub } from "graphql-yoga";

// let movies = [
//   {
//     id: 0,
//     title: "Iron Man1"
//   },
//   {
//     id: 1,
//     title: "Iron Man2"
//   }
// ];
// const pubsub = new PubSub();
// const server = new GraphQLServer({
//   typeDefs: `
//     type Hello {
//       text: String!
//       channel: String!
//     }
//     type Movie {
//       id: Int!
//       title: String!
//     }
//     type Query {
//       movies: [Movie]!
//     }
//     type Mutation {
//       addMovie(title: String!): String!
//     }
//     type Subscription {
//       hello: Hello!
//     }
//   `,
//   resolvers: {
//     Query: {
//       movies: () => movies
//     },
//     Mutation: {
//       addMovie: (_, args) => {
//         const id = movies.length;
//         const newMovie = {
//           id: id,
//           title: args.title
//         };
//         movies.push(newMovie);
//         return "YES";
//       }
//     },
//     Subscription: {
//       hello: {
//         subscribe: (_, args, { pubsub }) => {
//           const channel = "A";
//           pubsub.publish(channel, { hello: { text: "HELLO", channel: channel } });
//           console.log("AA");
//           return pubsub.asyncIterator(channel);
//         }
//       }
//     }
//   },
//   context: { pubsub }
// });

// server.start(() => console.log("Graphql Server Running"));

const { GraphQLServer, PubSub } = require("graphql-yoga");

const typeDefs = `
  type Query {
    hello: String!
  }

  type Counter {
    count: Int!
    countStr: String
  }

  type Subscription {
    counter: Counter!
  }
`;

const resolvers = {
  Query: {
    hello: () => `Hello`
  },
  Counter: {
    countStr: counter => `Current count: ${counter.count}`
  },
  Subscription: {
    counter: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random()
          .toString(36)
          .substring(2, 15); // random channel name
        console.log(channel);
        let count = 0;
        setInterval(
          () => pubsub.publish(channel, { counter: { count: count++ } }),
          2000
        );
        // pubsub.publish(channel, { counter: { count: count++ } });
        return pubsub.asyncIterator(channel);
      }
    }
  }
};

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log("Server is running on localhost:4000"));
