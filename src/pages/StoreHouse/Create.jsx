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
import { useStoreHouse } from "../../hooks/useStoreHouse";
import { useAuth, useAuthStore } from "../../hooks";

const CreateStoreHouse = () => {
  const { createStoreHouse } = useStoreHouse();
  const { user } = useAuthStore()
  
  

  const formik = useFormik({
    initialValues: {
      user_id : user?._id,
      name: "",
      phone_number:"",
      status:true,
    },
    onSubmit: (values) => {
      try {
        createStoreHouse(values);
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

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Crear Almacen</h2>} />
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
          label="Nombre del almacen"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
         <TextField
          focused
          fullWidth
          id="phone_number"
          name="phone_number"
          label="Numero de telefono"
          variant="outlined"
          value={formik.values.phone_number}
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

export default CreateStoreHouse;
