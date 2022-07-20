import express from "express";
import validateMdw from "../middlewares/validate.mdw";
import { compulsoryAuth } from "../middlewares/authentication.mdw";
import * as schemas from "../schemas";
import { uploadURL } from "../controllers/file.controller";

const router = express.Router();

router.get("/upload", uploadURL);

export default router;
