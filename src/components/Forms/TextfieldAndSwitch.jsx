import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import * as Yup from "yup";

const TextfieldAndSwitch = ({ item, setValues, values }) => {
  // Configuración de Formik para manejar el estado del formulario y la validación
  const formik = useFormik({
    initialValues: {
      switchValue: false, // Estado inicial del switch
      textFieldValue: "", // Valor inicial del campo de texto
      error: true, // Estado inicial del error
    },
    // Validación del campo de texto usando Yup
    validationSchema: Yup.object().shape({
      textFieldValue: Yup.number()
        .typeError("Debe ser un número") // Validación de tipo
        .positive("Debe ser un número positivo") // Validación de número positivo
        .required("Campo requerido") // Validación de campo obligatorio
        .min(50, "Debe ser mayor a 50"), // Validación de valor mínimo
        // .max(500, "Debe ser menor a 500"), // Validación de valor máximo (comentada)
    }),
  });

  // Maneja el cambio de estado del switch
  const handleSwitchChange = () => {
    const updatedSwitchValue = !formik.values.switchValue; // Invierte el estado del switch
    if (updatedSwitchValue && formik.values.textFieldValue !== "") {
      // Si el switch se activa y el campo de texto tiene un valor
      const newValueItem = {
        id: item._id, // ID del elemento
        name: item.name, // Nombre del elemento
        price: formik.values.textFieldValue, // Precio ingresado en el campo de texto
      };
      setValues([...values, newValueItem]); // Agrega el nuevo valor al estado de valores
      formik.setValues({
        ...formik.values,
        switchValue: formik.errors.textFieldValue ? false : true, // Actualiza el estado del switch según los errores
      });
    } else {
      // Si el switch se desactiva
      const newValues = values.filter((value) => value.id !== item._id); // Filtra los valores para eliminar el actual
      setValues(newValues); // Actualiza el estado de valores
      formik.setValues({
        ...formik.values,
        switchValue: false, // Desactiva el switch
      });
    }
  };

  return (
    <div>
      {/* Etiqueta de control para el switch y el campo de texto */}
      <FormControlLabel
        control={
          <>
            {/* Componente Switch para activar/desactivar */}
            <Switch
              id={item._id} // ID único del switch
              checked={formik.values.switchValue} // Estado del switch
              onChange={handleSwitchChange} // Maneja el cambio de estado
              value={item.id} // Valor del switch
              item={item} // Propiedad del elemento
              name={item.id} // Nombre del switch
            />
            {/* Componente TextField para ingresar el precio */}
            <TextField
              sx={{ m: 1, width: "25ch" }} // Estilos del campo de texto
              id={item._id} // ID único del campo de texto
              type="number" // Tipo de entrada: número
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment> // Adorno para mostrar el símbolo de dólar
                ),
              }}
              value={formik.values.textFieldValue} // Valor del campo de texto
              onChange={formik.handleChange("textFieldValue")} // Maneja el cambio de valor
              onBlur={formik.handleBlur} // Maneja el evento blur
              disabled={formik.values.switchValue} // Desactiva el campo si el switch está activado
              name={`price.textFieldValue`} // Nombre del campo de texto
              label="Precio del servicio" // Etiqueta del campo
              variant="standard" // Variante del diseño del campo
              error={formik.errors.textFieldValue ? true : false} // Muestra error si existe
              helperText={
                formik.errors.textFieldValue && formik.errors.textFieldValue
                  ? formik.errors.textFieldValue // Muestra el mensaje de error
                  : null
              }
            />
          </>
        }
        label={item.name} // Etiqueta del control (nombre del servicio)
      ></FormControlLabel>
    </div>
  );
};

export default TextfieldAndSwitch;
