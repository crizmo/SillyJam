import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "../../components/WidgetWrapper";
import Swal from 'sweetalert2';

const serverUrl = import.meta.env.VITE_SILLYJAMAPI;
const socket = io.connect(serverUrl);

const JoinRoomWidget = () => {
    const [roomId, setRoomId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    console.log(socket);

    const userId = useSelector((state) => state.user._id);

    useEffect(() => {
        // Listen for room joined event
        socket.on("roomJoined", ({ roomId, message }) => {
            console.log(message);
            // Redirect user to the joined room page or any other desired destination
            navigate(`/rooms/${roomId}`);
        });

        // Listen for room join error event
        socket.on("joinRoomError", ({ error }) => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to join room',
                text: 'Invalid room ID or password',
                showConfirmButton: false,
                timer: 1500
            });
        });

        // Clean up socket event listeners on component unmount
        return () => {
            socket.off("roomJoined");
            socket.off("joinRoomError");
        };
    }, [navigate, socket]);

    const handleJoinRoom = () => {
        // Emit join room event
        socket.emit("joinRoom", roomId, userId);
    };

    return (
        <WidgetWrapper>
            <Typography variant="h5" gutterBottom>Join Room</Typography>
            <Box>
                <TextField
                    label="Room ID"
                    fullWidth
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    margin="dense"
                    type="password"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleJoinRoom}
                >
                    Join Room
                </Button>
            </Box>
        </WidgetWrapper>
    );
};

export default JoinRoomWidget;
