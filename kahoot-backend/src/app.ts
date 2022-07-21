import "dotenv/config";
import "express-async-errors";
import connect from "./db/connect";
import cors from "cors";
import express, { Request, Response } from "express";
import routes from "./routes";
import http from "http";
import { Server } from "socket.io";

import notFoundMdw from "./middlewares/not-found.mdw";
import errorHandlerMiddleware from "./middlewares/handle-errors.mdw";
import socketHandler from "./controllers/socket.controller";
import Kahoot from "./classes/Kahoot.class";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["*", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  },
});
const PORT = process.env.PORT || 5000;
const kahoot = new Kahoot();

app.use(
  cors({
    origin: ["*", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: false,
  })
);
app.use(express.json());

app.use("/api/v1/", routes);

app.use(notFoundMdw);
app.use(errorHandlerMiddleware);

io.on("connection", (socket) => {
  console.log("User connected!", socket.id);
  socketHandler(io, socket, kahoot);
});

const start = async () => {
  await connect(process.env.MONGO_URI!);
  server.listen(PORT, (): void => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();
