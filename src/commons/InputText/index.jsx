import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& input": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
export default function InputText({
  placeHolder,
  value,
  onChange,
  label,
  type,
  fullWidth,
  helperText,
  error,
  shin,
}) {
  if (shin) {
    return (
      <CssTextField
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
