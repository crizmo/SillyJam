import {
    ShareOutlined,
    DeleteOutlined,
    PermIdentity,
    TollOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase, Button } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UserImage from "../../components/UserImage";

const BountyInfoWidget = ({ bounty }) => {
    const loggedUser = useSelector((state) => state.user);

    const userPictureUrl =  loggedUser.pictureUrl;

    const [daysRemaining, setDaysRemaining] = useState(0);

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const neutralLight = palette.neutral.light;

    const {
        name,
        title,
        description,
        due,
        currency,
        tags,
    } = bounty;

    useEffect(() => {
        const calculateDaysRemaining = () => {
            const currentDate = new Date();
            const dueDate = new Date(due);
            const difference = dueDate.getTime() - currentDate.getTime();
            const days = Math.ceil(difference / (1000 * 3600 * 24));
            setDaysRemaining(days);
        };

        calculateDaysRemaining();
        const intervalId = setInterval(calculateDaysRemaining, 1000 * 60 * 60 * 24); // Update every day

        return () => clearInterval(intervalId); // Clean up on unmount
    }, [due]);

    return (
            <WidgetWrapper m="2rem 0">
                <div>
                    <FlexBetween>
                        <FlexBetween gap="0.5rem">
                            <Typography color={main} sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                lineHeight: "1.5rem",
                            }}>
                                {title}
                            </Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.5rem">
                            <Typography color={main}>
                                Due in {daysRemaining} days &nbsp;•
                            </Typography>
                            <Typography color={main} sx={{
                                backgroundColor: "#7FFFD4",
                                borderRadius: "0.5rem",
                                padding: "0.4rem 0.5rem",
                                color: "#000",
                            }}>
                                OPEN
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ borderRadius: "0.5rem" }}>
                                Apply
                            </Button>
                        </FlexBetween>
                    </FlexBetween>
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            color={main}
                            fontSize="1rem"
                            sx={{
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                                hyphens: "auto",
                            }}
                            width="50vw"
                        >
                            {description}
                        </Typography>
                    </Box>
                </div>
                <FlexBetween mt="2rem">
                    <FlexBetween gap="0.5rem">
                        <UserImage image={userPictureUrl} size="30px" />
                        <Box>
                            <Typography
                                color={main}
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.dark,
                                        cursor: "pointer",
                                    },
                                }} >
                                {name}
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <FlexBetween gap="0.5rem">
                        <PermIdentity sx={{ fontSize: "1.2rem" }} />
                        <Typography color={main}>
                            0 Appllications
                        </Typography>

                        <TollOutlined sx={{ fontSize: "1.2rem" }} />
                        <Typography color={main}>
                            {currency}
                        </Typography>
                    </FlexBetween>
                </FlexBetween>
                <Divider sx={{ mt: "1rem" }} />
                <FlexBetween mt="0.25rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton>
                            <DeleteOutlined />
                        </IconButton>
                        <IconButton>
                            <ShareOutlined />
                        </IconButton>
                    </FlexBetween>
                    <FlexBetween gap="0.25rem">
                        {tags.map((tag, index) => (
                            <Typography
                                key={index}
                                color={main}
                                sx={{
                                    backgroundColor: neutralLight,
                                    borderRadius: "0.5rem",
                                    padding: "0.4rem 0.5rem",
                                }}
                            >
                                {tag}
                            </Typography>
                        ))}
                    </FlexBetween>
                </FlexBetween>
            </WidgetWrapper>
    );
};

export default BountyInfoWidget;