import React, { useEffect, useState } from "react";
import "./Filters.css";
import { Chip } from "@mui/material";
import Vacation from "../../../Model/Vacation";
import dayjs from "dayjs";
import { type } from "os";

interface Filter {
  label: string;
  value: string;
}

interface FiltersProps {
  filters: Filter[];
  onFilterChange: (filteredVacations: Vacation[]) => void;
  vacations: Vacation[];
}

function Filters({
  filters,
  onFilterChange,
  vacations,
}: FiltersProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);
  // const [filtered, setFiltered] = useState<Vacation[]>([]);
  const today = dayjs().startOf("day").toDate();

  useEffect(() => {
    filterVacations(selected);
  }, [selected]);

  const handleFilter = (filter: string) => {
    const updatedFilters = [...selected];
    if (updatedFilters.includes(filter)) {
      updatedFilters.splice(updatedFilters.indexOf(filter), 1);
    } else {
      updatedFilters.push(filter);
    }
    setSelected(updatedFilters);
  };

  const filterVacations = (selectedFilters: string[]) => {
    let filteredVacations: Vacation[] = [...vacations]; // Copy the vacations array

    if (selectedFilters.length > 0) {
      filteredVacations = filteredVacations.filter((vacation) => {
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);

        return selectedFilters.some((filter) => {
          switch (filter) {
            case "ongoing":
              return startDate <= today && endDate >= today;
            case "upcoming":
              return startDate > today;
            default:
              return false;
          }
        });
      });
    } else {
      filteredVacations = vacations;
    }
    console.log("filteredVacations IN FILTERS.TSX: ", filteredVacations);
    onFilterChange(filteredVacations);
  };

  return (
    <div className="Filters">
      <div className="FilterOptions">
        {filters.map((filter) => {
          return (
            <Chip
              key={filter.value}
              label={filter.label}
              variant={selected.includes(filter.value) ? "filled" : "outlined"}
              onClick={() => handleFilter(filter.value)}
              color="primary"
              sx={{ m: 1 }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Filters;
