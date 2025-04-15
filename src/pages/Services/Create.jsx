import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import {
  Grid,
  TextareaAutosize,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography, ButtonGroup,
} from "@mui/material";
import { useServices } from "../../hooks/useServices";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEffect } from "react";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";

const CreateService = () => {
  // Hook para manejar servicios
  const { addService, navigate } = useServices();
  // Hook para manejar subcategorías
  const { loadSubCategories, subCategories } = useSubCategories();

  // Cargar las subcategorías al montar el componente
  useEffect(() => {
    loadSubCategories();
  }, []);

  // Configuración de Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      name: "", // Nombre del servicio
      description: "", // Descripción del servicio
      subCategory: "" // Subcategoría seleccionada
    },
    onSubmit: (values) => {
      // Preparar los valores para enviar al backend
      const values2 = {
        ...values,
        service_image: values?.profile_image ? values?.profile_image : null,
      };
      try {
        // Llamar a la función para agregar el servicio
        addService(values2);
      } catch (error) {
        // Manejar errores y mostrar notificación
        return enqueueSnackbar(`Error: ${error.data.response?.message}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  // Función para navegar fuera de la página de creación
  const outCreate = () => {
    navigate("/auth/servicios", { replace: true });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={formik.handleSubmit} // Manejar el envío del formulario
      style={{ marginLeft: "10%", height: "70%", width: "80%", display:'flex', justifyContent:'center' }}
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
         Crear Servicio Global
        </Typography>
      </Grid>

      {/* Contenedor principal del formulario */}
      <Grid
         item
         sm={8}
         display={"flex"}
         flexDirection={"column"}
         alignItems={"center"}
      >
        {/* Componente para subir imagen de perfil */}
        <Grid item xs={12} sm={5} md={5.7}>
          <ProfileImageUploader
            formik={formik}
            id={"image"}
            name={"image"}
          />
        </Grid>

        {/* Campo de texto para el nombre del servicio */}
        <TextField
          focused
          fullWidth
          id="name"
          name="name"
          label="Nombre del servicio"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />

        {/* Campo de texto para la descripción del servicio */}
        <Typography>Descipcion del Servicio</Typography>
        <TextareaAutosize
          aria-label="Descripcion"
          id="description"
          name="description"
          minRows={6}
          label="Descripcion"
          value={formik.values.description}
          style={{ width: "100%", fontFamily: "BikoBold", marginBottom: 20 }}
          onChange={formik.handleChange}
        />

        {/* Selector para elegir una subcategoría */}
        <FormControl>
          <FormLabel>subCategoria</FormLabel>
          <Select
            id="subCategory"
            name="subCategory"
            value={formik.values.subCategory}
            label="subCategoria"
            onChange={formik.handleChange}
          >
            {subCategories.map((subCategory) => (
              <MenuItem key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Selecciona una sub-categoria</FormHelperText>
        </FormControl>
      </Grid>

      {/* Botones para guardar o salir */}
      <ButtonGroup
        variant="contained"
        color="inherit"
        size="large"
        aria-label="group"
        fullWidth
      >
        <Button type="submit" variant="contained" color="success">
          Guardar
        </Button>
        <Button
          onClick={outCreate}
          variant="contained"
          size="large"
          color="warning"
        >
          Salir
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default CreateService;
