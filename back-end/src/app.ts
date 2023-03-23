import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { welcomeRouter } from "./router/welcome";

const app = express();

// 1.
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan(":method :url :status :response-time ms "));

app.use("/", welcomeRouter);

export default app;
