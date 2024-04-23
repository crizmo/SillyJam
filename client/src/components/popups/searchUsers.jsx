import { Box, useTheme, IconButton, InputBase, useMediaQuery } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { Search, Close } from "@mui/icons-material";
import ChatUsers from "../../components/ChatUsers";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const serverUrl = import.meta.env.VITE_QUAKEAPI;

const SearchUsers = ({ userId, close }) => {

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const token = useSelector((state) => state.token);

    const [ fetchedUsers, setFetchedUsers ] = useState([]);
    const [child2Data, setChild2Data] = useState([]); // eslint-disable-line no-unused-vars
    const [mainUser, setMainUser] = useState([]);
    const [searchedUser, setSearchedUser] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const checkFilteredUsers = async () => {
        const data = fetchedUsers;
        data.forEach((user) => {
            if (user._id === userId) {
                setMainUser(user);
            }
        });

        const filtered = data.filter((user) => {
            return user.firstName.toLowerCase().includes(searchedUser.toLowerCase());
        });

        setFilteredUsers(filtered);
    };

    function update() {
        checkFilteredUsers();
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${serverUrl}/users/all`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setFetchedUsers(data);
        }

        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box className='content'
            backgroundColor={isNonMobileScreens ? theme.palette.background.default : theme.palette.background.alt}
            style={{
                width: "100%",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                borderRadius: "9px",
                height: "90vh",
                maxWidth: "80vw",
            }}
        >
            <FlexBetween
                borderRadius="9px"
                gap="1rem"
                padding="0.1rem 0.1rem"
            >
                <FlexBetween
                    backgroundColor={neutralLight}
                    borderRadius="9px"
                >
                    <IconButton onClick={close} style={{ borderRadius: "9px" }}>
                        <Close />
                    </IconButton>
                </FlexBetween>
                <FlexBetween
                    backgroundColor={neutralLight}
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." onChange={(e) => {
                        if (e.target.value === "") {
                            setFilteredUsers([]);
                        }
                        setSearchedUser(e.target.value);
                        checkFilteredUsers();
                    }} />
                    <IconButton onClick={
                        () => {
                            checkFilteredUsers();
                        }
                    }>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    mt: "1rem",
                    overflowY: "scroll",
                    maxHeight: "90vh",
                    height: "90vh",
                }}
            >
                {filteredUsers.map((user) => {
                    return (
                        <ChatUsers user={user} key={user._id} update={update} mainUser={mainUser} setChild2Data={setChild2Data} />
                    );
                })}
            </Box>
        </Box>
    )
}

export default SearchUsers;