import { TextField } from "@mui/material";
import React from "react";

export default function InputText({
  placeHolder,
  value,
  onChange,
  label,
  type,
  fullWidth,
  helperText,
  error,
}) {
  return (
    <TextField
      helperText={helperText}
      id="outlined-basic"
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      label={label}
      variant="outlined"
      type={type}
      fullWidth={fullWidth}
      error={error}
    />
  );
}
