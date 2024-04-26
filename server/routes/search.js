import express from "express";
import {
    searchUsers,
} from "../controllers/search.js";
import { verifyToken } from "../middleware/auth.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/* READ */
router.get("/users/:searchTerm", verifyToken, searchUsers);

export default router;
