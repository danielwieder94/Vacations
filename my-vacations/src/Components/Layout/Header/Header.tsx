import React, { useEffect, useState } from "react";
import {
  AppBar,
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
import { vacationlyStore } from "../../Redux/VacationlyStore";
import AdminNav from "../../UserOptions/AdminNav/AdminNav";
import UserNav from "../../UserOptions/UserNav/UserNav";
import { isLoggedIn } from "../../Redux/UserReducer";
import { userIsAdmin, userLoggedIn } from "../../../Utils/authUtils";

function Header(): JSX.Element {
  const [initials, setInitials] = useState<string>("");
  const navigate = useNavigate();
  const loggedIn = userLoggedIn();
  const isAdmin = userIsAdmin();

  useEffect(() => {
    if (loggedIn) {
      const user = vacationlyStore.getState().users.user[0];
      const firstInitial = user.firstName.charAt(0);
      const lastInitial = user.lastName.charAt(0);
      const initials = firstInitial + lastInitial;
      setInitials(initials);
    }
  }, [loggedIn]);

  const handleLogout = () => {
    vacationlyStore.dispatch(isLoggedIn(false));
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <AppBar color="primary" style={{ position: "static" }}>
          <Toolbar>
            {!loggedIn ? (
              <>
                <div
                  className="logo"
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    size="xl"
                    style={{ color: "#ffffff", marginRight: "5px" }}
                  />
                  <Typography variant="h4" component="div">
                    Vacationly
                  </Typography>
                </div>
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
            ) : isAdmin ? (
              <AdminNav onLogout={handleLogout} initials={initials} />
            ) : (
              <UserNav onLogout={handleLogout} initials={initials} />
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
