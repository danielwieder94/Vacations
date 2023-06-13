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
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const loggedIn = userLoggedIn();
  const isAdmin = userIsAdmin();

  useEffect(() => {
    if (loggedIn) {
      const user = vacationlyStore.getState().users.user[0];
      const initials =
        user.firstName.charAt(0).toUpperCase() +
        user.lastName.charAt(0).toUpperCase();
      setName(user.firstName + " " + user.lastName);
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
                    variant="outlined"
                    size="medium"
                    sx={{ height: "2rem" }}
                    color="secondary"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{ height: "2rem" }}
                    color="secondary"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </Stack>
              </>
            ) : isAdmin ? (
              <AdminNav
                onLogout={handleLogout}
                initials={initials}
                name={name}
              />
            ) : (
              <UserNav
                onLogout={handleLogout}
                initials={initials}
                name={name}
              />
            )}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Header;
