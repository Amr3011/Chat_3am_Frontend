import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import userReducer from "./reducers/userReducer"; // Already added

// Combine all the reducers
const rootReducer = combineReducers({
  theme: themeReducer,
<<<<<<< HEAD
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
=======
  user: userReducer // The reducer for user registration and authentication
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer
>>>>>>> 3124a79b1bdb2190b4156d20a5bbb2b71075f82b
});

export default store;
