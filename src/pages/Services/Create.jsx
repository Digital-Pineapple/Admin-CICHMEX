import Titles from "../../components/ui/Titles";

import Box from "@mui/material/Box";

import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, TextareaAutosize, Button, FormControl, FormLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CreateService = () => {
  const { addService } = useServices();
  const { loadSubCategories, subCategories } = useSubCategories();
  const navigate = useNavigate();
  
  useEffect(() => {
    loadSubCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      SubCategory: "",
    },
    onSubmit: (values) => {
      try {
        addService(values);
        navigate("/auth/servicios", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al crear el servicio", {
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
      <Titles name={<h2 align="center">Crear Servicio Global</h2>} />
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
          label="Nombre del servicio"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
        <Typography>Descipcion del Servicio</Typography>
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
          <FormLabel>subCategoria</FormLabel>
          <Select
            id="subCategory"
            name="subCategory"
            value={formik.values.subCategory}
            label="subCategoria"
            onChange={formik.handleChange}
          >
            {subCategories.map((subCategory) => (
              <MenuItem key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Selecciona una sub-categoria</FormHelperText>
        </FormControl>
      </Grid>
      <Button type="submit" variant="contained" color="secondary">
        Crear
      </Button>
    </Box>
  );
};

export default CreateService;
