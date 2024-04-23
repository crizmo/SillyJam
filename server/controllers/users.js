import User from "../models/User.js";
import Message from "../models/Message.js";
import bcrypt from "bcrypt";
import { SMTPClient } from "emailjs";

// configure env
import dotenv from "dotenv";
dotenv.config();

const emailClient = new SMTPClient({
  user: process.env.EMAIL_USER, 
  password: process.env.EMAIL_PASS,
  host: 'smtp.gmail.com',
  ssl: true,
});


/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    console.log("getAllUsers");
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getLatestMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    // Aggregation pipeline to handle both cases: user as sender and user as receiver
    const latestMessages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }]
        }
      },
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: { 
            $cond: [{ $eq: ['$sender', userId] }, '$receiver', '$sender']
          },
          latestMessage: { $first: '$message' },
          timestamp: { $first: '$timestamp' },
          user: { $addToSet: { $cond: [{ $eq: ['$sender', userId] }, '$receiver', '$sender'] } }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          latestMessage: 1,
          timestamp: 1,
          userDetails: { $arrayElemAt: ['$userDetails', 0] }
        }
      }
    ]);

    res.status(200).json(latestMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getUserFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = followers.map(
      ({ _id,username, pictureUrl }) => {
        return { _id,username ,  pictureUrl };
      }
    );
    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const following = await Promise.all(
      user.following.map((id) => User.findById(id))
    );
    const formattedFollowing = following.map(
      ({ _id, username, pictureUrl }) => {
        return { _id, username, pictureUrl };
      }
    );
    res.status(200).json(formattedFollowing);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserDms = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const dms = await Promise.all(
      user.dms.map((id) => User.findById(id))
    );
    res.status(200).json(dms);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserDmMessages = async (req, res) => {
  try {
    const { id, dmId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: id, receiver: dmId },
        { sender: dmId, receiver: id },
      ],
    });

    const formattedMessages = await Promise.all(
      messages.map(async (message) => {
        const sender = await User.findById(message.sender);
        const receiver = await User.findById(message.receiver);
        return {
          _id: message._id,
          sender: {
            _id: sender._id,
            name: sender.username,
            pictureUrl: sender.pictureUrl,
          },
          receiver: {
            _id: receiver._id,
            name: receiver.username,
            pictureUrl: receiver.pictureUrl,
          },
          message: message.message,
          createdAt: message.createdAt,
        };
      })
    );
    res.status(200).json(formattedMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



/* UPDATE */

export const addRemoveFollower = async (req, res) => {
  try {
    const { id, followerId } = req.params;
    const user = await User.findById(id);
    const follower = await User.findById(followerId);

    if (user.following.includes(followerId)) {
      user.following = user.following.filter((id) => id !== followerId);
      follower.followers = follower.followers.filter((id) => id !== id);
    } else {
      user.following.push(followerId);
      follower.followers.push(id);
    }
    await user.save();
    await follower.save();

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = followers.map(
      ({ _id, username, pictureUrl }) => {
        return { _id, username, pictureUrl };
      }
    );

    const following = await Promise.all(
      user.following.map((id) => User.findById(id))
    );
    const formattedFollowing = following.map(
      ({ _id, username, pictureUrl }) => {
        return { _id, username, pictureUrl };
      }
    );

    res.status(200).json({ formattedFollowers, formattedFollowing });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, pictureUrl, about, socials } =
      req.body;
    const user = await User.findById(id);

    if (username) user.username = username;
    if (pictureUrl) user.pictureUrl = pictureUrl;
    if (about) user.about = about;
    if (socials) user.socials = socials;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Function to handle forgot password request
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP (One-Time Password)
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP

    emailClient.send(
      {
        text: `Your OTP is ${otp}`,
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Forgot Password OTP",
      },
      (err, message) => {
        console.log(err || message);
      }
    );

    // Store OTP in user document for verification
    user.otp = otp;
    await user.save();
    
    res.status(200).json({ message: "OTP sent to your email. Check your inbox.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle OTP verification
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (typeof user.otp !== 'number') {
      user.otp = parseInt(user.otp);
    } 
    let numOtp
    if (typeof otp !== 'number') {
      numOtp = parseInt(otp);
    }

    // Check if OTP matches
    if (user.otp === numOtp) {
      // Clear OTP from user document
      user.otp = null;
      await user.save();
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle password reset
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    
    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // we decrypt the password first then save it
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Set new password and save user
    user.password = newPasswordHash;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addDm = async (req, res) => {
  try {
    const { id, dmId } = req.params;
    const user = await User.findById(id);
    const dmUser = await User.findById(dmId);

    if (!user.dms.includes(dmId)) {
      user.dms.push(dmId);
      dmUser.dms.push(id);
    }
    await user.save();
    await dmUser.save();
    res.status(200).json(user);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const removeDm = async (req, res) => {
  try {
    const { id, dmId } = req.params;
    const user = await User.findById(id);
    const dmUser = await User.findById(dmId);

    if (user.dms.includes(dmId)) {
      user.dms = user.dms.filter((id) => id !== dmId);
      dmUser.dms = dmUser.dms.filter((id) => id !== id);
    }
    await user.save();
    await dmUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};