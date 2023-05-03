import React, { useEffect, useState } from "react";
import MainRoutes from "../../Routes/MainRoutes/MainRoutes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./MainLayout.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Theme/Theme";

function MainLayout(): JSX.Element {
  //   const [showFooter, setShowFooter] = useState(false);

  //   useEffect(() => {
  //     function handleScroll() {
  //       const isAtBottom =
  //         window.innerHeight + window.scrollY >= document.body.offsetHeight;
  //       setShowFooter(isAtBottom);
  //     }

  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

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
