import express from "express";
import validateMdw from "../middlewares/validate.mdw";
import * as schemas from "../schemas";
import { compulsoryAuth } from "../middlewares/authentication.mdw";
import { register, login, autoLogin } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", validateMdw(schemas.registerSchema), register);
router.post("/login", validateMdw(schemas.loginSchema), login);
router.get("/auto-login", compulsoryAuth, autoLogin);

export default router;
