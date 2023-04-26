import { configureStore } from "@reduxjs/toolkit";
import { vacationReducer } from "./VacationReducer";

export const vacationlyStore = configureStore({
  reducer: {
    vacations: vacationReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
