import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Titles from "../../components/ui/Titles";
import UploadImage from "../../components/ui/UploadImage";
import Grid from "@mui/material/Grid";
import {
  Select,
  TextField,
  TextareaAutosize,
  FormControl,
  FormLabel,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useCategories } from "../../hooks/useCategories";
import { useSelector } from "react-redux";

const Edit = () => {
  const { id } = useParams();
  const { loadSubCategory, subCategory, editSubCategory } = useSubCategories();
  const { loadCategories } = useCategories();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    loadSubCategory(id);
    loadCategories();
  }, []);

  useEffect(() => {
    formik.setValues({
      name: subCategory.name,
      description: subCategory.description,
      status: subCategory.status,
      category: subCategory.category,
    });
  }, [subCategory]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "",
      category: "",
    },
    onSubmit: (values) => {
      try {
        editSubCategory(subCategory._id, values);
        navigate("/auth/SubCategorias", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al editar la subcategoria", {
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
    navigate("/auth/SubCategorias", { replace: true });
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Editar Sub-Categorias</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
        <Grid item>
          <UploadImage />
        </Grid>
        <Grid
          item
          sm={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <TextField
            focused
            fullWidth
            id="name"
            name="name"
            label="Nombre de la subcategoria"
            variant="outlined"
            value={formik.values.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
          <Typography>Descipcion de la subcategoría</Typography>
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
          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select
              id="category"
              name="category"
              value={formik.values.category}
              label="Categoria"
              onChange={formik.handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Selecciona una categoria</FormHelperText>
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
    </Box>
  );
};

export default Edit;
