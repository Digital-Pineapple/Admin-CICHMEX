import { TimePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import React from "react";
import { handleHoursChange } from "../../helpers/hoursDate";

const InputControlTimePicker = ({
    name,
    control,
    label,
    errors,
    rules = {},
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <TimePicker
            label={label}
            sx={{ width: "100%" }}
            onChange={(newValue) => {
              const formattedHour = handleHoursChange(newValue);
              field.onChange(
                formattedHour == "errorFormat" ? "" : formattedHour
              );
            }}            
          />
        </>
      )}
    />
  );
};

export default InputControlTimePicker;
