import React, { useEffect, useState } from "react";
import "./VacationList.css";
import { vacationlyStore } from "../../Redux/VacationlyStore";
import axios from "axios";
import {
  VacationActionType,
  downloadVacations,
} from "../../Redux/VacationReducer";
import SingleVacation from "./SingleVacation/SingleVacation";
import { Grid } from "@mui/material";
import Vacation from "../../../Model/Vacation";
import { Provider, useDispatch, useSelector } from "react-redux";

function VacationList(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const vacations = useSelector(
    (state: { vacations: Vacation[] }) => state.vacations
  );

  useEffect(() => {
    //use redux
    if (vacations.length !== 0) {
      axios
        .get("http://localhost:4000/api/v1/vacations/list")
        .then((response) => {
          dispatch({
            type: VacationActionType.downloadVacations,
            payload: response.data,
          });
          console.log("Dispatched action:", {
            type: downloadVacations,
            payload: response.data,
          });
        });
      // setRefresh(false);
    }
  }, [dispatch, vacations.length]);
  return (
    <div className="VacationList">
      <Grid container spacing={2}>
        {vacationlyStore.getState().vacations.vacations.map((item) => (
          <Grid item xs={12} sm={6} md={4}>
            TESTING
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default VacationList;
