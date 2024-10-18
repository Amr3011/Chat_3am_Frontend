import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAvatar from "../../assets/defaultProfile.jpg";

// Async thunk to update the user
export const updateUser = createAsyncThunk(
  "user/update",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Function to get initial user info from localStorage safely (avoids SSR issues)
const getInitialUserInfo = () => {
  if (typeof window !== "undefined") {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }
  return null;
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: getInitialUserInfo()
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      if (!state.userInfo.avatar || state.userInfo.avatar === "") {
        state.userInfo.avatar = defaultAvatar;
      }
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
        console.log("User updated successfully:", action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.error("Failed to update user:", action);
      });
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
