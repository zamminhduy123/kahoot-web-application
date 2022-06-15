import express from "express";
import validateMdw from "../middlewares/validate.mdw";
import * as schemas from "../schemas";
import { register, login } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", validateMdw(schemas.registerSchema), register);
router.post("/login", validateMdw(schemas.loginSchema), login);

export default router;
