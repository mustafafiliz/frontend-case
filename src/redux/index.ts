import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./slices/appSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "totalCartPrice"],
};

const persistedReducer = persistReducer(persistConfig, appSlice);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

import { AppInitialState as AppRootState } from "./slices/appSlice";

export type RootState = AppRootState;
