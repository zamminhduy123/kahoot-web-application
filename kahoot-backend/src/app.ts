import "dotenv/config";
import connect from "./db/connect";
import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const start = async () => {
  await connect(process.env.MONGO_URI!);
  app.listen(PORT, (): void => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();