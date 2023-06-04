"use client";

import { TextField, Autocomplete } from "@mui/material";

interface CarModelProps {
  value: string;
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

const CarCategory: React.FC<CarModelProps> = ({ value, onChange }) => {
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue || "");
        }}
        options={bodyStyles}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Kategori"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
};

export default CarCategory;
