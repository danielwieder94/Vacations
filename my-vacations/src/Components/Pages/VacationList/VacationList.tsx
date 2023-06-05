import React, { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import axios from "axios";
import { downloadVacations } from "../../Redux/VacationReducer";
import SingleVacation from "./SingleVacation/SingleVacation";
import { Backdrop, CircularProgress, Grid, Pagination } from "@mui/material";
import { vacationlyStore } from "../../Redux/VacationlyStore";
import Filters from "../../Features/Filters/Filters";
import Vacation from "../../../Model/Vacation";

function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <Backdrop open={isLoading} style={{ zIndex: 1000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

function VacationList(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const vacations = vacationlyStore.getState().vacations.vacations;
  const [filteredVacations, setFilteredVacations] =
    useState<Vacation[]>(vacations);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(vacations.length / itemsPerPage);
  const isAdmin = vacationlyStore.getState().users.user[0].isAdmin;

  useEffect(() => {
    if (vacations.length < 1) {
      console.log("loading vacations... getting data from backend");
      setLoading(true);
      axios
        .get("http://localhost:4000/api/v1/vacations/list")
        .then((response) => {
          vacationlyStore.dispatch(downloadVacations(response.data));
          setRefresh(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [vacations.length, setRefresh]);

  const handlePageChange = (event: ChangeEvent<any>, page: number) => {
    setCurrentPage(page);
  };
  const getPageVacations = () => {
    console.log("filteredVacations in VACATIONLIST: ", filteredVacations);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredVacations.slice(start, end);
  };

  const handleFilters = (filteredVacations: Vacation[]) => {
    setFilteredVacations(filteredVacations);
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingOverlay isLoading={loading} />;
  }

  return (
    <div className="VacationList">
      <div className="vacFilters">
        <Filters
          filters={[
            { label: "Liked Vacations", value: "liked" },
            { label: "Ongoing Vacations", value: "ongoing" },
            { label: "Upcoming Vacations", value: "upcoming" },
          ]}
          onFilterChange={handleFilters}
          vacations={vacations}
        />
      </div>
      <Grid container spacing={3} margin={"auto"}>
        {getPageVacations().map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <SingleVacation
                id={item.id!}
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
