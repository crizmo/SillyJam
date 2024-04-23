// import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Home,
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Settings,
  Pix,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Box
      padding="1rem 0"
      backgroundColor={alt}

      width="100%"
      height="100%"
      
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="1rem" 

      sx={{
        overflowY: "scroll",
        height: "calc(90vh - 6rem)",
      }}
    >
      <Box px={2} width="100%">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={2}
          mb={2}
        >
          <FlexBetween
            onClick={() => navigate(`/home`)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
            width="100%"
          >
            <Home />
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              Home
            </Typography>
          </FlexBetween>

          <FlexBetween
            onClick={() => navigate("/explore")}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
            width="100%"
          >
            <Search />
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              Explore
            </Typography>
          </FlexBetween>

          <FlexBetween
            onClick={() => dispatch(setMode())}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
            width="100%"
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode />
            ) : (
              <LightMode sx={{ color: dark }} />
            )}
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              {theme.palette.mode === "dark" ? "Dark" : "Light"} Mode
            </Typography>
          </FlexBetween>

          <FlexBetween
            onClick={() => navigate("/chat")}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
            width="100%"
          >
            <Message />
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              Chat
            </Typography>
          </FlexBetween>

          <FlexBetween
            onClick={() => navigate("/bounty")}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
            width="100%"
          >
            <Pix />
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              Bounty
            </Typography>
          </FlexBetween>

          <FlexBetween
            onClick={() => navigate(`/settings/${user._id}`)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
            width="100%"
          >
            <Settings />
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              Settings
            </Typography>
          </FlexBetween>

          <FlexBetween
            onClick={() => navigate("/bounty")}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
            width="100%"
          >
            <Notifications />
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              Notifications
            </Typography>
          </FlexBetween>

          <FlexBetween
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: primaryLight,
                borderRadius: "1rem",
              },
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "1rem",
            }}
            width="100%"
          >
            <Help />
            <Typography fontWeight="semibold" fontSize="1rem" width="100%">
              Help
            </Typography>
          </FlexBetween>
        </Box>
      </Box>
      <Box px={2} pb={2} width="100%" textAlign="left">
        <FlexBetween
          onClick={() => navigate(`/profile/${user._id}`)}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: theme.palette.primary.dark,
              backgroundColor: primaryLight,
              borderRadius: "1rem",
            },
            gap: "0.5rem",
            padding: "8px",
            borderRadius: "1rem",
          }}
        >
          <UserImage image={user.pictureUrl} size="40px" />
          <Typography fontWeight="semibold" fontSize="1rem" width="100%">
            {fullName}
          </Typography>
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default Sidebar;
