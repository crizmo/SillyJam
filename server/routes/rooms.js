import express from "express";
import {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  joinRoom,
  leaveRoom
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

/* JOIN & LEAVE ROOM */
router.post("/:roomId/join", verifyToken, joinRoom);
router.post("/:roomId/leave", verifyToken, leaveRoom);

export default router;
