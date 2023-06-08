"use client";

import citiesJSON from "../../il-ilce-semt-mahalleler/data/data.json";
import { TextField, Autocomplete } from "@mui/material";

interface AddressTownProps {
  city: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const getByCity = (value: string) => {
  return citiesJSON.find((item) => item.name === value);
};

const AddressTown: React.FC<AddressTownProps> = ({
  city,
  value,
  onChange,
  error,
}) => {
  const townArrays = getByCity(city);

  const towns = townArrays ? townArrays.towns.map((town) => town.name) : [""];

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue || "");
        }}
        options={towns}
        renderInput={(params) => (
          <TextField
            {...params}
            label="ilçe"
            variant="outlined"
            fullWidth
            error={error}
          />
        )}
      />
    </div>
  );
};

export default AddressTown;
