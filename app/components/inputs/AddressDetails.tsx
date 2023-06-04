import React from "react";
import TextField from "@mui/material/TextField";

interface AddressDetailsProps {
  value: string;
  onChange: (value: string) => void;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ value, onChange }) => {
  return (
    <div>
      <TextField
        label="Sokak/ Apartman/ Daire"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default AddressDetails;
