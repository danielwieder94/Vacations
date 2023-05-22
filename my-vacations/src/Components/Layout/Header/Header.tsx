import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { theme } from "../Theme/Theme";
import "./Header.css";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { persistor, vacationlyStore } from "../../Redux/VacationlyStore";
import AdminNav from "../../UserOptions/AdminNav/AdminNav";
import UserNav from "../../UserOptions/UserNav/UserNav";
import { isLoggedIn } from "../../Redux/UserReducer";

function Header(): JSX.Element {
  const navigate = useNavigate();
  const userLoggedIn = vacationlyStore.getState().users.isLoggedIn;
  const userIsAdmin = () => {
    if (userLoggedIn) {
      const user = vacationlyStore.getState().users.user[0];
      return user.isAdmin;
    } else {
      return false;
    }
  };
  console.log("userIsAdmin:", userIsAdmin());
  const handleLogout = () => {
    localStorage.removeItem("persist:main-root");
    vacationlyStore.dispatch(isLoggedIn(false));
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <AppBar color="primary" style={{ position: "static" }}>
          <Toolbar>
            {!userLoggedIn ? (
              <>
                <FontAwesomeIcon
                  icon={faPlaneDeparture}
                  size="xl"
                  style={{ color: "#ffffff", marginRight: "5px" }}
                />
                <Typography variant="h4" component="div">
                  Vacationly
                </Typography>
                <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
                  <Button
                    size="large"
                    sx={{ height: "2rem" }}
                    color="inherit"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    size="large"
                    sx={{ height: "2rem" }}
                    color="inherit"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </Stack>
              </>
            ) : userIsAdmin() ? (
              <AdminNav onLogout={handleLogout} />
            ) : (
              <UserNav onLogout={handleLogout} />
            )}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Header;

{
  /* <Stack direction="row" spacing={2} margin="auto">
                <Button
                  size="large"
                  color="inherit"
                  onClick={() => navigate("/vacationList")}
                >
                  Explore
                </Button>

                <Button size="large" color="inherit">
                  Saved Vacations
                </Button>
              </Stack>
              <Stack direction="row">
                <Button
                  size="large"
                  sx={{ height: "2rem" }}
                  color="inherit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  size="large"
                  sx={{ height: "2rem" }}
                  color="inherit"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Stack> */
}
