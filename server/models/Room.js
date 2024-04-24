import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    description: {
      type: String,
      max: 500,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    instruments: [{
      type: String,
      enum: ['guitar', 'piano', 'drums', 'bass', 'vocals', 'other']
    }],
    audioStreams: [{
      type: String  // You might store the audio stream URLs here
    }],
    isPublic: {
      type: Boolean,
      default: true
    },
    password: {
      type: String,
      default: null  // If the room is private, you can store the password here
    },
    tags: {
      type: [String],
      default: []
    },
    // Add other properties as needed
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
export default Room;
