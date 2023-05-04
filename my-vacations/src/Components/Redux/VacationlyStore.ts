import { configureStore } from "@reduxjs/toolkit";
import { vacationReducer } from "./VacationReducer";
import { userReducer } from "./UserReducer";

export const vacationlyStore = configureStore({
  reducer: {
    vacations: vacationReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
