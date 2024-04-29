import express from "express";
import {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/rooms.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getAllRooms);
router.get("/:roomId", verifyToken, getRoom);

/* CREATE */
router.post("/", verifyToken, createRoom);

/* UPDATE */
router.patch("/:roomId", verifyToken, updateRoom);

/* DELETE */
router.delete("/:roomId", verifyToken, deleteRoom);

export default router;
