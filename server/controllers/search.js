
import User from "../models/User.js";

export const searchUsers = async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm ? decodeURIComponent(req.params.searchTerm) : '';
        const users = await User.find({ firstName: { $regex: searchTerm, $options: "i" } });
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
