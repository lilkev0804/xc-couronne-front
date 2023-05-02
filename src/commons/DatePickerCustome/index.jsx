import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField, DatePicker, frFR } from "@mui/x-date-pickers";
import { fr } from "date-fns/locale/fr";

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
      <LocalizationProvider localeText={fr} dateAdapter={AdapterDayjs}>
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
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={frFR}>
      <DateField
        format="DD-MM-YYYY"
        fullWidth
        onChange={onChange}
        value={value}
        label={label}
        adapterLocale={frFR}
      />
    </LocalizationProvider>
  );
}
