import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { vacationReducer } from "./VacationReducer";
import { userReducer } from "./UserReducer";

const persistConfig = {
  key: "main-root",
  storage: storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const vacationlyStore = configureStore({
  reducer: {
    vacations: vacationReducer,
    users: persistedUserReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

export const persistor = persistStore(vacationlyStore);
