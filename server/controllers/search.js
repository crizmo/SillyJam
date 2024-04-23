import Post from "../models/Post.js";
import User from "../models/User.js";
import Bounty from "../models/Bounty.js";

export const searchPosts = async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm ? decodeURIComponent(req.params.searchTerm) : '';
        const post = await Post.find({ description: { $regex: searchTerm, $options: "i" } });
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

export const searchUsers = async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm ? decodeURIComponent(req.params.searchTerm) : '';
        const users = await User.find({ firstName: { $regex: searchTerm, $options: "i" } });
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const searchBounty = async (req, res) => {
    let query = req.body;

    try {
        let bounties = await Bounty.find(query);
        res.status(200).json(bounties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
