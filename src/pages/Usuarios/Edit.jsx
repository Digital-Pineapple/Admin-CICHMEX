import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Badge,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  styled,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import AddImage from "../../assets/Images/add.png";
import { useTypeUser } from "../../hooks/useTypeUser";
import { useUsers } from "../../hooks/useUsers";
import useImages from "../../hooks/useImages";
import { Delete, Filter } from "@mui/icons-material";
import { SlideBranchesImages } from "../../components/Images/SlideBranchesImages";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";

const Edit = () => {
  const { id } = useParams(); // Obtiene el ID del usuario desde los parámetros de la URL
  const { user, editUser, loadUser } = useUsers(); // Hook personalizado para manejar usuarios
  const { loadTypeUsers, typeUsers } = useTypeUser(); // Hook personalizado para manejar tipos de usuarios
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    loadUser(id); // Carga los datos del usuario actual
    loadTypeUsers(); // Carga los tipos de usuarios disponibles
  }, [id]);

  useEffect(() => {
    // Establece los valores iniciales del formulario cuando los datos del usuario están disponibles
    formik.setValues({
      fullname: user?.fullname,
      type_user: user?.type_user?._id,
    });
  }, [user]);

  const formik = useFormik({
    initialValues: {
      fullname: "", // Nombre del usuario
      type_user: "", // Tipo de usuario
      profile_image: "", // Imagen de perfil
    },
    onSubmit: (values) => {
      // Maneja el envío del formulario
      const values2 = {
        ...values,
        profile_image: values?.profile_image ? values?.profile_image : null, // Asegura que la imagen de perfil sea nula si no se selecciona
      };
      try {
        editUser(user._id, values2); // Llama a la función para editar el usuario
      } catch (error) {
        // Muestra un mensaje de error si ocurre un problema
        return enqueueSnackbar(`Error: ${error.response.data?.message}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  const outEdit = () => {
    // Navega de regreso a la lista de usuarios
    navigate("/usuarios", { replace: true });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={formik.handleSubmit} // Maneja el envío del formulario
      style={{ marginLeft: "10%", width: "85%" }}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
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
          Editar Usuario
        </Typography>
      </Grid>

      {/* Contenedor principal del formulario */}
      <Grid container columnSpacing={1} padding={{ xs: 0, sm: 4, md: 8 }}>
        {/* Componente para subir la imagen de perfil */}
        <Grid item xs={12} sm={5} md={5.7}>
          <ProfileImageUploader
            formik={formik}
            previewImage1={user?.profile_image} // Imagen de perfil actual
            id={"profile_image"}
            name={"profile_image"}
          />
        </Grid>

        {/* Campos del formulario */}
        <Grid
          item
          xs={12}
          sm={6}
          mt={2}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          {/* Campo para el nombre del usuario */}
          <TextField
            focused
            fullWidth
            id="fullname"
            name="fullname"
            label="Nombre"
            variant="outlined"
            value={formik.values.fullname}
            onChange={formik.handleChange}
          />

          {/* Selector para el tipo de usuario */}
          <FormControl fullWidth>
            <FormLabel>Tipo de usuario</FormLabel>
            <Select
              id="type_user"
              type="text"
              name="type_user"
              value={formik.values.type_user}
              label="Tipo de usuario"
              onChange={formik.handleChange}
            >
              {typeUsers
                ? typeUsers.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?._id}>
                        Rol: {item.role} Sistema: {item.system}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select>
            <FormHelperText>Selecciona un tipo de usuario</FormHelperText>
          </FormControl>

          {/* Botones de acción */}
          <ButtonGroup
            variant="contained"
            color="inherit"
            size="large"
            aria-label="group"
            fullWidth
          >
            <Button
              onClick={outEdit} // Botón para salir sin guardar
              variant="contained"
              size="large"
              color="warning"
            >
              Salir
            </Button>
            <Button type="submit" variant="contained" color="success">
              Guardar
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Edit;
