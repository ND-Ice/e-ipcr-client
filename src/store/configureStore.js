import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";

const persistConfig = {
  key: "user-key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function store() {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
  let persistor = persistStore(store);
  return { store, persistor };
}
