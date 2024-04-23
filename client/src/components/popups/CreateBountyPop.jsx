import { Box, useTheme, IconButton, Typography, TextField, Chip, Grid, useMediaQuery } from "@mui/material";
import {
    AddOutlined,
    CancelOutlined,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBounties } from "../../state";
import Swal from 'sweetalert2';

import BountyPreview from "./BountyPreview";

const serverUrl = import.meta.env.VITE_QUAKEAPI;

const CreateBountyPop = ({ close, fetchBounties }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const main = theme.palette.neutral.main;

    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const [bounty, setBounty] = useState({
        user: user._id,
        title: "",
        description: "",
        tags: [],
        due: "",
        currency: 0,
    });

    const [tagInput, setTagInput] = useState('');

    const isMobile = useMediaQuery("(max-width: 900px)");

    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            setBounty({ ...bounty, tags: [...bounty.tags, tagInput] });
            setTagInput('');
        }
    };

    const handleDeleteTag = (tag) => () => {
        setBounty({ ...bounty, tags: bounty.tags.filter(t => t !== tag) });
    };

    const { _id } = useSelector((state) => state.user);

    const handleBounty = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("title", bounty.title);
        formData.append("description", bounty.description);
        formData.append("tags", JSON.stringify(bounty.tags));
        formData.append("due", bounty.due);
        formData.append("currency", bounty.currency);

        console.log(bounty);
        console.log(formData);

        if (!bounty.title || !bounty.description || !bounty.due || !bounty.currency) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            });
            return;
        }

        if (bounty.currency < 10) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The bounty currency should be at least 10!',
            });
            return;
        }

        if (bounty.currency > user.balance) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You do not have enough currency to create this bounty! Please top up your balance.',
            });
            return;
        }
        
        const resp = await fetch(`${serverUrl}/bounty`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        const bounties = await resp.json();

        dispatch(setBounties({ bounties }));
        setBounty({
            user: user._id,
            title: "",
            description: "",
            tags: [],
            due: "",
            currency: 0,
        });
        fetchBounties();
        close();
    };

    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    return (
        <Box
            className="content"
            backgroundColor={theme.palette.neutral.light}
            sx={{
                width: "100%",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                borderRadius: "9px",
                height: "100%",
            }}
        >
            <FlexBetween gap="1rem" alignItems="center">
                <Box p="1rem" flexGrow={1}>
                    <Typography variant="h6" fontWeight="bold" mb="1rem" sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        Create Bounty
                    </Typography>
                    <Box display="flex" flexDirection="column" gap="1rem">
                        <TextField
                            label="Bounty Title"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={bounty.title}
                            onChange={(e) => setBounty({ ...bounty, title: e.target.value })}
                            inputProps={{
                                maxLength: 50,
                            }}
                        />
                        <TextField
                            label="Bounty Description"
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline
                            rows={4}
                            value={bounty.description}
                            onChange={(e) =>
                                setBounty({ ...bounty, description: e.target.value })
                            }
                            inputProps={{
                                maxLength: 1000,
                            }}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                            <TextField
                                type="date"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={bounty.due}
                                onChange={(e) => setBounty({ ...bounty, due: e.target.value })}
                                InputProps={{
                                    inputProps: {
                                        min: dateString
                                    }
                                }}
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Bounty Currency"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={bounty.currency}
                                onChange={(e) => {
                                    setBounty({ ...bounty, currency: e.target.value });
                                }}
                            />
                            </Grid>
                        </Grid>
                            <div>
                                <TextField
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    label="Add a tag"
                                    variant="outlined"
                                    sx={{
                                        width: "90%",
                                    }}
                                />
                                <IconButton onClick={handleAddTag}
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        borderRadius: "9px",
                                    }}
                                >
                                    <AddOutlined />
                                </IconButton>
                                {bounty.tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={handleDeleteTag(tag)}
                                    />
                                ))}
                            </div>
                    </Box>
                    <Box display="flex" justifyContent="center" mt="1rem" gap="1rem">
                        <IconButton onClick={handleBounty} color="primary" variant="contained" sx={{
                            borderRadius: "9px",
                        }}>
                            <AddOutlined />
                            <Typography variant="button" ml={0.5}>Add</Typography>
                        </IconButton>
                        <IconButton onClick={close} color="primary" variant="contained" sx={{
                            borderRadius: "9px",
                        }}>
                            <CancelOutlined />
                            <Typography variant="button" ml={0.5}>Cancel</Typography>
                        </IconButton>
                    </Box>

                </Box>
                {isMobile ? null : (
                <Box
                    sx={{
                        flexBasis: "30%",
                        padding: "1rem",
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "9px",
                        border: `1px solid ${theme.palette.primary.main}`,
                    }}
                >
                    <BountyPreview
                        bounty={bounty}
                    />
                </Box>
                )}
            </FlexBetween>
        </Box>
    );
};

export default CreateBountyPop;