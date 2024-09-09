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
  const { id } = useParams();
  const { user, editUser, loadUser } = useUsers();
  const { loadTypeUsers, typeUsers } = useTypeUser();
  const navigate = useNavigate();

  useEffect(() => {
    loadUser(id);
    loadTypeUsers();
  }, [id]);

  useEffect(() => {
    formik.setValues({
      fullname: user?.fullname,
      type_user: user?.type_user?._id,
    });
  }, [user]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      type_user: "",
      profile_image: "",
    },
    onSubmit: (values) => {
      const values2 = {
        ...values,
        profile_image: values?.profile_image ? values?.profile_image : null,
      };
      try {
        editUser(user._id, values2);
      } catch (error) {
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
    navigate("/usuarios", { replace: true });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={formik.handleSubmit}
      style={{ marginLeft: "10%", width: "85%" }}
      display={"flex"}
      justifyContent={"center"}
      alignContent={'center'}
    >
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
<Grid container columnSpacing={1} padding={{xs:0, sm:4, md:8}}>
   <Grid item xs={12} sm={5} md={5.7}>
        <ProfileImageUploader
          formik={formik}
          previewImage1={user?.profile_image}
          id={"profile_image"}
          name={"profile_image"}
        />
      </Grid>

      <Grid item xs={12} sm={6} mt={2} display={'flex'} flexDirection={'column'} gap={2} >
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
        <FormControl fullWidth>
          <FormLabel>TIpo de usuario</FormLabel>
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
