import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "./FlexBetween";

const ChatMessage = ({ msg, userId, username, index, messages }) => {
    const { createdAt, message, sender, receiver } = msg;
    let date = new Date(createdAt);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    let time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " at " + strTime;

    if (date.getDate() === new Date().getDate()) {
        time = strTime;
    }
    if (date.getDate() === new Date().getDate() - 1) {
        time = `Yesterday at ${strTime}`;
    }

    const { palette } = useTheme();
    const { neutral } = palette;
    const isMobile = useMediaQuery("(max-width: 600px)");

    const theme = useTheme();
    const dark = theme.palette.neutral.dark;

    const isCurrentUser = sender._id === userId;

    return (
        <Box>
            <FlexBetween sx={{ flexDirection: isCurrentUser ? "row-reverse" : "row" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        padding: isMobile ? "0.5rem 0" : "0.5rem 1rem",
                        borderBottom: `1px solid ${neutral.light}`,
                        backgroundColor: isCurrentUser ? "#32dbfc" : neutral.light,
                        borderRadius: "9px",
                        mb: "1rem",
                        mr: isCurrentUser ? "1rem" : "0",
                        maxWidth: "80%",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        hyphens: "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem"
                        }}
                    >
                        {sender._id === userId ? (
                            <Typography
                                variant={isMobile ? "h6" : "h5"}
                                fontWeight={isMobile ? "500" : "700"}
                                color={isCurrentUser ? "black" : dark}
                                paddingLeft={isMobile ? "1rem" : "0"}
                                paddingRight={isMobile ? "1rem" : "0"}
                            >
                                You
                            </Typography>
                        ) : (
                            <Typography
                                variant={isMobile ? "h6" : "h5"}
                                fontWeight={isMobile ? "500" : "700"}
                                paddingLeft={isMobile ? "1rem" : "0"}
                                paddingRight={isMobile ? "1rem" : "0"}
                            >
                                {sender.name !== username ? sender.name : receiver.name}
                            </Typography>
                        )}
                    </Box>
                    <Typography
                        color={isCurrentUser ? "black" : dark}
                        paddingLeft={isMobile ? "1rem" : "0"}
                        paddingRight={isMobile ? "1rem" : "0"}
                    >
                        {message.split(/[\u{1F000}-\u{1F6FF}]/gu).map((text, index) => (
                            <span style={{ fontSize: isMobile ? "0.9rem" : "1rem" }} key={index}>
                                {text}
                            </span>
                        ))}
                        {message.match(/[\u{1F000}-\u{1F6FF}]/gu) &&
                            Array.from(message.match(/[\u{1F000}-\u{1F6FF}]/gu)).map((emoji, index) => (
                                <span style={{ fontSize: "1.2rem" }} key={index}>
                                    {emoji}
                                </span>
                            ))}

                        <Typography
                            variant="caption"
                            fontSize={isMobile ? "0.6rem" : "0.8rem"}
                            color={isCurrentUser ? "black" : dark}
                            paddingLeft={isMobile ? "2rem" : "2rem"}
                        >
                            {strTime}
                        </Typography>
                    </Typography>
                </Box>
            </FlexBetween>
        </Box>
    );
};

export default ChatMessage;
