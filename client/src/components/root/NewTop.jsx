import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    IconButton,
    Button,
    Tooltip,
    Grid,
} from "@mui/material";
import { ExpandMoreOutlined as ArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import qrLogo from "../../assets/just_logo.png";

const NewTop = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const primaryLight = theme.palette.primary.light;
    const background = theme.palette.background.default;
    return (
        <Box
            width="100%"
            padding={{ xs: '1rem', sm: '2rem 6%' }}
            display="flex"
            gap="2rem"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
                height: "calc(100vh - 6rem)",
            }}
        >
            <img src={qrLogo} alt="Logo" style={{ width: '100%', maxWidth: '100px', height: 'auto' }} />
            <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                    color: "#1a1a1a",
                    fontWeight: "bold",
                    fontSize: { xs: '2rem', sm: '3rem' },
                }}
            >
                Introducing Quake !
            </Typography>
            <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                    color: "#484a4c",
                    width: { xs: '100%', sm: '50%' },
                    textAlign: "center",
                    fontSize: { xs: '1.2rem', sm: '1.5rem' },
                }}
            >
                Unleash Your Creativity, Connect, Collaborate, and Get Rewarded!
            </Typography>
            <Button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <ArrowDown
                    sx={{
                        fontSize: { xs: '2rem', sm: '3rem' },
                        color: "#1a1a1a",
                        animation: "bounce 2s infinite",
                        '@keyframes bounce': {
                            '0%, 100%': {
                                transform: 'translateY(0)',
                            },
                            '50%': {
                                transform: 'translateY(-20px)',
                            },
                        },
                    }}
                />
            </Button>
            <Tooltip title="Join the waitlist to get notified when we launch!" arrow placement="left">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.open('', '_blank')}
                    sx={{
                        position: { xs: 'static', sm: 'fixed' },
                        right: { xs: 'auto', sm: '20px' },
                        bottom: { xs: 'auto', sm: '20px' },
                        padding: '10px 20px',
                        borderRadius: '20px',
                        fontSize: '1rem',
                        textTransform: 'none',
                        backgroundColor: '#1279fd',
                        '&:hover': {
                            backgroundColor: '#63666a',
                        },
                    }}
                >
                    Join Waitlist
                </Button>
            </Tooltip>
        </Box>
    );
}

export default NewTop;