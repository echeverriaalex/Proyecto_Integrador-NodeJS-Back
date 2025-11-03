import { Router } from "express";
import { login, register, confirmEmail, refreshToken } from "../controllers/auth.js";
import express from "express";
import registerValidation from "../validations/register.js";
import hasErrors from "../middlewares/hasErrors.js";
import hashPassword from "../middlewares/hash.js";
import loginValidation from "../validations/login.js";

const router = express.Router();

router.post("/register", [ registerValidation, hasErrors, hashPassword ], register);
router.post("/login", [ loginValidation, hasErrors ], login);
router.post("/refresh", [ loginValidation, hasErrors ], refreshToken);

router.get("/confirm", confirmEmail);

export default router;