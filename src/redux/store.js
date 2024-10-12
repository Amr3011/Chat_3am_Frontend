import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import userReducer from './reducers/userSlice'; // Already added
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

// Combine all the reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer, // The reducer for user registration and authentication
});

// Config for persisting the state (local storage)
const persistConfig = {
  key: "root",
  storage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// Export persistor for persisting the store
export const persistor = persistStore(store);
