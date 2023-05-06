import React, { useEffect, useState } from "react";
import "./VacationList.css";
import axios from "axios";
import { downloadVacations } from "../../Redux/VacationReducer";
import SingleVacation from "./SingleVacation/SingleVacation";
import { Grid } from "@mui/material";
import { vacationlyStore } from "../../Redux/VacationlyStore";

function VacationList(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const vacations = vacationlyStore.getState().vacations.vacations;

  useEffect(() => {
    if (vacations.length < 1) {
      console.log("loading vacations... getting data from backend");
      axios
        .get("http://localhost:4000/api/v1/vacations/list")
        .then((response) => {
          vacationlyStore.dispatch(downloadVacations(response.data));
          setRefresh(true);
        });
    }
  }, [vacations]);

  if (vacationlyStore.getState().vacations.vacations.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="VacationList">
      <Grid container spacing={1} m={"0 auto"}>
        {vacationlyStore.getState().vacations.vacations.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <SingleVacation
                id={item.id}
                destination={item.destination}
                startDate={item.startDate}
                endDate={item.endDate}
                vacDesc={item.vacDesc}
                vacImg={item.vacImg}
                vacPrice={item.vacPrice}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
export default VacationList;
