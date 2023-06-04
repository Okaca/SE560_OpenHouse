"use client";

import { TextField, Autocomplete } from "@mui/material";
import carsJSON from "../../CarCompaniesWithModels/companyWithModel.json";

interface CarModelProps {
  make: string;
  model: string;
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

const CarModel: React.FC<CarModelProps> = ({ make, model, onChange }) => {
  const carModel = make
    ? carsJSON.find((item) => item.company === make).model
    : [""];

  return (
    <div>
      <Autocomplete
        value={model}
        onChange={(event, newValue) => {
          onChange(newValue || "");
        }}
        options={carModel}
        renderInput={(params) => (
          <TextField {...params} label="Model" variant="outlined" fullWidth />
        )}
      />
    </div>
  );
};

export default CarModel;
