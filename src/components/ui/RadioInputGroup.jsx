import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormHelperText } from "@mui/material";

export default function RadioInputGroup({
  options,
  value,
  defaultValue = "",
  handleChange,
  errors
}) {
  return (
    <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label">Tipo</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        sx={{ display: "flex", flexDirection: "row" }}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          handleChange(e);
        }}
      >
        {options?.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText error>
        {errors["type"] && errors["type"].message}
      </FormHelperText>
    </FormControl>
  );
}
