import React from "react";
import "./UserNav.css";
import { useNavigate } from "react-router-dom";
import { vacationlyStore } from "../../Redux/VacationlyStore";
import { Avatar, Box, Button, Stack } from "@mui/material";

interface UserNavProps {
  onLogout: () => void;
}

function UserNav({ onLogout }: UserNavProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div
      className="UserNav"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
      }}
    >
      <Stack direction="row" spacing={2} style={{ flexGrow: 1 }}>
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
        <Avatar sx={{ width: 32, height: 32 }}>Test</Avatar>
        <Button
          size="large"
          sx={{ height: "2rem" }}
          color="inherit"
          onClick={onLogout}
        >
          Logout
        </Button>
      </Stack>
    </div>
  );
}

export default UserNav;
