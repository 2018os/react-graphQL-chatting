const chattingLog = [
  {
    id: 0,
    writer: "admin",
    description: "HELLO",
  },
  {
    id: 1,
    writer: "notice",
    description: "this is RoomA",
    roomName: "RoomA"
  },
  {
    id: 2,
    writer: "notice",
    description: "this is RoomB",
    roomName: "RoomB"
  }
];

const resolvers = {
  Query: {
    chatting: (_, { roomName }) => {
      const roomChattingLog = [];
      chattingLog.map(chat => {
        if (chat.roomName === roomName || chat.writer === "admin") {
          roomChattingLog.push(chat);
        }
      });
      return roomChattingLog;
    }
  },
  Mutation: {
    write: (_, { writer, description, roomName }, { pubsub }) => {
      const id = chattingLog.length;
      const newChat = {
        id,
        writer,
        description,
        roomName
      };
      chattingLog.push(newChat);
      pubsub.publish(roomName, {
        newChat
      });
      return "YES";
    }
  },
  Subscription: {
    newChat: {
      subscribe: (_, { roomName }, { pubsub }) => pubsub.asyncIterator(roomName)
    }
  }
};

export default resolvers;
