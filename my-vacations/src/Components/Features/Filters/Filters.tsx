import React, { useState } from "react";
import "./Filters.css";
import { Chip } from "@mui/material";
import Vacation from "../../../Model/Vacation";

interface Filter {
  label: string;
  value: string;
}

interface FiltersProps {
  filters: Filter[];
  onFilterChange: (filteredVacations: Vacation[]) => void;
  vacations: Vacation[];
}

function Filters({ filters, onFilterChange }: FiltersProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);
  const handleFilter = (filter: string) => {
    const updatedFilters = [...selected];
    if (updatedFilters.includes(filter)) {
      updatedFilters.splice(updatedFilters.indexOf(filter), 1);
    } else {
      updatedFilters.push(filter);
    }
    setSelected(updatedFilters);
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
