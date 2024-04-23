import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  bounties: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFollowers: (state, action) => {
      if (state.user) {
        state.user.followers = action.payload.followers;
      } else {
        console.error("user followers/following non-existent :(");
      }
    },
    setFollowing: (state, action) => {
      if (state.user) {
        state.user.following = action.payload.following;
      } else {
        console.error("user followers/following non-existent :(");
      }
    },

    setFollowersAndFollowing: (state, action) => {
      if (state.user) {
        state.user.followers = action.payload.followers;
        state.user.following = action.payload.following;
      } else {
        console.error("user followers/following non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.posts._id) return action.payload.posts;
        return post;
      });
      state.posts = updatedPosts;
    },

    setBounties: (state, action) => {
      state.bounties = action.payload.bounties;
    },
    setBounty: (state, action) => {
      const updatedBounties = state.bounties.map((bounty) => {
        if (bounty._id === action.payload.bounties._id) return action.payload.bounties;
        return bounty;
      });
      state.bounties = updatedBounties;
    }
  },
});

export const { setMode,setTheme, setLogin, setLogout, setFollowers , setFollowing, setFollowersAndFollowing, setPosts, setPost, setBounties, setBounty } =
  authSlice.actions;
  
export default authSlice.reducer;
