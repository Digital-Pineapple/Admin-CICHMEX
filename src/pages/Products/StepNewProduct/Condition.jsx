import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../../../hooks/useProducts";

const Condition = ({ handleNext, handleBack, index, isLastStep }) => {
  const { dataProduct, dataStep2 } = useProducts();

  // Función para establecer los valores por defecto del formulario
  const DefaultValues = (data) => {
    return {
      condition: data?.condition || "", // Si no hay datos, el valor por defecto es una cadena vacía
    };
  };

  // Configuración del formulario utilizando react-hook-form
  const {
    handleSubmit, // Maneja el envío del formulario
    control, // Controlador para los campos del formulario
    formState: { errors }, // Estado de los errores del formulario
  } = useForm({
    defaultValues: DefaultValues(dataProduct), // Establece los valores por defecto
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    dataStep2(dataProduct._id, data, handleNext); // Actualiza los datos del producto y avanza al siguiente paso
  };

  return (
    <Card
      component={"form"}
      onSubmit={handleSubmit(onSubmit)} // Asocia el envío del formulario con la función onSubmit
      variant="elevation"
    >
      {/* Encabezado de la tarjeta */}
      <CardHeader
        title="Condición"
        subheader="Indica el estado en que se encuentra el producto."
      />
      <CardContent>
        {/* Controlador para el campo "condition" */}
        <Controller
          control={control}
          name="condition" // Nombre del campo
          rules={{
            required: { value: true, message: "Campo obligatorio*" }, // Validación: campo obligatorio
          }}
          render={({ field }) => (
            <FormControl error={!!errors.condition}>
              <FormLabel id="condition-form">
                Indica el estado del producto.
              </FormLabel>
              <RadioGroup
                {...field}
                name="condition"
                aria-labelledby="condition-form"
                onChange={(e) => {
                  field.onChange(e.target.value); // Actualiza el valor del campo al cambiar la selección
                }}
              >
                {/* Opciones del campo "condition" */}
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="Nuevo"
                />
                <FormControlLabel
                  value="used"
                  control={<Radio />}
                  label="Usado"
                />
              </RadioGroup>
              {/* Mensaje de error si el campo no es válido */}
              <FormHelperText>{errors.condition?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </CardContent>
      <CardActions>
        {/* Botón para retroceder al paso anterior */}
        <Button
          disabled={index === 0} // Deshabilitado si es el primer paso
          onClick={handleBack}
          sx={{ mt: 1, mr: 1 }}
        >
          Cancelar
        </Button>
        {/* Botón para enviar el formulario */}
        <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
          {isLastStep ? "Guardar" : "Continuar"} {/* Cambia el texto según si es el último paso */}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Condition;
