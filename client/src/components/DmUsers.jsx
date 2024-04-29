import { Box, Typography, useTheme, IconButton } from "@mui/material";
import {
    DeleteOutlined,
    AddOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const serverUrl = import.meta.env.VITE_SILLYJAMAPI;

const DmUsers = ({ id }) => {
    const { palette } = useTheme();
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [dmList, setDmList] = useState([]);

    const fetchDms = async () => {
        const response = await fetch(
            `${serverUrl}/users/${_id}/dms`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
        const data = await response.json();
        setDmList(data);
    };

    useEffect(() => {
        fetchDms();
    }, []);

    return (
        <Box
            width="100%"
            padding="2rem 6%"
            sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "9px",
                padding: "1rem",
                height: "100%",
                overflowY: "scroll",
            }}
        >
            <FlexBetween>
                <Typography variant="h6">Direct Messages</Typography>
                <IconButton
                    onClick={() => {
                        navigate("/app/dms");
                    }}
                >
                    <AddOutlined />
                </IconButton>
            </FlexBetween>
            {dmList.map((dm) => {
                return (
                    <FlexBetween
                        key={dm._id}
                        style={{
                            padding: "0.5rem 0",
                            borderBottom: "1px solid #e0e0e0",
                        }}
                    >
                        <Typography
                            variant="body1"
                            style={{
                                color: neutralLight,
                                fontWeight: "bold",
                            }}
                        >
                            {dm.firstName} {dm.lastName}
                        </Typography>
                        <IconButton
                            onClick={() => {
                                navigate(`/app/dms/${dm._id}`);
                            }}
                        >
                            <DeleteOutlined />
                        </IconButton>
                    </FlexBetween>
                );
            })}
        </Box>
    );
};

export default DmUsers;
