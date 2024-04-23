import Bounty from "../models/Bounty.js";
import User from "../models/User.js";

/* CREATE */
export const createBounty = async (req, res) => {
    try {
        const { userId, title, description, tags, due, currency } = req.body;
        const user = await User.findById(userId);

        let dueDate = new Date(due.replace(/-/g, "/"));

        const newBounty = new Bounty({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            userPictureUrl: user.pictureUrl,
            title,
            description,
            tags: JSON.parse(tags),
            due : dueDate,
            currency,
            applications: [],
            status: "open",
            accepted: "",
            completed: false,
        });
        await newBounty.save();

        const bounty = await Bounty.find();
        res.status(201).json(bounty);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getFeedBounties = async (req, res) => {
    try {
        const bounty = await Bounty.find();
        res.status(200).json(bounty);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserBounties = async (req, res) => {
    try {
        const { userId } = req.params;
        const bounty = await Bounty.find({ userId });
        res.status(200).json(bounty);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getBounty = async (req, res) => {
    try {
        const { bountyId } = req.params;
        const bounty = await Bounty.findById(bountyId);
        res.status(200).json(bounty);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getApplications = async (req, res) => {
    try {
        const { bountyId } = req.params;
        const bounty = await Bounty.findById(bountyId);
        res.status(200).json(bounty.applications);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const applyBounty = async (req, res) => {
    const { bountyId, userId, message } = req.body;
    console.log(req.body);
    try {
        const bounty = await Bounty.findById(bountyId);
        const user = await User.findById(userId);

        if (bounty.applications.filter((application) => application.userId === userId).length > 0) {
            return res.status(400).json({ message: "You have already applied to this bounty." });
        } else if (bounty.userId === userId) {
            return res.status(400).json({ message: "You cannot apply to your own bounty." });
        } else {
            bounty.applications.push({
                _id: userId + bountyId,
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                userPictureUrl: user.pictureUrl,
                bountiesCompleted: user.bountiesCompleted || 0,
                message: message,
                status: "pending",
            });
            await bounty.save();

            const newBounty = await Bounty.find();
            res.status(200).json(newBounty);
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const acceptBounty = async (req, res) => {
    const { bountyId, applicationUserId } = req.params;
    try {
        const bounty = await Bounty.findById(bountyId);
        bounty.status = "in progress";
        bounty.accepted = applicationUserId;

        bounty.applications.forEach((application) => {
            if (application.userId === applicationUserId) {
                application.status = "accepted";
            } else {
                application.status = "rejected";
            }
        });

        const newApplications = bounty.applications;
        bounty.applications = [];
        bounty.applications = newApplications;
        
        await bounty.save();
        const updatedBounty = await Bounty.find();
        res.status(200).json(updatedBounty);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const userCompleteBounty = async (req, res) => {
    const { bountyId, applicationUserId } = req.params;
    try {
        const bounty = await Bounty.findById(bountyId);
        bounty.status = "half-completed";
        bounty.completed = true;

        bounty.applications.forEach((application) => {
            if (application.userId === applicationUserId) {
                application.status = "half-completed";
                application.bountiesCompleted += 0.5;
            }
        });
 
        let user = await User.findById(applicationUserId);
        user.bountiesCompleted += 0.5;

        const newApplications = bounty.applications;
        bounty.applications = [];
        bounty.applications = newApplications;
        
        await user.save();
        await bounty.save();
        const updatedBounty = await Bounty.find();
        res.status(200).json(updatedBounty);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const creatorCompleteBounty = async (req, res) => {
    const { bountyId, applicationUserId } = req.params;
    try {
        const bounty = await Bounty.findById(bountyId);
        bounty.status = "completed";
        bounty.completed = true;

        bounty.applications.forEach((application) => {
            if (application.userId === applicationUserId) {
                application.status = "completed";
                application.bountiesCompleted += 0.5;
            }
        });
 
        let user = await User.findById(applicationUserId);
        user.bountiesCompleted += 0.5;

        user.balance += bounty.currency;
        let creator = await User.findById(bounty.userId);
        creator.balance -= bounty.currency;

        const newApplications = bounty.applications;
        bounty.applications = [];
        bounty.applications = newApplications;
        
        await user.save();
        await bounty.save();
        await creator.save();
        const updatedBounty = await Bounty.find();
        res.status(200).json(updatedBounty);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateBounty = async (req, res) => {
    const { bountyId, title, description, due } = req.body;
    try {
        const bounty = await Bounty.findById(bountyId);
        bounty.title = title;
        bounty.description = description;
        bounty.due = due;
        await bounty.save();
        res.status(200).json(bounty);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* DELETE */
export const deleteBounty = async (req, res) => {
    try {
        const { bountyId } = req.params;
        await Bounty.findByIdAndDelete(bountyId);
        const updatedBounty = await Bounty.find();
        res.status(200).json(updatedBounty);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteApplication = async (req, res) => {
    const { bountyId, applicationId } = req.params;
    try {
        const bounty = await Bounty.findById(bountyId);

        bounty.applications.forEach((application) => {
            if (application.userId === bounty.accepted) {
                console.log("reset");
                bounty.status = "open";
                bounty.accepted = "";
            }
        });

        bounty.applications = bounty.applications.filter((application) => application._id != applicationId);

        await bounty.save();
        const updatedBounty = await Bounty.find();
        res.status(200).json(updatedBounty);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}
