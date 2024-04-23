import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px", verified }) => {
  return (
    <Box width={size} height={size} position="relative">
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
      />
      {verified && 
        <img
          src={`../../assets/badges/verified.svg`}
          alt="Verified Badge"
          style={{ 
            width: "1.2rem", 
            position: "absolute", 
            bottom: 0, 
            right: 0 
          }}
        />
      }
    </Box>
  );
};

export default UserImage;