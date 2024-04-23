import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import {
  SubdirectoryArrowRightRounded
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const CommentUser = ({ userId, name, comment, userPictureUrl }) => {
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween sx={{ mb: "1rem", ml: "1rem" }}>
      <FlexBetween gap="1rem">
        <SubdirectoryArrowRightRounded sx={{ color: medium }} />
        <UserImage image={userPictureUrl} size={isNonMobileScreens ? "40px" : "30px"} />
        <Box
          onClick={() => {
            navigate(`/profile/${userId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem" sx={{ 
            mt: "0.25rem",
            width: "100%",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            hyphens: "auto",
            "@media (max-width: 800px)": {
              width: "40vw",
            },
            "@media (max-width: 400px)": {
              width: "20vw",
            },
          }}>
            {comment}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default CommentUser;
