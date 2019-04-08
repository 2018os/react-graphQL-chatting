const resolvers = {
  Query: {
    chatting: async (_, { roomName }, { Blog }) => {
      const chattingLog = [];
      await Blog.find({ roomName }).then(result => {
        result.forEach(i => {
          chattingLog.push(i);
        });
      });
      return chattingLog;
    }
  },
  Mutation: {
    write: async (_, { writer, description, roomName }, { pubsub, Blog }) => {
      const newChat = {
        writer,
        description,
        roomName
      };
      await Blog.create(newChat, (err, blog) => {
        newChat._id = blog._id; //newChat 객체에 DB _id 추가
        pubsub.publish(roomName, {
          newChat
        });
      });
      return "YES";
    }
  },
  Subscription: {
    newChat: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator(["RoomA", "RoomB"]);
      }
    }
  }
};

export default resolvers;
