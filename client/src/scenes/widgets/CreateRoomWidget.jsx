import React, { useState } from "react";
import {
    Box,
    Button,
    IconButton,
    InputBase,
    Typography,
    FormControlLabel,
    Checkbox,
    TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "../../components/WidgetWrapper";
import Swal from 'sweetalert2';

const CreateRoomWidget = () => {
    const [roomName, setRoomName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [password, setPassword] = useState("");
    const [tags, setTags] = useState("");
    const [roomCreated, setRoomCreated] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const serverUrl = import.meta.env.VITE_SILLYJAMAPI;

    const userId = useSelector((state) => state.user._id);

    const handleCreateRoom = async () => {
        try {
            const response = await fetch(`${serverUrl}/rooms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: roomName,
                    description: roomDescription,
                    owner: userId, // Include the owner ID here
                    isPublic,
                    password,
                    tags: tags.split(",").map(tag => tag.trim()),
                }),
            });
            const data = await response.json();
            console.log(data);
            setRoomCreated(true);
            // Redirect user to the created room page or any other desired destination
            Swal.fire({
                icon: 'success',
                title: 'Room created successfully!',
                showConfirmButton: false,
                timer: 1500
            });

            setRoomName("");
            setRoomDescription("");
            setIsPublic(true);
            setPassword("");
            setTags("");

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to create room',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <WidgetWrapper>
            <Typography variant="h5" gutterBottom>Create Room</Typography>
            <Box>
                <TextField
                    label="Room Name"
                    fullWidth
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Room Description"
                    fullWidth
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                    variant="outlined"
                    margin="dense"
                    multiline
                    rows={2}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Public"
                />
                {!isPublic && (
                    <TextField
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        margin="dense"
                        type="password"
                    />
                )}
                <TextField
                    label="Tags (comma-separated)"
                    fullWidth
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    variant="outlined"
                    margin="dense"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateRoom}
                >
                    Create Room
                </Button>
            </Box>
        </WidgetWrapper>
    );
};

export default CreateRoomWidget;
