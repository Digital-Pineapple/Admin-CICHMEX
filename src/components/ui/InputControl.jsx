import { CircularProgress, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InputControl = ({
  name,
  control,
  rules = {},
  label,
  errors,
  multiline = false,
  rows = 1,
  disabled = false,
  loading = false,
  onChange = () => null,
  fullWidth = true,
  placeholder = "",
  type="text",
  startAdornment
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          label={label}
          type={type}
          fullWidth={fullWidth}
          variant="outlined"
          inputRef={field.ref}
          value={field.value || ""}
          onChange={(e) => {
            field.onChange(e.target.value)
            onChange(e)
          }}
          error={!!errors[name]}
          helperText={errors[name] && errors[name].message}
          autoComplete="off"
          multiline={multiline}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          InputProps={{
            endAdornment: loading && (
              <CircularProgress color="inherit" size={20} />
            ),
            startAdornment: startAdornment
          }}
        />
      )}
    />
  );
};

export default InputControl;
