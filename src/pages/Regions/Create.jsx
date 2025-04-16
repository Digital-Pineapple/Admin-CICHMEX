import { Grid, Typography, Card, CardContent, CardActions, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import RegionSelector from './RegionSelector';
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRegions } from "../../hooks/useRegions";

const Create = () => {
  // Estado para almacenar las coordenadas seleccionadas
  const [coordinates, setCoordinates] = useState([]);
  
  // Hook personalizado para manejar las regiones
  const { addNewRegion } = useRegions();

  // Efecto para actualizar los valores del formulario cuando cambian las coordenadas
  useEffect(() => {
    if (coordinates) {
      formik.setFieldValue('type', coordinates[0]?.type); // Actualiza el campo "type" con el tipo de coordenada
      formik.setFieldValue('path', coordinates[0]?.path); // Actualiza el campo "path" con la ruta de coordenadas
    }
  }, [coordinates]);

  // Esquema de validación para los campos del formulario
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"), // Valida que el nombre sea obligatorio
    regionCode: Yup.string().required("El campo es obligatorio"), // Valida que el código de la región sea obligatorio
    type: Yup.string().required("El campo es obligatorio"), // Valida que el tipo sea obligatorio
    path: Yup.array().min(1, 'Debe seleccionar al menos una región').required('El campo es obligatorio'), // Valida que se seleccione al menos una región
  });

  // Configuración del formulario con Formik
  const formik = useFormik({
    initialValues: {
      name: "", // Valor inicial del campo "name"
      regionCode: "", // Valor inicial del campo "regionCode"
      type: [], // Valor inicial del campo "type"
    },
    validationSchema, // Esquema de validación
    onSubmit: (values) => {
      addNewRegion(values); // Llama a la función para agregar una nueva región con los valores del formulario
    },
  });

  return (
    // Contenedor principal del formulario
    <Grid
      component="form"
      onSubmit={formik.handleSubmit} // Maneja el envío del formulario
      display={"flex"}
      container
      gap={2}
    >
      {/* Título de la página */}
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Registrar nueva región
        </Typography>
      </Grid>

      {/* Tarjeta que contiene los campos del formulario */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', gap: 2 }}>
            {/* Campo para ingresar el nombre de la región */}
            <TextField
              id="name"
              label="Nombre de la región"
              variant="outlined"
              fullWidth
              color="primary"
              margin="none"
              sizes="small"
              value={formik.values.name} // Valor del campo
              onChange={formik.handleChange} // Maneja los cambios en el campo
              onBlur={formik.handleBlur} // Maneja el evento de desenfoque
              error={formik.touched.name && Boolean(formik.errors.name)} // Muestra error si el campo no es válido
              helperText={formik.touched.name && formik.errors.name} // Mensaje de error
            />
            {/* Campo para ingresar el código de la región */}
            <TextField
              id="regionCode"
              label="Código de la región"
              variant="outlined"
              fullWidth
              color="primary"
              margin="none"
              sizes="small"
              value={formik.values.regionCode} // Valor del campo
              onChange={formik.handleChange} // Maneja los cambios en el campo
              onBlur={formik.handleBlur} // Maneja el evento de desenfoque
              error={formik.touched.regionCode && Boolean(formik.errors.regionCode)} // Muestra error si el campo no es válido
              helperText={formik.touched.regionCode && formik.errors.regionCode} // Mensaje de error
            />
          </CardContent>
          
          {/* Selector de región para seleccionar coordenadas */}
          <RegionSelector
            coordinates={coordinates} // Coordenadas actuales
            setCoordinates={setCoordinates} // Función para actualizar las coordenadas
            zoom={10} // Nivel de zoom del mapa
          />

          {/* Botón para guardar los datos */}
          <CardActions>
            <Button variant="text" color="primary" size="small" type="submit">
              Guardar
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Create;
