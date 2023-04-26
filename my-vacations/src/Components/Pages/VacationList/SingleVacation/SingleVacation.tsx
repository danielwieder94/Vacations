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
  name: string;
  description: string;
  price: number;
  image: string;
}

function SingleVacation(props: cardProps): JSX.Element {
  return (
    <div className="SingleVacation">
      <Card>
        <CardHeader>{props.name}</CardHeader>
        <CardMedia component="img" image={props.image} alt={props.name} />
        <CardContent>
          <Typography>{props.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingleVacation;
