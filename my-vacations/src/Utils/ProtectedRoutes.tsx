import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { vacationlyStore } from "../Components/Redux/VacationlyStore";
import { isLoggedIn } from "../Components/Redux/UserReducer";
const PrivateRoutes = () => {
  let user = vacationlyStore.getState().users.isLoggedIn;
  console.log("PrivateRoutes isLoggedIn: ", user);

  return isLoggedIn(user) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
