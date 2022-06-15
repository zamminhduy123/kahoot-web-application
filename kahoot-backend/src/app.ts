import "dotenv/config";
import "express-async-errors";
import connect from "./db/connect";
import cors from "cors";
import express from "express";
import routes from "./routes";

import notFoundMdw from "./middlewares/not-found.mdw";
import errorHandlerMiddleware from "./middlewares/handle-errors.mdw";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/", routes);

app.use(notFoundMdw);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connect(process.env.MONGO_URI!);
  app.listen(PORT, (): void => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();