import "dotenv/config";
import connect from "./db/connect";
import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/", routes);

const start = async () => {
  await connect(process.env.MONGO_URI!);
  app.listen(PORT, (): void => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();