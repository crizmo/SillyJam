import { Box, Typography, useTheme, useMediaQuery, IconButton, Button } from "@mui/material";
import {
    HomeOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import quake_device_1 from "../../assets/landing/quake_device_1.png";
import quake_device_2 from "../../assets/landing/quake_device_2.png";

const Mid = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const primaryLight = theme.palette.primary.light;
    return (
        <Box>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : undefined}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="h3" color={primaryLight}>
                        Quake Posts
                    </Typography>
                    <Typography variant="body1" color={primaryLight} sx={{
                        textAlign: "center",
                        marginBottom: "1rem"
                    
                    }}>
                        Share your creative projects, connect with other creators, and explore monetization opportunities on Quake.
                    </Typography>
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : undefined}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <img src={quake_device_1} alt="image" width="100%" height="auto" />
                </Box>
            </Box>

            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : undefined}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <img src={quake_device_2} alt="image" width="100%" height="auto" />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : undefined}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="h3" color={primaryLight}>
                        Bounties
                    </Typography>
                    <Typography variant="body1" color={primaryLight}sx={{
                        textAlign: "center",
                        marginBottom: "1rem"
                    }}>
                        Complete tasks and earn rewards on Quake.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Mid;
