import React from "react";
import {
  AppBar,
  Button,
  IconButton,
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

function Header(): JSX.Element {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <AppBar
          color="primary"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Toolbar style={{ flexGrow: 1 }}>
            <FontAwesomeIcon
              icon={faPlaneDeparture}
              size="xl"
              style={{ color: "#ffffff", marginRight: "5px" }}
            />
            <Typography variant="h4" component="div">
              Vacationly
            </Typography>
            <Stack direction="row" spacing={2} margin="auto">
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
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Header;
