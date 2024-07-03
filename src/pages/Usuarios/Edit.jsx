import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Badge,
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
import CustomBreadcrumb from "../../components/ui/CustomBreadcrumb";
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
      try {
        console.log(values);
        // editUser(user._id, values);
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
    navigate("/auth/usuarios", { replace: true });
  };


  return (
    <Grid
      container
      component="form"
      onSubmit={formik.handleSubmit}
      style={{ marginLeft: "10%", height: "70%", width: "80%" }}
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

      <Grid
        item
        xs={12}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Grid container>
          <ProfileImageUploader formik={formik} previewImage={user?.profile_image} />
        </Grid>

        <TextField
          focused
          fullWidth
          id="fullname"
          name="fullname"
          label="Nombre"
          variant="outlined"
          value={formik.values.fullname}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />

        <FormControl>
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
                      {item.name}
                    </MenuItem>
                  );
                })
              : ""}
          </Select>
          <FormHelperText>Selecciona un tipo de usuario</FormHelperText>
        </FormControl>

        <Grid
          container
          justifyContent={"center"}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
            <Button onClick={outEdit} variant="outlined" color="secondary">
              Salir
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Edit;
