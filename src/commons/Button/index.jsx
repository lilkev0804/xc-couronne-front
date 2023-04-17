import { Button } from "@mui/material";
import React from "react";

export default function MyButton({ label, children, onClick, disabled }) {
  return (
    <Button onClick={onClick} variant="outlined" disabled={disabled}>
      {label || children}
    </Button>
  );
}
