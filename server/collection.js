import { connect } from "./mongoConnect";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://first_user:first_user@cluster0-6fejp.mongodb.net/test?retryWrites=true";

const mongoClient = new MongoClient(uri, { useNewUrlParser: true });
async () => {
  try {
    await connect();
    const logCollection = mongoClient.db("chatting").collection("log");
  } catch (err) {
    console.error(err);
  }
};
