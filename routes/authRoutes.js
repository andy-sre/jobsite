import express from "express";
import {register, login, updateUser} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
import rateLimiter from "../utils/rateLimiter.js";

const router = express.Router()

router.route('/register').post(rateLimiter,register)
router.route('/login').post(rateLimiter, login)
router.route('/updateuser').patch(authenticateUser, updateUser)

export default router