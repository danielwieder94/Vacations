import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { vacationlyStore } from "../Components/Redux/VacationlyStore";

const userAuth = () => {
  const userLogged = vacationlyStore.getState().users.isLoggedIn;
  const user = vacationlyStore.getState().users.user[0];
  return { userLogged, user };
};

const PrivateRoutes = () => {
  const { userLogged } = userAuth();
  console.log("PrivateRoutes isLoggedIn: ", userLogged);
  return userLogged ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoutes = () => {
  const { userLogged, user } = userAuth();
  if (userLogged === true) {
    const user = vacationlyStore.getState().users.user[0];
    return user.isAdmin ? <Outlet /> : <Navigate to="/vacationList" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export { PrivateRoutes, AdminRoutes };
