import mongoose from "mongoose";
import Blog from "./model";
const uri =
  "mongodb+srv://first_user:first_user@cluster0-6fejp.mongodb.net/chatting?retryWrites=true";
module.exports = () => {
  mongoose.connect(uri, { useNewUrlParser: true }, err => {
    if (err) console.error(err);
    console.log("DB connected");
  });
  Blog;
};
