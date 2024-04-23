import { Box, Typography, useTheme, useMediaQuery, IconButton, Button } from "@mui/material";
import {
    ConnectedTv,
    PixOutlined,
    PostAddOutlined,
    TollOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import top_pcguy from "../../assets/landing/top_pcguy.png";

const Top = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const dark = theme.palette.neutral.dark;
    const primaryLight = theme.palette.primary.light;
    return (
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"

            sx={{
                overflowY: "scroll",
                height: "calc(100vh - 6rem)",
            }}
        >
            <Box flexBasis={isNonMobileScreens ? "45%" : undefined}>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    justifyContent="center"
                    height="100%"
                    width="100%"
                >
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        color="black"
                    >
                        Welcome to Quake!
                    </Typography>
                    <Typography
                        fontSize="clamp(1rem, 1rem, 1.25rem)"
                        color="#484a4c"
                    >
                        Join Quake, where passion meets opportunity, and creativity knows no bounds.
                    </Typography>
                    {/* 2 buttons side by side */}
                    <Box
                        display="flex"
                        gap="1rem"
                        justifyContent={isNonMobileScreens ? "flex-start" : "center"}
                    >
                        <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
                            Get Started
                        </Button>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap="0.5rem"
                        justifyContent="left"
                        alignItems="center"
                        mt="2rem"
                        sx={{
                            background: "rgba(0,0,0,0.0)",
                            borderRadius: "1rem",
                            padding: "1rem",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                            width: "80%",

                            "&:hover": {
                                cursor: "pointer",
                                background: "rgba(0,0,0,0.05)",
                                transition: "all 0.2s ease-in-out",
                            },

                        }}
                    >
                        <IconButton
                            sx={{
                                color: "black",
                                fontSize: "clamp(1rem, 1rem, 1.25rem)",
                            }}
                        >
                            <ConnectedTv sx={{ fontSize: "25px" }} />
                        </IconButton>
                        <Box display="flex" flexDirection="column" gap="0.5rem">
                            <Typography
                                fontWeight="bold"
                                fontSize="clamp(1rem, 1rem, 1.25rem)"
                                color="black"
                            >
                                Connect
                            </Typography>
                            <Typography
                                fontSize="clamp(1rem, 1rem, 1.25rem)"
                                color="#484a4c"
                            >
                                Connect with friends and the world around you on Quake.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap="0.5rem"
                        justifyContent="left"
                        alignItems="center"
                        sx={{
                            background: "rgba(0,0,0,0.0)",
                            borderRadius: "1rem",
                            padding: "1rem",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                            width: "80%",

                            "&:hover": {
                                cursor: "pointer",
                                background: "rgba(0,0,0,0.05)",
                                transition: "all 0.2s ease-in-out",
                            },
                        }}
                    >
                        <IconButton
                            sx={{
                                color: "black",
                                fontSize: "clamp(1rem, 1rem, 1.25rem)",
                            }}
                        >
                            <PixOutlined sx={{ fontSize: "25px" }} />
                        </IconButton>
                        <Box display="flex" flexDirection="column" gap="0.5rem">
                            <Typography
                                fontWeight="bold"
                                fontSize="clamp(1rem, 1rem, 1.25rem)"
                                color="black"
                            >
                                Bounties
                            </Typography>
                            <Typography
                                fontSize="clamp(1rem, 1rem, 1.25rem)"
                                color="#484a4c"
                            >
                                Create and complete bounties to earn rewards.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap="0.5rem"
                        justifyContent="left"
                        alignItems="center"
                        sx={{
                            background: "rgba(0,0,0,0.0)",
                            borderRadius: "1rem",
                            padding: "1rem",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                            width: "80%",

                            "&:hover": {
                                cursor: "pointer",
                                background: "rgba(0,0,0,0.05)",
                                transition: "all 0.2s ease-in-out",
                            },
                        }}
                    >
                        <IconButton
                            sx={{
                                color: "black",
                                fontSize: "clamp(1rem, 1rem, 1.25rem)",
                            }}
                        >
                            <PostAddOutlined sx={{ fontSize: "25px" }} />
                        </IconButton>
                        <Box display="flex" flexDirection="column" gap="0.5rem">
                            <Typography
                                fontWeight="bold"
                                fontSize="clamp(1rem, 1rem, 1.25rem)"
                                color="black"
                            >
                                Create
                            </Typography>
                            <Typography
                                fontSize="clamp(1rem, 1rem, 1.25rem)"
                                color="#484a4c"
                            >
                                Create and share your work with the world.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap="0.5rem"
                        justifyContent="left"
                        alignItems="center"
                        sx={{
                            background: "rgba(0,0,0,0.0)",
                            borderRadius: "1rem",
                            padding: "1rem",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                            width: "80%",

                            "&:hover": {
                                cursor: "pointer",
                                background: "rgba(0,0,0,0.05)",
                                transition: "all 0.2s ease-in-out",
                            },
                        }}
                    >
                        <IconButton
                            sx={{
                                color: "black",
                                fontSize: "clamp(1rem, 1rem, 1.25rem)",
                            }}
                        >
                            <TollOutlined sx={{ fontSize: "25px" }} />
                        </IconButton>
                        <Box display="flex" flexDirection="column" gap="0.5rem">
                            <Typography
                                fontWeight="bold"
                                fontSize="clamp(1rem, 1rem, 1.25rem)"
                                color="black"
                            >
                                Earn
                            </Typography>
                            <Typography
                                fontSize="clamp(1rem, 1rem, 1.25rem)"
                                color="#484a4c"
                            >
                                Earn money by completing commissions and bounties.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box m="2rem 0" />
            </Box>
            <Box
                flexBasis={isNonMobileScreens ? "40%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    justifyContent="center"
                    height="100%"
                    sx={{
                        "& > *": {
                            cursor: "pointer",
                        },
                    }}
                >
                    <img
                        width="90%"
                        height="auto"
                        style={{
                            objectFit: "cover",
                            borderRadius: "1rem",
                            margin: "0 auto",
                        }}
                        src={top_pcguy}
                        alt="pc guy"
                    />

                </Box>
            </Box>
        </Box>
    );
};

export default Top;
