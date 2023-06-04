"use client";

import citiesJSON from "../../il-ilce-semt-mahalleler/data/data.json";
import { TextField, Autocomplete } from "@mui/material";

interface AddressDistrictProps {
  city: string;
  town: string;
  value: string;
  onChange: (value: string) => void;
}

const getByTown = (city: string, town: string) => {
  const towns = citiesJSON.find((item) => item.name === city);
  return towns?.towns.find((item) => item.name === town);
};

const AddressDistrict: React.FC<AddressDistrictProps> = ({
  city,
  town,
  value,
  onChange,
}) => {
  const districtArrays = getByTown(city, town);

  const districts = districtArrays
    ? districtArrays.districts.map((district) => district.name)
    : [""];

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue || "");
        }}
        options={districts}
        renderInput={(params) => (
          <TextField {...params} label="Semt" variant="outlined" fullWidth />
        )}
      />
    </div>
  );
};

export default AddressDistrict;
