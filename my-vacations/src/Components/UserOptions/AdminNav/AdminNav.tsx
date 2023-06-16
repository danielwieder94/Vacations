import React from "react";
import "./AdminNav.css";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Typography } from "@mui/material";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AdminNavProps {
  onLogout: () => void;
  initials: string;
  name: string;
}

function AdminNav({ onLogout, initials, name }: AdminNavProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="AdminNav">
      <div
        className="logo-admin"
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

      <div className="middle-admin">
        <Button
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={() => {
            navigate("/addVacation");
          }}
        >
          Add Vacation
        </Button>
        <Button
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={() => navigate("/vacationList")}
        >
          Explore
        </Button>

        <Button
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={() => {
            navigate("/reports");
          }}
        >
          Reports
        </Button>
      </div>

      <div className="right-admin">
        <Avatar sx={{ width: 40, height: 40 }}>{initials}</Avatar>
        <Typography>{name}</Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ height: "2rem" }}
          color="warning"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default AdminNav;
