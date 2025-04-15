import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useServices } from "../../hooks/useServices";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useSelector } from "react-redux";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";

const Edit = () => {
  const { id } = useParams(); // Obtiene el ID del servicio desde los parámetros de la URL
  const { loadService, service, editService } = useServices(); // Hook personalizado para manejar servicios
  const navigate = useNavigate(); // Hook para la navegación entre rutas
  const { loadSubCategories } = useSubCategories(); // Hook personalizado para manejar subcategorías

  // Obtiene las subcategorías desde el estado global (Redux)
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );

  // Carga el servicio y las subcategorías al montar el componente
  useEffect(() => {
    loadService(id); // Carga los datos del servicio por ID
    loadSubCategories(); // Carga las subcategorías disponibles
  }, [id]);

  // Actualiza los valores del formulario cuando el servicio cambia
  useEffect(() => {
    formik.setValues({
      name: service.name,
      description: service.description,
      status: service.status,
      subCategory: service.subCategory,
    });
  }, [service]);

  // Configuración del formulario con Formik
  const formik = useFormik({
    initialValues: {
      name: "", // Nombre del servicio
      description: "", // Descripción del servicio
      status: true, // Estado del servicio (activo/inactivo)
      subCategory: "", // Subcategoría seleccionada
      service_image: "", // Imagen del servicio
    },
    onSubmit: (values) => {
      const values2 = {
        ...values,
        service_image: values?.profile_image ? values?.profile_image : null, // Asigna la imagen si existe
      };
      try {
        editService(service._id, values2); // Edita el servicio con los valores del formulario
        navigate("/auth/servicios", { replace: true }); // Navega de regreso a la lista de servicios
      } catch (error) {
        // Muestra un mensaje de error si ocurre algún problema
        return enqueueSnackbar("Error al editar el servicio", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  // Función para salir sin guardar cambios
  const outEdit = () => {
    navigate("/auth/servicios", { replace: true });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={formik.handleSubmit} // Maneja el envío del formulario
      style={{
        marginLeft: "10%",
        height: "70%",
        width: "80%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Título del formulario */}
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
          Servicios Globales
        </Typography>
      </Grid>

      <Grid
        item
        sm={8}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        {/* Componente para subir la imagen del servicio */}
        <Grid item xs={12} sm={5} md={5.7}>
          <ProfileImageUploader
            formik={formik}
            previewImage1={service?.image} // Imagen previa del servicio
            id={"service_image"}
            name={"service_image"}
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
        <Typography>Descipcion del servicio</Typography>
        <TextareaAutosize
          aria-label="minimum height"
          id="description"
          name="description"
          minRows={6}
          label="Descripcion"
          value={formik.values.description}
          style={{ width: "100%", fontFamily: "BikoBold", marginBottom: 20 }}
          onChange={formik.handleChange}
        />

        {/* Selector de subcategorías */}
        <FormControl>
          <FormLabel>Subcategoria</FormLabel>
          <Select
            id="subCategory"
            name="subCategory"
            value={formik.values.subCategory}
            label="Subcategoria"
            onChange={formik.handleChange}
          >
            {subCategories
              ? subCategories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item?._id}>
                      {item.name}
                    </MenuItem>
                  );
                })
              : ""}
          </Select>
          <FormHelperText>Selecciona una Subcategoria</FormHelperText>
        </FormControl>

        {/* Botones para guardar o salir */}
        <Grid
          container
          justifyContent={"center"}
          justifyItems={"center"}
          alignItems={"center"}
        >
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
              onClick={outEdit}
              variant="contained"
              size="large"
              color="warning"
            >
              Salir
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Edit;
