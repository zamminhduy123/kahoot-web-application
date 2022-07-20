import express from "express";
import authRouter from "./auth.router";
import gameRouter from "./game.router";
import fileRouter from "./file.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/game", gameRouter);
router.use("/s3", fileRouter);

export default router;