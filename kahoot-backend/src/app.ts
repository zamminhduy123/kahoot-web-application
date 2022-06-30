import "dotenv/config";
import "express-async-errors";
import connect from "./db/connect";
import cors from "cors";
import express, {Request, Response} from "express";
import routes from "./routes";
import http from "http";
import { Server } from "socket.io";

import notFoundMdw from "./middlewares/not-found.mdw";
import errorHandlerMiddleware from "./middlewares/handle-errors.mdw";
import socketHandler from "./controllers/socket.controller";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/", routes);

app.use(notFoundMdw);
app.use(errorHandlerMiddleware);

io.on("connection", (socket) => {
  socketHandler(io, socket);
});


const start = async () => {
  await connect(process.env.MONGO_URI!);
  server.listen(PORT, (): void => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};


start();
