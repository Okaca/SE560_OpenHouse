"use client";

import citiesJSON from "../../il-ilce-semt-mahalleler/data/data.json";
import { TextField, Autocomplete } from "@mui/material";

interface AddressNeighborhoodProps {
  city: string;
  town: string;
  district: string;
  value: string;
  onChange: (value: string) => void;
}

const getByDistrict = (city: string, town: string, district: string) => {
  const towns = citiesJSON.find((item) => item.name === city);
  const ditricts = towns?.towns.find((item) => item.name === town);
  return ditricts?.districts.find((item) => item.name === district);
};

const AddressNeighborhood: React.FC<AddressNeighborhoodProps> = ({
  city,
  town,
  district,
  value,
  onChange,
}) => {
  const neighborhoodArrays = getByDistrict(city, town, district);

  const neighborhood = neighborhoodArrays
    ? neighborhoodArrays.quarters.map((neighborhood) => neighborhood.name)
    : [""];

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue || "");
        }}
        options={neighborhood}
        renderInput={(params) => (
          <TextField {...params} label="Mahalle" variant="outlined" fullWidth />
        )}
      />
    </div>
  );
};

export default AddressNeighborhood;
