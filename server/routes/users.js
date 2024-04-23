import express from "express";
import {
  getUser,
  getAllUsers,
  getLatestMessages,
  getUserFollowers,
  getUserFollowing,
  getUserDms,
  getUserDmMessages,
  addRemoveFollower,
  updateUser,

  sendOtp,
  verifyOTP,
  resetPassword,

  addDm,
  removeDm
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

import image2url from "image2url";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getAllUsers);
router.get("/:userId/latest-messages", verifyToken, getLatestMessages);
router.get("/:id", verifyToken, getUser);
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/following", verifyToken, getUserFollowing);
router.get("/:id/dms", verifyToken, getUserDms);
router.get("/:id/messages/:dmId", verifyToken, getUserDmMessages);

/* UPDATE */
router.patch("/:id", verifyToken, updateUser);
router.patch("/:id/follow/:followerId", verifyToken, addRemoveFollower);
router.patch("/:id/add-dm/:dmId", verifyToken, addDm);
router.patch("/:id/remove-dm/:dmId", verifyToken, removeDm);
/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);


router.post("/send/:path", (req, res) => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  upload.single("picture")(req, res, (err) => {
    if (err) {
      res.json({
        error: err
      });
    } else {
      if (fs.existsSync(path.join(__dirname, `../../up-server/public/assets/${req.params.path}`))) {
        const file = path.join(__dirname, `../../up-server/public/assets/${req.params.path}`);
        image2url.imgbb_upload(`${file}`, process.env.IMG_BB_KEY).then(url => {
          res.json({
            url: url
          })
        }).then(() => {
          fs.unlinkSync(file);
        });
      } else {
        res.json({
          error: "File not found"
        });
      }
    }
  });
});



export default router;
