"use client";

import { TextField, Autocomplete } from "@mui/material";
import carsJSON from "../../CarCompaniesWithModels/companyWithModel.json";

interface CarMakeProps {
  make: string;
  onChange: (value: any) => void;
}

const bodyStyles = [
  "Convertible",
  "Coupe",
  "Hatchback",
  "Pickup",
  "SUV",
  "Sedan",
  "Van/Minivan",
  "Wagon",
];

const CarMake: React.FC<CarMakeProps> = ({ make, onChange }) => {
  const carMakes = carsJSON.map((item) => item.company);

  return (
    <div>
      <Autocomplete
        value={make}
        onChange={(event, newValue) => {
          onChange(newValue || "");
        }}
        options={carMakes}
        renderInput={(params) => (
          <TextField {...params} label="Marka" variant="outlined" fullWidth />
        )}
      />
    </div>
  );
};

export default CarMake;
