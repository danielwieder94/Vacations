import React, { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import axios from "axios";
import { downloadVacations } from "../../Redux/VacationReducer";
import SingleVacation from "./SingleVacation/SingleVacation";
import { Grid, Pagination } from "@mui/material";
import { vacationlyStore } from "../../Redux/VacationlyStore";

function VacationList(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const vacations = vacationlyStore.getState().vacations.vacations;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(vacations.length / itemsPerPage);
  const isAdmin = vacationlyStore.getState().users.user[0].isAdmin;

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
  }, [vacations.length]);

  const handlePageChange = (event: ChangeEvent<any>, page: number) => {
    setCurrentPage(page);
  };
  const getPageVacations = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return vacations.slice(start, end);
  };

  if (vacationlyStore.getState().vacations.vacations.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="VacationList">
      <Grid container spacing={3} margin={"auto"}>
        {getPageVacations().map((item) => {
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
                isAdmin={isAdmin}
              />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        className="pagination"
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}
export default VacationList;
