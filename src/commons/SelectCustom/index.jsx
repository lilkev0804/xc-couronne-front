import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function SelectCustom({ label, value, onChange, data, width }) {
  return (
    <FormControl sx={{ width: width }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        value={value}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {data?.map((el, i) => (
          <MenuItem key={i} value={el?.value}>
            {el?.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
