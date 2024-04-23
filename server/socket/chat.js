import User from "../models/User.js";
import Message from "../models/Message.js";

function start(io) {
    console.log("socket.io started");
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        socket.on("join", (room) => {
            console.log("room" + room);
            socket.join(room);
        });

        socket.on("leave", (room) => {
            console.log("user left room", room);
            socket.leave(room);
        });

        socket.on("message", async (data, room) => {
            console.log("message received", data["sender"], data["receiver"], data["message"]);

            const sender = data["sender"];
            const receiver = data["receiver"];
            const message = data["message"];

            const newMessage = new Message({
                sender: sender,
                receiver: receiver,
                message: message,
            });
            try {
                const savedMessage = await newMessage.save();
                console.log("message saved", savedMessage);
                console.log(savedMessage.sender);

                const sender = await User.findById(savedMessage.sender);
                const receiver = await User.findById(savedMessage.receiver);

                const formattedMessages = {
                    _id: savedMessage._id,
                    sender: {
                        _id: sender._id,
                        name: sender.firstName + " " + sender.lastName,
                        pictureUrl: sender.pictureUrl,
                    },
                    receiver: {
                        _id: receiver._id,
                        name: receiver.firstName + " " + receiver.lastName,
                        pictureUrl: receiver.pictureUrl,
                    },
                    message: savedMessage.message,
                    createdAt: savedMessage.createdAt,
                }
                io.to(room).emit("message", formattedMessages);
            } catch (err) {
                console.log(err);
            }
        });
    });
}

export default start;