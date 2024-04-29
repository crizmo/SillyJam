import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import FlexBetween from "../../components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      {/* Header */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography variant="h3" color="primary" fontWeight="bold" mt={1} mb={1}>
          SillyJam
        </Typography>
      </Box>

      {/* Content */}
      <FlexBetween justifyContent="space-between" alignItems="flex-start" p={4}>
        {/* Information about SillyJam */}
        <Box
          width={isNonMobileScreens ? "60%" : "100%"}
          p={4}
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            SillyJam [WIP]
          </Typography>
          <Typography variant="body1" mb={2}>
            SillyJam is a real-time music collaboration platform where users can create and join virtual rooms to collaborate on music projects together.
          </Typography>
          <Typography variant="h6" mb={1}>
            Key Features:
          </Typography>
          <ul>
            <li>Multi-User Jam Sessions: Users can create or join virtual jam sessions where they can collaborate with other musicians in real-time.</li>
            <li>Instrument Selection: Users can choose from a variety of virtual instruments to play during the jam session.</li>
            <li>Audio Streaming: Handle audio streaming between clients, allowing users to hear each other's contributions in real-time.</li>
            <li>Chat and Emotes: Users can communicate with each other via text chat and use emotes to express themselves during the jam session.</li>
            <li>Session Recording: Optionally, users can record the jam session for later playback or sharing.</li>
            <li>Customizable User Interface: Provide a customizable UI for developers to integrate into their applications.</li>
          </ul>
          <Typography variant="body1" mb={2}>
            <strong>Usage Scenario:</strong> Imagine a group of musicians spread across different locations who want to jam together in real-time.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Conclusion:</strong> Building a real-time music collaboration platform using Socket.IO can be a challenging but rewarding project.
          </Typography>
        </Box>

        {/* Login Form */}
        <Box
          width={isNonMobileScreens ? "35%" : "100%"}
          p={4}
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Welcome to SillyJam!
          </Typography>
          <Form />
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default LoginPage;
