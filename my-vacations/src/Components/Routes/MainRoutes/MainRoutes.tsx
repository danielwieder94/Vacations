import React from "react";
import { Route, Routes } from "react-router-dom";
import AddVacation from "../../Pages/AddVacation/AddVacation";
import EditVacation from "../../Pages/EditVacation/EditVacation";
import Main from "../../Layout/Main/Main";
import Page404 from "../../Pages/Page404/Page404";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import VacationList from "../../Pages/VacationList/VacationList";
import "./MainRoutes.css";
import { PrivateRoutes, AdminRoutes } from "../../../Utils/ProtectedRoutes";
import Reports from "../../Pages/Reports/Reports";

function MainRoutes(): JSX.Element {
  return (
    <div className="MainRoutes">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<VacationList />} />
          <Route path="/vacationList" element={<VacationList />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/addVacation" element={<AddVacation />} />
          <Route path="/editVacation/:id" element={<EditVacation />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
export default MainRoutes;
