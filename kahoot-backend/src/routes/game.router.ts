import express from "express";
import validateMdw from "../middlewares/validate.mdw";
import { compulsoryAuth } from "../middlewares/authentication.mdw";
import * as schemas from "../schemas";
import { createGame, getYourGames } from "../controllers/game.controller";

const router = express.Router();

router.post("/", compulsoryAuth, validateMdw(schemas.gameSchema), createGame);
router.get("/", compulsoryAuth, getYourGames);

export default router;
