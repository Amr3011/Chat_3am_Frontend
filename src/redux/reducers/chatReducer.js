import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create an async thunk for fetching both group and private chats
export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const response = await fetch(`/api/chat/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }

  const data = await response.json();

  // Separate group and private chats
  const groupChats = data.filter((chat) => chat.isGroup);
  const privateChats = data.filter((chat) => !chat.isGroup);

  return { groupChats, privateChats }; // Return both types of chats
});

// Create an async thunk for fetching users for private chat
export const fetchAvailableUsers = createAsyncThunk(
  "chat/fetchAvailableUsers",
  async () => {
    const response = await fetch(`/api/chat/search-users`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data; // Return the list of available users
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    groupChats: [],
    privateChats: [],
    availableUsers: [], // Store available users for private chat
    loading: false,
    error: null,
  },
  reducers: {
    setGroupChats: (state, action) => {
      state.groupChats = action.payload; // Set the payload as groupChats
    },
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
      // Fetch chats
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.groupChats = action.payload.groupChats;
        state.privateChats = action.payload.privateChats;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch available users for private chat
      .addCase(fetchAvailableUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.availableUsers = action.payload; // Set available users
      })
      .addCase(fetchAvailableUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setGroupChats, setPrivateChats, updatePrivateChat } =
  chatSlice.actions;
export default chatSlice.reducer;
