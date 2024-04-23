import express from "express";

import { 
    getFeedBounties,
    getUserBounties,
    getBounty,
    getApplications,

    applyBounty,
    acceptBounty,

    userCompleteBounty,
    creatorCompleteBounty,

    updateBounty,
    deleteBounty,
    deleteApplication,
} from "../controllers/bounty.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedBounties);
router.get("/:userId/bounties", verifyToken, getUserBounties);
router.get("/:bountyId", verifyToken, getBounty);
router.get("/:bountyId/applications", verifyToken, getApplications);

/* UPDATE */
router.patch("/:bountyId/apply/:userId", verifyToken, applyBounty);
router.patch("/:bountyId/accept/:applicationUserId", verifyToken, acceptBounty);
router.patch("/:bountyId/userComplete/:applicationUserId", verifyToken, userCompleteBounty);
router.patch("/:bountyId/creatorComplete/:applicationUserId", verifyToken, creatorCompleteBounty);

router.patch("/:bountyId/update", verifyToken, updateBounty);

/* DELETE */
router.delete("/:bountyId/delete", verifyToken, deleteBounty);
router.delete("/:bountyId/delete/:applicationId", verifyToken, deleteApplication);

export default router;