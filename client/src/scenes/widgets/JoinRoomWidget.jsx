import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Snackbar,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "../../components/WidgetWrapper";
import Swal from 'sweetalert2';

const JoinRoomWidget = () => {
    const [roomId, setRoomId] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const serverUrl = import.meta.env.VITE_QUAKEAPI;

    const userId = useSelector((state) => state.user._id);

    const handleJoinRoom = async () => {
        try {
            const response = await fetch(`${serverUrl}/rooms/${roomId}/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId,
                    password,
                }),
            });
            const data = await response.json();
            console.log(data);
            // Redirect user to the joined room page or any other desired destination
            navigate(`/rooms/${roomId}`);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to join room',
                text: 'Invalid room ID or password',
                showConfirmButton: false,
                timer: 1500
            });
        }
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
