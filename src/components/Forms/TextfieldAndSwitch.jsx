import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import * as Yup from "yup";

const TextfieldAndSwitch = ({ item, setValues, values }) => {
  const formik = useFormik({
    initialValues: {
      switchValue: false,
      textFieldValue: "",
      error: true,
    },
    validationSchema: Yup.object().shape({
      textFieldValue: Yup.number()
        .typeError("Debe ser un número")
        .positive("Debe ser un número positivo")
        .required("Campo requerido")
        .min(50, "Debe ser mayor a 50")
        // .max(500, "Debe ser menor a 500"),
    }),
  });

  const handleSwitchChange = () => {
    const updatedSwitchValue = !formik.values.switchValue;
    if (updatedSwitchValue && formik.values.textFieldValue !== "") {
      const newValueItem = {
        id: item._id,
        name: item.name,
        price: formik.values.textFieldValue,
      };
      setValues([...values, newValueItem]);
      formik.setValues({
        ...formik.values,
        switchValue: formik.errors.textFieldValue ? false : true,
      });
    } else {
      const newValues = values.filter((value) => value.id !== item._id);
      setValues(newValues);
      formik.setValues({
        ...formik.values,
        switchValue: false,
      });
    }
  };

  return (
    <div>
      <FormControlLabel
        control={
          <>
            <Switch
              id={item._id}
              checked={formik.values.switchValue}
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
              value={formik.values.textFieldValue}
              onChange={formik.handleChange("textFieldValue")}
              onBlur={formik.handleBlur}
              disabled={formik.values.switchValue}
              name={`price.textFieldValue`}
              label="Precio del servicio"
              variant="standard"
              error={
                 formik.errors.textFieldValue
                  ? true
                  : false
              }
              helperText={
                formik.errors.textFieldValue && formik.errors.textFieldValue
                  ? formik.errors.textFieldValue
                  : null
              }
            />
          </>
        }
        label={item.name}
      ></FormControlLabel>
    </div>
  );
};

export default TextfieldAndSwitch;
