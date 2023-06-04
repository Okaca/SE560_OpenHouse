"use client";

import citiesJSON from "../../il-ilce-semt-mahalleler/data/data.json";
import { TextField, Autocomplete } from "@mui/material";

interface AddressCityProps {
  value: string;
  onChange: (value: string) => void;
}

const AddressCity: React.FC<AddressCityProps> = ({ value, onChange }) => {
  const cities = citiesJSON.map((city) => city.name);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue || "");
        }}
        options={cities}
        renderInput={(params) => (
          <TextField {...params} label="Şehir" variant="outlined" fullWidth />
        )}
      />
    </div>
  );
};

export default AddressCity;
