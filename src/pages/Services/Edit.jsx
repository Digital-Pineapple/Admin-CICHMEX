import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import UploadImage from "../../components/ui/UploadImage";
import Grid from "@mui/material/Grid";
import { TextField, TextareaAutosize } from "@mui/material";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useServices } from "../../hooks/useServices";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";

const Edit = () => {
  const { id } = useParams();
  const { loadService, service, editService  } = useServices();
  const navigate = useNavigate();

  useEffect(() => {
     loadService(id);
  }, []);

  useEffect(() => {
    formik.setValues({
      name: service.name,
      description: service.description,
      status: service.status,
    });
  }, [service]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "",
    },
    onSubmit: (values) => {
      try {
        editService(service._id, values)
        navigate('/auth/servicios', {replace:true})
        
      } catch (error) {
        return enqueueSnackbar('Error al editar el servicio', {variant:'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }}, )
      }

    },
  });
  
  const outEdit = () => {
    navigate("/auth/servicios", { replace: true });}

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Editar Servicio</h2>} />
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
            label="Nombre del servicio"
            variant="outlined"
            value={formik.values.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
          <Typography>Descipcion del servicio</Typography>
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

          <Grid
            container
            justifyContent={"center"}
            justifyItems={"center"}
            alignItems={"center"}
          >
            {/* <Grid display="flex" flexDirection="column">
              <FormControl>
                <FormLabel id="status-label">Estatus</FormLabel>
                <RadioGroup
                  aria-labelledby="status-label"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Activo"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Desactivado"
                  />
                </RadioGroup>
              </FormControl>
            </Grid> */}

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
      {/* <code>
        <pre>{JSON.stringify(formulario, null, 2)}</pre>
      </code> */}
    </Box>
  );
};

export default Edit;

