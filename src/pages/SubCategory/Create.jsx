import Titles from "../../components/ui/Titles";

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
} from "@mui/material";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useSelector } from "react-redux";

const CreateSubCategory = () => {
  const { addSubCategory } = useSubCategories();
  const navigate = useNavigate();
  const { loadCategories } = useCategories();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    loadCategories();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "true",
      category: "",
    },
    onSubmit: (values) => {
      try {
        addSubCategory(values);
        navigate("/auth/SubCategorias", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al crear la subcategoria", {
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
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Crear Sub-Categoria</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
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
          aria-label="Descripcion"
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
      </Grid>
      <Button type="submit" variant="contained" color="secondary">
        Crear
      </Button>
    </Box>
  );
};

export default CreateSubCategory;
