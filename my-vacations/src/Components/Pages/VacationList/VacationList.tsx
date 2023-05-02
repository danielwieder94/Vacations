import React, { useEffect, useState } from "react";
import "./VacationList.css";
import axios from "axios";
import {
  VacationActionType,
  downloadVacations,
} from "../../Redux/VacationReducer";
import SingleVacation from "./SingleVacation/SingleVacation";
import { Grid } from "@mui/material";
import Vacation from "../../../Model/Vacation";
import { useDispatch, useSelector } from "react-redux";

function VacationList(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const vacations = useSelector(
    (state: { vacations: { vacations: Vacation[] } }) =>
      state.vacations.vacations
  );
  console.log("VacationList vacations: ", vacations);
  // console.log("Vacations: ", vacations);
  useEffect(() => {
    //use redux
    axios
      .get("http://localhost:4000/api/v1/vacations/list")
      .then((response) => {
        dispatch({
          type: VacationActionType.downloadVacations,
          payload: response.data,
        });
      });
  }, [dispatch]);
  return (
    <div className="VacationList">
      <Grid container spacing={2}>
        {vacations.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <SingleVacation
              id={item.id}
              destination={item.destination}
              vacDesc={item.vacDesc}
              vacImg={item.vacImg}
              vacPrice={item.vacPrice}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default VacationList;
