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
import { useCategories } from "../../hooks/useCategories";
import { useSelector } from "react-redux";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";


const Edit = () => {
  const { id } = useParams();
  const { loadSubCategory,editSubCategory, navigate, subCategory, loading } = useSubCategories();
  const { loadCategories, categories } = useCategories();


  useEffect(() => {
    loadCategories();
    loadSubCategory(id);
  }, [id]);

  useEffect(() => {
    formik.setValues({
      name: subCategory.name,
      category_id: subCategory.category_id,
      subCategory_image: subCategory.subCategory_image || "",
    });
  }, [subCategory]);

  const formik = useFormik({
    initialValues: {
      name: "",
      category_id:""
    },
    onSubmit: (values) => {
      const values2 = {
        ...values,
        subCategory_image: values?.profile_image ? values?.profile_image : null,
      };
      try {
        editSubCategory(id,values2)
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
    navigate("/mi-almacen/subcategorias");
  };
  if (loading) {
    return(<LoadingScreenBlue/>)
  }

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
          Editar Subcategoría
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
            previewImage1={subCategory?.subCategory_image}
            id={"service_image"}
            name={"service_image"}
          />
        </Grid>

        <TextField
          focused
          fullWidth
          id="name"
          name="name"
          label="Nombre de subcategoría"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
        <FormControl fullWidth>
          <FormLabel>Categoría</FormLabel>
          <Select
            id="category_id"
            name="category_id"
            value={formik.values.category_id}
            label="Categoría"
            onChange={formik.handleChange}
          >
            {categories ? categories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item?._id}>
                      {item.name}
                    </MenuItem>
                  );
                }):""}
          </Select>
          <FormHelperText>Selecciona una Categoria</FormHelperText>
        </FormControl>

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
