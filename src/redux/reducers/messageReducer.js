import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for fetching messages for a selected chat
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (chatId) => {
    const response = await fetch(`/api/message/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    const data = await response.json();
    console.log("Messages:", data);
    return data.data; // Return the fetched messages
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload; // Set messages in state
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Add a new message to state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload; // Set fetched messages
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
