import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../scenes/navbar";
import Sidebar from "../../scenes/sidebar";

import { setPosts } from "../../state";

const serverUrl = import.meta.env.VITE_QUAKEAPI;

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, pictureUrl } = useSelector((state) => state.user);

  const token = useSelector((state) => state.token);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"

        sx={{
          overflowY: "scroll",
          height: "calc(100vh - 6rem)",
        }}
      >
        <Box flexBasis={isNonMobileScreens ? "20%" : undefined} position={isNonMobileScreens ? "sticky" : undefined} top={isNonMobileScreens ? "0rem" : undefined}>
          {/* <Sidebar /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
        </Box>
        {isNonMobileScreens && (
          <Box 
            flexBasis="25%"
            position="sticky"
            top="0rem"
            sx={{
              overflowY: "scroll",
              height: "calc(90vh - 6rem)",
            }}
          >
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
