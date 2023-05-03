import React from "react";
import "./SingleVacation.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import axios from "axios";

interface singleVacationProps {
  id?: number;
  destination: string;
  startDate: Date;
  endDate: Date;
  vacDesc: string;
  vacPrice: number;
  vacImg: string;
}

const formatDate = (date: Date): string => {
  const formattedDate = new Date(date).toLocaleDateString();
  const [month, day, year] = formattedDate.split("/");
  return `${day}/${month}/${year}`;
};

function SingleVacation(props: singleVacationProps): JSX.Element {
  const imageUrl = `http://localhost:4000/${props.id}_${props.vacImg}`;

  return (
    <div className="SingleVacation">
      <Card sx={{ width: "90%", height: 450, mb: 2 }}>
        <div className="cardHeader">
          <CardHeader
            title={props.destination}
            subheader={`${formatDate(props.startDate)} - ${formatDate(
              props.endDate
            )}`}
          />
          <Chip
            className="price"
            label={"$" + props.vacPrice}
            color="secondary"
          />
        </div>
        <CardMedia
          sx={{ height: 250 }}
          component="img"
          src={imageUrl}
          alt={`${props.destination}`}
        />
        <CardContent sx={{ overflow: "auto", height: 100 }}>
          <Typography className="description" color="text.secondary">
            {props.vacDesc}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingleVacation;
