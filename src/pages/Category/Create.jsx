import Titles from "../../components/ui/Titles";

import Box from "@mui/material/Box";

import { useFormik } from "formik";
import TextField from '@mui/material/TextField'
import { Grid, TextareaAutosize, Button } from "@mui/material";
import { Typography } from "antd";
import { useCategories } from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";


const CreateCategory = () => {
  const { addCategory, loadCategories }= useCategories();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      try {
        addCategory(values)
        navigate('/auth/CategoriaServicios', {replace:true})
        loadCategories()
      } catch (error) {
        return enqueueSnackbar(`Error: ${error.response}`, {variant:'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }}, )
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Crear Categoria</h2>} />
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
            label="Nombre de la categoria"
            variant="outlined"
            value={formik.values.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
      </Grid>
      <Button type="submit" variant="contained" color="secondary">
        Crear
        
      </Button>
    </Box>
  );
};

export default CreateCategory;
