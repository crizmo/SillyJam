import { IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFollowersAndFollowing } from "../state";
import FlexBetween from "./FlexBetween";

const serverUrl = import.meta.env.VITE_SILLYJAMAPI;

const Follow = ({ followId, update, user }) => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);

    let isFollowing = user.followers.find((follower) => follower === _id)

    if (isFollowing) {
        isFollowing = true;
    } else {
        isFollowing = false;
    }

    const token = useSelector((state) => state.token);
    
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;

    const patchFollow = async () => {
        const response = await fetch(
            `${serverUrl}/users/${_id}/follow/${followId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }  
        );
        const data = await response.json();
  
        dispatch(setFollowersAndFollowing({ followers: data.formattedFollowers, following: data.formattedFollowing }));
        update();
    };

    return (
        <FlexBetween>
            {followId === _id ? null : (
                <IconButton
                    onClick={() => {
                        patchFollow();
                    }}
                    sx={{ 
                        backgroundColor: primaryLight, 
                        p: "0.6rem",
                        borderRadius: "10%",
                    }}
                >
                    {isFollowing ? (
                        <Typography sx={{ color: primaryDark }}>Unfollow</Typography>
                    ) : (
                        <Typography sx={{ color: primaryDark }}>Follow</Typography>
                    )}
                </IconButton>
            )}
        </FlexBetween>
    );
}

export default Follow;