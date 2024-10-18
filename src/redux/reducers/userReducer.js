import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAvatar from "../../assets/defaultProfile.jpg";
import Joi from "joi";

// Async thunk to update user info (name, username, email, phone)
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

// Async thunk to change user password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().alphanum().min(3).required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/)
    .required(),
  avatar: Joi.string()
    .uri({
      allowRelative: true // Allow relative URLs
    })
    .allow(""), // Allow empty string
  phone: Joi.string()
    .pattern(new RegExp(/^01[0125][0-9]{8}$/))
    .allow(""),
  _id: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
  __v: Joi.number()
});

const intialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null")
};

if (intialState.userInfo) {
  const { error } = userSchema.validate(intialState.userInfo);
  if (error) {
    intialState.userInfo = null;
    localStorage.removeItem("userInfo");
  }
}

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    login: (state, action) => {
      const { error } = userSchema.validate(action.payload);
      console.log();

      if (error) {
        state.userInfo = null;
        localStorage.removeItem("userInfo");
      } else {
        state.userInfo = action.payload;
        if (!state.userInfo.avatar || state.userInfo.avatar === "") {
          state.userInfo.avatar = defaultAvatar;
        }
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
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
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log("Password changed successfully:", action.payload);
      })
      .addCase(changePassword.rejected, (state, action) => {
        console.error("Failed to change password:", action);
      });
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
