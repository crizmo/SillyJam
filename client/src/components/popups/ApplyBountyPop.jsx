import { Box, useTheme, IconButton, Typography, TextField } from "@mui/material";
import {
    AddOutlined,
    CancelOutlined,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBounties } from "../../state";

const serverUrl = import.meta.env.VITE_QUAKEAPI;

const ApplyBountyPop = ({ close, bountyId, userId, update }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const main = theme.palette.neutral.main;

    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const [application, setApplication] = useState({
        bountyId: bountyId,
        userId: userId,
        message: "",
    });

    const { _id } = useSelector((state) => state.user);

    const ApplyBounty = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("message", application.message);

        const resp = await fetch(`${serverUrl}/bounty/${bountyId}/apply/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bountyId: bountyId,
                userId: _id,
                message: application.message,
            }),

        });

        const data = await resp.json();

        dispatch(setBounties({ bounties: data }));
        setApplication({
            message: "",
        });
        update();
        close();
    };

    return (
        <Box className='content'
            backgroundColor={theme.palette.neutral.light}
            style={{
                width: "30vw",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                borderRadius: "9px",
                height: "100%",
            }}
        >
            <FlexBetween gap="1rem" alignItems="center">
                <Box p="1rem 0" width="100%">
                    <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                        <Box flexGrow={1}>
                            <Typography variant="h6" fontWeight="bold" mb="1rem" sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                Apply to Bounty
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <Box width="100%">
                            <TextField
                                label="Application Message"
                                variant="outlined"
                                size="small"
                                fullWidth
                                multiline
                                maxRows={15}
                                height="100%"
                                value={application.message}
                                onChange={(e) => {
                                    setApplication({
                                        ...application,
                                        message: e.target.value,
                                    });
                                }}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" mt="1rem" gap="1rem">
                        <IconButton onClick={() => ApplyBounty()} color="primary" variant="contained" sx={{
                            borderRadius: "9px",
                        }}>
                            <AddOutlined />
                            <Typography variant="button" ml={0.5}>Apply</Typography>
                        </IconButton>
                        <IconButton onClick={() => close()} color="primary" variant="contained" sx={{
                            borderRadius: "9px",
                        }}>
                            <CancelOutlined />
                            <Typography variant="button" ml={0.5}>Cancel</Typography>
                        </IconButton>
                    </Box>
                </Box>
            </FlexBetween>
        </Box>
    );
};

export default ApplyBountyPop;