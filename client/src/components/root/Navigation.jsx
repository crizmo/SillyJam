import { Box, Typography, useTheme, useMediaQuery, IconButton, Button } from "@mui/material";
import { useState } from "react";
import {
    DarkMode,
    LightMode,
    Close,
    Menu,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";

import { useDispatch } from "react-redux";
import { setMode } from "../../state";

import { useNavigate } from "react-router-dom";

import quakelogo from "../../../src/assets/quake_logo.png";

const Navigation = () => {
    const theme = useTheme();
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const dark = theme.palette.neutral.dark;
    const primaryLight = theme.palette.primary.light;
    const background = theme.palette.background.default;
    return (
        <Box
            width="100%"
            backgroundColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center"
        >
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    <img src={quakelogo} alt="Quake Logo" width="120vw" height="auto" />
                </Typography>

                {isNonMobileScreens ? (
                    <FlexBetween gap="2rem">
                        <Box
                            display="flex"
                            gap="1rem"
                            justifyContent={isNonMobileScreens ? "flex-start" : "center"}
                        >
                            <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>
                                Log in | Sign up
                            </Button>
                        </Box>
                    </FlexBetween>
                ) : (
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Menu />
                    </IconButton>
                )}
                {!isNonMobileScreens && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={background}
                    >
                        {/* CLOSE ICON */}
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton
                                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                            >
                                <Close />
                            </IconButton>
                        </Box>

                        {/* MENU ITEMS */}
                        <FlexBetween
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            gap="3rem"
                        >
                            <Box
                                display="flex"
                                gap="1rem"
                                justifyContent={isNonMobileScreens ? "flex-start" : "center"}
                            >
                                <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>
                                    Log in  |  Sign up
                                </Button>
                            </Box>
                        </FlexBetween>
                    </Box>
                )}
            </FlexBetween>
        </Box>
    );
};

export default Navigation;
