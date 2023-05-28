import React from "react";
import "./Page404.css";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Page404(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="Page404">
      <Typography sx={{ fontWeight: "bold" }} className="heading" variant="h3">
        Whoops..
      </Typography>
      <Typography
        sx={{ fontWeight: "normal" }}
        className="heading"
        variant="h2"
      >
        This page is probably on <strong>vacation..</strong>
      </Typography>
      <Button
        className="button"
        variant="contained"
        sx={{ backgroundColor: "#FFC857", color: "black" }}
        onClick={() => {
          navigate("/vacationList");
        }}
      >
        To your next vacation
      </Button>
    </div>
  );
}

export default Page404;
