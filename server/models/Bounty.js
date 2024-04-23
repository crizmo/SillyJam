import mongoose from "mongoose";

const bountySchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userPictureUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: String,
        tags: {
            type: Array,
            default: [],
        },
        due: {
            type: String,
            required: true,
        },
        currency: {
            type: Number,
            required: true,
        },
        applications: {
            type: Array,
            default: [],
        },
        status: {
            type: String,
            default: "open",
        },
        accepted: {
            type: String,
            default: "",
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Bounty = mongoose.model("Bounty", bountySchema);

export default Bounty;