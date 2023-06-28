import React, { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import axios from "axios";
import { deleteVacation, downloadVacations } from "../../Redux/VacationReducer";
import SingleVacation from "./SingleVacation/SingleVacation";
import { Backdrop, CircularProgress, Grid, Pagination } from "@mui/material";
import { vacationlyStore } from "../../Redux/VacationlyStore";
import Filters from "../../Features/Filters/Filters";
import Vacation from "../../../Model/Vacation";
import SearchBar from "../../Features/SearchBar/SearchBar";
import { userIsAdmin } from "../../../Utils/authUtils";
import { useSelector } from "react-redux";

function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <Backdrop open={isLoading} style={{ zIndex: 1000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

function VacationList(): JSX.Element {
  const vacations = vacationlyStore.getState().vacations.vacations;
  // const userVacations = vacationlyStore.getState().users.user[0].likedVacations;
  const userVacations = useSelector(
    (state: any) => state.users.user[0]?.likedVacations || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filteredVacations, setFilteredVacations] =
    useState<Vacation[]>(vacations);
  const itemsPerPage = 9;
  // const totalPages = Math.ceil(vacations.length / itemsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const isAdmin = userIsAdmin();

  useEffect(() => {
    if (vacations.length < 1) {
      axios
        .get("https://vacationly-api.onrender.com/api/v1/vacations/list")
        .then((response) => {
          vacationlyStore.dispatch(downloadVacations(response.data));
          setRefresh(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setFilteredVacations(vacations);
      setTotalPages(Math.ceil(vacations.length / itemsPerPage));
    }
  }, [vacations.length, setRefresh, vacations]);

  const deleteVac = async (vacationId: number) => {
    await axios.delete(
      `https://vacationly-api.onrender.com/api/v1/vacations/delete/${vacationId}`
    );
    vacationlyStore.dispatch(deleteVacation(vacationId));

    const updatedVacations = filteredVacations.filter(
      (vacation) => vacation.id !== vacationId
    );
    setFilteredVacations(updatedVacations);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const results = vacations.filter((vacation) =>
      vacation.destination.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVacations(results);
    setTotalPages(Math.ceil(results.length / itemsPerPage));
  };

  const handlePageChange = (event: ChangeEvent<any>, page: number) => {
    setCurrentPage(page);
  };
  const getPageVacations = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredVacations.slice(start, end);
  };

  const handleFilters = (filteredVacations: Vacation[]) => {
    setFilteredVacations(filteredVacations);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredVacations.length / itemsPerPage));
  };

  if (loading) {
    return <LoadingOverlay isLoading={loading} />;
  }

  return (
    <div className="VacationList">
      <div className="container">
        <div className="vacFilters">
          <Filters
            filters={[
              ...(isAdmin
                ? []
                : [{ label: "Liked Vacations", value: "liked" }]),
              { label: "Ongoing Vacations", value: "ongoing" },
              { label: "Upcoming Vacations", value: "upcoming" },
            ]}
            onFilterChange={handleFilters}
            vacations={vacations}
            likedVacations={userVacations}
          />
        </div>
        <div className="vacSearch">
          <SearchBar query={searchQuery} onQueryChange={handleSearch} />
        </div>
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
                likes={item.likes || 0}
                onDelete={() => deleteVac(item.id!)}
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
