const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://first_user:first_user@cluster0-6fejp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  console.log("DB connected!");
  const collection = client.db("test").collection("devices");

  collection.insert({ id: 0, name: "HELLO" }, (err, result) => {
    console.log(result);
  });
  // perform actions on the collection object
  client.close();
});
