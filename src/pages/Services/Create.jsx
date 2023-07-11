import Titles from "../../components/ui/Titles";

import Box from "@mui/material/Box";

import { useFormik } from "formik";
import TextField from '@mui/material/TextField'
import { Grid, TextareaAutosize, Button } from "@mui/material";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useServices } from "../../hooks/useServices";

const CreateService = () => {
  const { addService }= useServices();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: 'true',
    },
    onSubmit: (values) => {
      try {
        addService(values)
        navigate('/auth/servicios', {replace:true})
        
      } catch (error) {
        return enqueueSnackbar('Error al crear el servicio', {variant:'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }}, )
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Crear Servicio</h2>} />
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
      </Grid>
      <Button type="submit" variant="contained" color="secondary">
        Crear
        
      </Button>
    </Box>
  );
};

export default CreateService;
