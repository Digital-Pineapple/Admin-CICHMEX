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
import { useCategories } from "../../hooks/useCategories";
import { useAuthStore } from "../../hooks";

const Create = () => {
  const { addSubCategory, navigate} = useSubCategories();
  const { loadCategories, categories } = useCategories();
  const {user} = useAuthStore()
  useEffect(() => {
    loadCategories();
  }, [user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      category_id: ""
    },
    onSubmit: (values) => {
      const values2 = {
        ...values,
        subCategory_image: values?.profile_image ? values?.profile_image : null,
      };
      try {
         addSubCategory(values2);
      } catch (error) {
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
  
  const outCreate = () => {
    navigate("/mi-almacen/subCategorias", { replace: true });
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
          Crear Subcategoría
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
          id={"image"}
          name={"image"}
        />
      </Grid>
        <TextField
          focused
          fullWidth
          id="name"
          name="name"
          label="Nombre de la Subcategoría"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />        
        <FormControl fullWidth>
          <FormLabel>Selecciona la categoría</FormLabel>
          <Select
            id="category_id"
            name="category_id"
            value={formik.values.category_id}
            label="Selecciona la categoría"
            onChange={formik.handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Selecciona una Categoría</FormHelperText>
        </FormControl>
      </Grid>
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

export default Create;
