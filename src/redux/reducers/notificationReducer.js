// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchNotifications = createAsyncThunk(
//   "notifications/fetchNotifications",
//   async () => {
//     const response = await fetch(`/api/notifications`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch notifications");
//     }
//     const { notification } = await response.json();
//     return notification;
//   }
// );

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState: [],
//   reducers: {
//     addNotification: (state, action) => {
//       state.push(action.payload);
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchNotifications.fulfilled, (state, action) => {
//       return action.payload;
//     });
//   }
// });

// export const { addNotification } = notificationSlice.actions;

// export default notificationSlice.reducer;
