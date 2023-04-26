import React from "react";
import MainRoutes from "../../Routes/MainRoutes/MainRoutes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./MainLayout.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Theme/Theme";

function MainLayout(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
        <div className="MainLayout">
            <header>
                <Header/>
            </header>
            <main>
			<MainRoutes/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
        </ThemeProvider>
    );
}

export default MainLayout;
