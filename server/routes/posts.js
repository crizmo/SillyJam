import express from "express";
import { getFeedPosts, getUserPosts, getPost, likePost, commentPost, deletePost } from "../controllers/posts.js";
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
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId", verifyToken, getPost); 

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

/* DELETE */
router.delete("/:id/delete", verifyToken, deletePost);

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

  
router.post("/send/:path", verifyToken, (req, res) => {

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
