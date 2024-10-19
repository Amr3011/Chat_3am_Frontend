import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Adjusted async thunk for fetching private chats
export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const response = await fetch(`/api/chat/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch private chats");
  }

  const data = await response.json();
  return { privateChats: data }; // Return the fetched private chats
});

// New async thunk for fetching group chats
export const fetchGroupChats = createAsyncThunk(
  "chat/fetchGroupChats",
  async () => {
    const response = await fetch(`/api/chat/group/`, {
      // Adjusted endpoint
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch group chats");
    }

    const data = await response.json();
    return { groupChats: data }; // Return the fetched group chats
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    privateChats: [],
    groupChats: [], // Added state for group chats
    availableUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPrivateChats: (state, action) => {
      state.privateChats = action.payload; // Set the payload as privateChats
    },
    updatePrivateChat: (state, action) => {
      const { chatId, updatedChat } = action.payload;
      const chatIndex = state.privateChats.findIndex(
        (chat) => chat._id === chatId
      );
      if (chatIndex !== -1) {
        state.privateChats[chatIndex] = updatedChat; // Update the specific private chat
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch private chats
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.privateChats = action.payload.privateChats;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch group chats
      .addCase(fetchGroupChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupChats.fulfilled, (state, action) => {
        state.loading = false;
        state.groupChats = action.payload.groupChats; // Store fetched group chats
      })
      .addCase(fetchGroupChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPrivateChats, updatePrivateChat } = chatSlice.actions;
export default chatSlice.reducer;
