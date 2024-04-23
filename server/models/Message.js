import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
