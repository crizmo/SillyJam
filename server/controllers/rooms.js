// Import necessary modules
import Room from "../models/Room.js";

// Controller functions for room operations
// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific room by ID
export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new room
export const createRoom = async (req, res) => {
  const room = new Room(req.body);
  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a room by ID
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      req.body,
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a room by ID
export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Join a room
export const joinRoom = async (req, res) => {
  try {
    // Logic for joining a room (e.g., adding user to the room's members)
    res.status(200).json({ message: "Joined room successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Leave a room
export const leaveRoom = async (req, res) => {
  try {
    // Logic for leaving a room (e.g., removing user from the room's members)
    res.status(200).json({ message: "Left room successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
