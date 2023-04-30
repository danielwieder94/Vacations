import React from "react";
import "./SingleVacation.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

interface cardProps {
  id?: number;
  destination: string;
  vacDesc: string;
  vacPrice: number;
  vacImg: string;
}

function SingleVacation(props: cardProps): JSX.Element {
  return (
    <div className="SingleVacation">
      <Card>
        <CardHeader>{props.destination}</CardHeader>
        <CardMedia
          component="img"
          image={`http://localhost:4000/backend/Images/${props.id}_${props.vacImg}`}
          alt={props.destination}
        />
        <CardContent>
          <Typography>{props.vacDesc}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingleVacation;
