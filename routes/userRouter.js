import express from 'express';
import {
  getAllAuthors,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

const allowedOrigins = ['http://localhost:5173'];

// Middleware to set CORS headers for login route
const setCorsHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

router.post("/register", register);
router.post("/login", setCorsHeaders, login);
router.get("/logout", isAuthenticated, logout);
router.get("/myprofile", isAuthenticated, getMyProfile);
router.get("/authors", getAllAuthors);

export default router;
