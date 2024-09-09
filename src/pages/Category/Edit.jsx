import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  ButtonGroup,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {  useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";
import { useCategories } from "../../hooks/useCategories";

const Edit = () => {
  const { id } = useParams();
  const { loadCategory,editCategory, category, navigate } = useCategories();

  useEffect(() => {
    loadCategory(id);
  }, [id]);

  useEffect(() => {
    formik.setValues({
      name: category.name,
      category_image:category.category_image,
    });
  }, [category]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: (values) => {
      const values2 = {
        ...values,
        category_image: values?.profile_image ? values?.profile_image : null,
      };
      try {
        editCategory(id,values2)
      } catch (error) {
        return enqueueSnackbar("Error al editar", {
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
    navigate("/mi-almacen/categorias", { replace: true });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={formik.handleSubmit}
      style={{ marginLeft: "10%", height: "70%", width: "80%", display:'flex', justifyContent:'center' }}
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
          Categorias
        </Typography>
      </Grid>

      <Grid
        item
        sm={8}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Grid item xs={12} sm={5} md={5.7}>
          <ProfileImageUploader
            formik={formik}
            previewImage1={category?.category_image}
            id={"image"}
            name={"image"}
          />
        </Grid>

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
