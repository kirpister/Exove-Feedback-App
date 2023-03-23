import app from "./app";
import { MONGODB_URI, PORT } from "./config/config";
import db from "mongoose";

db.connect(MONGODB_URI as string)
  .then(() => {
    console.log("Mongo DB connected");
    app.listen(PORT, () => {
      console.log(`listengin at Port ${PORT}...`);
    });
  })
  .catch(() => {
    console.log("fail connect to mongodb");
  });
