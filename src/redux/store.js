import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import userReducer from "./reducers/userReducer"; // Already added
import chatReducer from "./reducers/chatReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer, // The reducer for user registration and authentication
  chat: chatReducer,
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
