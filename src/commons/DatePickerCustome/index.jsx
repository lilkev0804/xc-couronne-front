import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField, DatePicker } from "@mui/x-date-pickers";

export default function DatePickerCustom({
  label,
  onChange,
  value,
  fullWidth,
  classic = false,
  minDate,
}) {
  if (classic) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          minDate={minDate}
          format="DD-MM-YYYY"
          fullWidth
          onChange={onChange}
          value={value}
          label={label}
        />
      </LocalizationProvider>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        format="DD-MM-YYYY"
        fullWidth
        onChange={onChange}
        value={value}
        label={label}
      />
    </LocalizationProvider>
  );
}
