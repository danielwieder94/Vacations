import { configureStore } from "@reduxjs/toolkit";
import { vacationReducer } from "./VacationReducer";

const store = configureStore({
  reducer: {
    vacations: vacationReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
