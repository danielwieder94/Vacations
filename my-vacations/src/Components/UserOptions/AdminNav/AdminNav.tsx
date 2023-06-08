import React from "react";
import "./AdminNav.css";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Avatar, Box, Typography } from "@mui/material";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AdminNavProps {
  onLogout: () => void;
  initials: string;
}

function AdminNav({ onLogout, initials }: AdminNavProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="AdminNav">
      <div className="logo">
        <FontAwesomeIcon
          icon={faPlaneDeparture}
          size="xl"
          style={{ color: "#ffffff", marginRight: "5px" }}
        />

        <Typography variant="h4" component="div">
          Vacationly
        </Typography>
      </div>

      <div className="middle">
        <Button
          size="large"
          color="inherit"
          onClick={() => {
            navigate("/addVacation");
          }}
        >
          Add Vacation
        </Button>
        <Button
          size="large"
          color="inherit"
          onClick={() => navigate("/vacationList")}
        >
          Explore
        </Button>

        <Button size="large" color="inherit">
          Reports
        </Button>
      </div>

      <div className="right">
        <Avatar sx={{ width: 40, height: 40 }}>{initials}</Avatar>
        <Button
          size="large"
          sx={{ height: "2rem" }}
          color="inherit"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default AdminNav;