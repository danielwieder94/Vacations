import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { vacationlyStore } from "../Components/Redux/VacationlyStore";
const PrivateRoutes = () => {
  let userLogged = vacationlyStore.getState().users.isLoggedIn;
  console.log("PrivateRoutes isLoggedIn: ", userLogged);

  return userLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
