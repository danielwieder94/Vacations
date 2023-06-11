import React from "react";
import Icons from "../../../UserOptions/Icons/Icons";
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
import { vacationlyStore } from "../../../Redux/VacationlyStore";
import { deleteVacation } from "../../../Redux/VacationReducer";

interface singleVacationProps {
  id: number;
  destination: string;
  startDate: Date;
  endDate: Date;
  vacDesc: string;
  vacPrice: number;
  vacImg: string;
  isAdmin: boolean;
  likes: number;
}

const formatDate = (date: Date): string => {
  const formattedDate = new Date(date).toLocaleDateString();
  const [month, day, year] = formattedDate.split("/");
  return `${day}/${month}/${year}`;
};

function SingleVacation(props: singleVacationProps): JSX.Element {
  const deleteVac = () => {
    axios.delete(`http://localhost:4000/api/v1/vacations/delete/${props.id}`);
    console.log("delete icon is clicked...");
    vacationlyStore.dispatch(deleteVacation(props.id));
  };

  const imageUrl = `http://localhost:4000/${props.id}_${props.vacImg}`;

  return (
    <div className="SingleVacation">
      <Card
        raised
        sx={{ width: "90%", height: 500, mb: 2, borderRadius: "5%" }}
      >
        <div className="cardHeader">
          <CardHeader
            title={
              <div className="headerTitle">
                {props.destination}{" "}
                <Icons
                  vacationId={props.id}
                  onDelete={deleteVac}
                  isAdmin={props.isAdmin}
                  initialLikes={props.likes}
                />
              </div>
            }
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
          sx={{ height: 270, objectFit: "cover" }}
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
