import React from "react";
import MainRoutes from "../../Routes/MainRoutes/MainRoutes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./MainLayout.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Theme/Theme";
import { ToastContainer } from "react-toastify";

function MainLayout(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <div className="MainLayout">
        <header>
          <Header />
        </header>
        <main>
          <ToastContainer />
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
