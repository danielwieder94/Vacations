import React from "react";
import "./UserNav.css";
import { useNavigate } from "react-router-dom";

import { Avatar, Button, Typography } from "@mui/material";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../Layout/Theme/Theme";

interface UserNavProps {
  onLogout: () => void;
  initials: string;
  name: string;
}

function UserNav({ onLogout, initials, name }: UserNavProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="UserNav">
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
      <div className="middle">
        <Button
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={() => navigate("/vacationList")}
        >
          Explore
        </Button>
      </div>
      <div className="right">
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

export default UserNav;
