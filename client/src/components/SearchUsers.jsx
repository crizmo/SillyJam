import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";

const SearchUsers = ({ user }) => {
    const { palette } = useTheme();
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const navigate = useNavigate();

    return (
        <FlexBetween
            key={user._id}
            sx={{
                gap: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "9px",
                backgroundColor: neutralLight,

                "&:hover": {
                    backgroundColor: "black",
                    cursor: "pointer"
                },

            }}
            onClick={() => {
                navigate(`/profile/${user._id}`);
                navigate(0);
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
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
        </FlexBetween>
    );
};

export default SearchUsers;
