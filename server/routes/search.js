import express from "express";
import {
    searchPosts,
    searchUsers,
    searchBounty,
} from "../controllers/search.js";
import { verifyToken } from "../middleware/auth.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/* READ */
router.get("/users/:searchTerm", verifyToken, searchUsers);
router.get("/posts/:searchTerm", verifyToken, searchPosts);

/* POST */
router.post("/bounty", verifyToken, searchBounty);

export default router;
