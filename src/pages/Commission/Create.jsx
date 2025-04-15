import Titles from "../../components/ui/Titles"; // Componente para mostrar títulos estilizados.
import Box from "@mui/material/Box"; // Componente de Material-UI para crear un contenedor flexible.
import { useFormik } from "formik"; // Hook para manejar formularios y validaciones.
import TextField from "@mui/material/TextField"; // Campo de texto de Material-UI.
import { Grid, Button, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material"; // Componentes de Material-UI para diseño y entradas.
import { useNavigate } from "react-router-dom"; // Hook para redireccionar entre rutas.
import { useCommissions } from "../../hooks/useCommissions"; // Hook personalizado para manejar comisiones.

const CreateCommission = () => {
  const { addCommission } = useCommissions(); // Función para agregar una nueva comisión.
  const navigate = useNavigate(); // Función para redirigir a otra página.

  // Configuración del formulario con Formik
  const formik = useFormik({
    initialValues: {
      name: "", // Campo para el nombre de la comisión.
      amount: "", // Campo para el monto de la comisión.
      status: "true", // Estado inicial de la comisión.
      discount: "", // Campo para el descuento de la comisión.
    },
    onSubmit: (values) => {
      try {
        addCommission(values); // Llama a la función para agregar la comisión.
        navigate("/auth/comisiones", { replace: true }); // Redirige a la página de comisiones.
      } catch (error) {
        return enqueueSnackbar(`Error al crear la comision:${error}`, {
          variant: "error", // Muestra un mensaje de error si ocurre un problema.
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      {/* Título principal de la página */}
      <Titles name={<h2 align="center">Crear comisión</h2>} />
      <Grid
        color="#F7BFBF" // Color del borde del formulario.
        borderRadius={5} // Bordes redondeados.
        mt={3} // Margen superior.
        sx={{ border: 10, p: 5 }} // Estilos adicionales.
        container
        spacing={4} // Espaciado entre los elementos del grid.
      >
        {/* Campo de texto para el nombre de la comisión */}
        <TextField
          focused
          fullWidth
          id="name"
          name="name"
          label="Nombre de la comisión"
          variant="outlined"
          value={formik.values.name} // Valor del campo manejado por Formik.
          sx={{ margin: 2 }}
          onChange={formik.handleChange} // Actualiza el valor en Formik.
        />
        {/* Campo para ingresar el monto de la comisión */}
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel>Monto</InputLabel>
          <OutlinedInput
            id="amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>} // Prefijo del campo (símbolo de dólar).
            label="Monto"
            name="amount"
            variant="outlined"
            value={formik.values?.amount} // Valor del campo manejado por Formik.
            sx={{ margin: 2 }}
            onChange={formik.handleChange} // Actualiza el valor en Formik.
          />
        </FormControl>
        {/* Campo para ingresar el descuento de la comisión */}
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel>Descuento</InputLabel>
          <OutlinedInput
            id="discount"
            startAdornment={<InputAdornment position="start">%</InputAdornment>} // Prefijo del campo (símbolo de porcentaje).
            label="Descuento"
            name="discount"
            variant="outlined"
            value={formik.values?.discount} // Valor del campo manejado por Formik.
            sx={{ margin: 2 }}
            onChange={formik.handleChange} // Actualiza el valor en Formik.
          />
        </FormControl>
      </Grid>
      {/* Botón para enviar el formulario */}
      <Button type="submit" variant="contained" color="secondary">
        Crear
      </Button>
    </Box>
  );
};

export default CreateCommission; // Exporta el componente para su uso en otras partes de la aplicación.
