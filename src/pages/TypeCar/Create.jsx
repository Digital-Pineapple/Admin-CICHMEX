import Titles from "../../components/ui/Titles";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTypeCars } from "../../hooks/UseTypeCars";

const CreateTypeCar = () => {
  const { addTypeCar } = useTypeCars(); // Hook personalizado para manejar la lógica relacionada con los tipos de autos
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Configuración del formulario utilizando Formik
  const formik = useFormik({
    initialValues: {
      name: "", // Campo para el nombre del tipo de auto
      status: "true", // Estado inicial del tipo de auto
    },
    onSubmit: (values) => {
      try {
        console.log(values, 'crear'); // Log para verificar los valores enviados
        addTypeCar(values); // Llama a la función para agregar un nuevo tipo de auto
        navigate("/auth/typeCar", { replace: true }); // Redirige a la página de tipos de autos
      } catch (error) {
        // Manejo de errores al intentar crear el tipo de auto
        return enqueueSnackbar("Error al crear el tipo de auto", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  return (
    // Formulario principal
    <Box component="form" onSubmit={formik.handleSubmit}>
      {/* Título de la página */}
      <Grid item marginTop={{ xs: '-30px' }} xs={12} minHeight={'100px'} className="Titles">
        <Typography textAlign={'center'} variant="h1" fontSize={{ xs: '20px', sm: '30px', lg: '40px' }}>
          Crear tipo de Auto
        </Typography>
      </Grid>
      {/* Campo de texto para el nombre del tipo de auto */}
      <Grid mt={3} container spacing={4}>
        <TextField
          focused
          fullWidth
          id="name"
          name="name"
          label="Nombre del tipo de auto"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
      </Grid>
      {/* Botón para enviar el formulario */}
      <Button fullWidth type="submit" variant="contained" color="success">
        Crear
      </Button>
    </Box>
  );
};

export default CreateTypeCar;
