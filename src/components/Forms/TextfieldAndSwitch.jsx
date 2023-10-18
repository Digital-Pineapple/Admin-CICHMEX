import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import * as Yup from "yup";

const TextfieldAndSwitch = ({ item, setValues, values }) => {
  const [switchValue, setSwitchValue] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState([]);

  const handleSwitchChange = () => {
    const updatedSwitchValue = !switchValue;
    
    if (updatedSwitchValue) {
      const newValueItem = {
        id: item._id,
        name: item.name,
        price: textFieldValue,
      };
      setValues([...values, newValueItem]);
    } else {
      const newValues = values.filter((value) => value.id !== item._id);
      setValues(newValues);
    }

    setSwitchValue(updatedSwitchValue);
  };
  const handleTextFieldChange = (e) => {
    const newValue = e.target.value;
    setTextFieldValue(newValue);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <>
            <Switch
              id={item._id}
              checked={switchValue}
              onChange={handleSwitchChange}
              value={item.id}
              item={item}
              name={item.id}
            />
            <TextField
              sx={{ m: 1, width: "25ch" }}
              id={item._id}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={textFieldValue}
              onChange={handleTextFieldChange}
              disabled={switchValue}
              label="Precio del servicio"
              variant="standard"
            />
          </>
        }
        label={item.name}
      ></FormControlLabel>
    </div>
  );
};

export default TextfieldAndSwitch;
