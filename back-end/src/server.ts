import app from "./app";
import * as mongoDB from "mongodb";
import { MONGODB_URI, PORT } from "./config/config";

const connectToDatabase =async()=> { 
  // await db.connect(MONGODB_URI as string)
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(MONGODB_URI as string);
  await client.connect();
  const db: mongoDB.Db = client.db("exove");
  // const feedBackCollection :mongoDB.Collection = db.collection("feedback")
  // const adminCollection :mongoDB.Collection = db.collection ("admin")
  // const userCollection :mongoDB.Collection = db.collection("user")
  const collection = db.collection("documents");
}

connectToDatabase()
  .then(()=> { 
    console.log("mongodb connected")
    app.listen(PORT, () => {
      console.log(`listengin at Port ${PORT}...`);
    });
  })
  .catch(()=> {
    console.log("fail connect to mongodb");

  })

