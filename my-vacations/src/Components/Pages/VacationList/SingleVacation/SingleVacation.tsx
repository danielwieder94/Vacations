import React from "react";
import "./SingleVacation.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";

interface singleVacationProps {
  id?: number;
  destination: string;
  vacDesc: string;
  vacPrice: number;
  vacImg: string;
}

function SingleVacation(props: singleVacationProps): JSX.Element {
  const imageUrl = `http://localhost:4000/${props.id}_${props.vacImg}`;

  return (
    <div className="SingleVacation">
      <Card sx={{ width: "90%" }}>
        <CardHeader>{props.destination}</CardHeader>
        <CardMedia
          sx={{ height: 300 }}
          component="img"
          src={imageUrl}
          alt={`${props.destination}`}
        />
        <CardContent>
          <Typography>{props.vacDesc}</Typography>
          <Typography>{props.vacPrice}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingleVacation;
