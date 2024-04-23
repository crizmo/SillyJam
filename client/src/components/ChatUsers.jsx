import { Box, Typography, useTheme, IconButton } from "@mui/material";
import {
    AddOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const serverUrl = import.meta.env.VITE_QUAKEAPI;

const ChatUsers = ({ user, update, mainUser, setChild2Data }) => {

    const [data, setData] = useState(null); // eslint-disable-line no-unused-vars

    const { palette } = useTheme();
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    let dmList = mainUser.dms;

    const _setData = (_data) => {
        setData(_data);
        setChild2Data(_data);
      };    

    const addDm = async () => {
        const response = await fetch(
            `${serverUrl}/users/${_id}/add-dm/${user._id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json(); // eslint-disable-line no-unused-vars
        update();
        _setData(user._id);
    };

    const removeDm = async () => {
        const response = await fetch(
            `${serverUrl}/users/${_id}/remove-dm/${user._id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json(); // eslint-disable-line no-unused-vars
        update();
        _setData(null);
    };

    const page = window.location.hash;

    return (
        <FlexBetween
            sx={{
                gap: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "9px",
                backgroundColor: neutralLight,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    width: "100%",
                    "&:hover": {
                        cursor: "pointer"
                    },
                }}

                onClick={() => {
                    if (page !== "/chat") {
                        navigate(`/profile/${user._id}`);
                        navigate(0);
                    }
                }}
            >
                <img
                    src={user.pictureUrl}
                    alt="user"
                    style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "50%",
                    }}
                />
                <Box>
                    <Typography
                        variant="h6"
                        color={palette.neutral.dark}
                        fontWeight="500"
                    >
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography color={palette.neutral.medium}>{user.followers.length} followers</Typography>
                    <Typography color={palette.neutral.medium}>{user.following.length} following</Typography>
                </Box>
            </Box>
            {page === "#/chat" && (
            <Box>
                {(mainUser._id !== user._id) && (
                    // console.log(dmList),
                    !dmList.includes(user._id) ? (
                    <IconButton
                        onClick={() => {
                            addDm();
                        }}
                    >
                        <AddOutlined sx={{ color: palette.primary.dark }} />
                    </IconButton>
                    ) : (
                    <IconButton
                        onClick={() => {
                            removeDm();
                        }}
                    >
                        <DeleteOutlined sx={{ color: palette.primary.dark }} />
                    </IconButton>
                    )
                )}
            </Box>
            )}
        </FlexBetween>
    );
};

export default ChatUsers;
