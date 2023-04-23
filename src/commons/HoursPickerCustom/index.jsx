import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

export default function HoursPickerCustom({
  label,
  value,
  onChange,
  fullWidth,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        fullWidth={fullWidth}
        value={value}
        onChange={onChange}
        label={label}
        format="HH:mm"
      />
    </LocalizationProvider>
  );
}
