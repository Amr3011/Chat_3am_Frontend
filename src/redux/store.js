import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import userReducer from "./reducers/userReducer"; // Already added

// Combine all the reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer, // The reducer for user registration and authentication
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
