// Import necessary modules
import Room from "../models/Room.js";

// Function to handle room-related socket operations
function rooms(io) {
    console.log("rooms socket running");
    io.on("connection", (socket) => {
        console.log("a user connected to rooms");

        // Join room event
        socket.on("joinRoom", async (roomId, userId) => {
            try {
                console.log("join room");
                socket.emit("roomJoined", { roomId, message: "Joined room successfully" });
                // Broadcast to other users in the room that a new user joined
                socket.broadcast.to(roomId).emit("userJoined", { roomId, userId });
            } catch (error) {
                // Emit error message if joining fails
                socket.emit("joinRoomError", { error: error.message });
            }
        });

        // Leave room event
        socket.on("leaveRoom", async (roomId, userId) => {
            try {
                // Logic for leaving a room (e.g., removing user from the room's members)
                // Emit success message to the user who left
                socket.emit("roomLeft", { roomId, message: "Left room successfully" });
                // Broadcast to other users in the room that a user left
                socket.broadcast.to(roomId).emit("userLeft", { roomId, userId });
            } catch (error) {
                // Emit error message if leaving fails
                socket.emit("leaveRoomError", { error: error.message });
            }
        });


        socket.on("disconnect", () => {
            console.log("user disconnected from rooms");
        });
    });
}

export default rooms;
