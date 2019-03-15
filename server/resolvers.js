const NEW_CHAT = "NEW_CHAT";
const chattingLog = [
  {
    id: 0,
    writer: "admin",
    description: "HELLO",
    roomName: "RoomA"
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
