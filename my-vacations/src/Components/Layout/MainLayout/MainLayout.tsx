import React, { useEffect, useState } from "react";
import MainRoutes from "../../Routes/MainRoutes/MainRoutes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./MainLayout.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Theme/Theme";
// import { useDispatch } from "react-redux";
// import { getCookie } from "../../../Utils/cookieUtil";
// import { isAdmin, isLoggedIn } from "../../Redux/UserReducer";
// import { useLocation } from "react-router-dom";

function MainLayout(): JSX.Element {
  // const dispatch = useDispatch();
  // const location = useLocation();

  // useEffect(() => {
  //   const token = getCookie("token");
  //   if (token) {
  //     dispatch(isLoggedIn(true));
  //   }
  // }, [location]);
  return (
    <ThemeProvider theme={theme}>
      <div className="MainLayout">
        <header>
          <Header />
        </header>
        <main>
          <MainRoutes />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default MainLayout;
