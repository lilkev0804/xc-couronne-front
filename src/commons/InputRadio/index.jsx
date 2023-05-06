import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function InputRadio({ label, value, onChange, data }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (event) => {
    onChange(event.target.value);
    setLocalValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{label} : </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={localValue}
        onChange={handleChange}
      >
        {data?.map((el, i) => (
          <FormControlLabel
            key={i}
            value={el.value}
            control={<Radio />}
            label={el.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
