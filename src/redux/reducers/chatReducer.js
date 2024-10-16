import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    groupChats: [],
  },
  reducers: {
    setGroupChats: (state, action) => {
      state.groupChats = action.payload;
    },
  },
});

export const { setGroupChats } = chatSlice.actions;
export default chatSlice.reducer;
