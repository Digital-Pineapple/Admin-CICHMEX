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
import { useSelector } from "react-redux";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";

const Edit = () => {
  const { id } = useParams();
  const { loadService, service, editService } = useServices();
  const navigate = useNavigate();
  const { loadSubCategories } = useSubCategories();

  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );

  useEffect(() => {
    loadService(id);
    loadSubCategories();
  }, [id]);

  useEffect(() => {
    formik.setValues({
      name: service.name,
      description: service.description,
      status: service.status,
      subCategory: service.subCategory,
    });
  }, [service]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: true,
      subCategory: "",
      service_image: "",
    },
    onSubmit: (values) => {
      const values2 = {
        ...values,
        service_image: values?.profile_image ? values?.profile_image : null,
      };
      try {
        editService(service._id, values2);
        navigate("/auth/servicios", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al editar el servicio", {
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
    navigate("/auth/servicios", { replace: true });
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
          Servicios Globales
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
            previewImage1={service?.image}
            id={"service_image"}
            name={"service_image"}
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
        <FormControl>
          <FormLabel>Subcategoria</FormLabel>
          <Select
            id="subCategory"
            name="subCategory"
            value={formik.values.subCategory}
            label="Subcategoria"
            onChange={formik.handleChange}
          >
            {subCategories
              ? subCategories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item?._id}>
                      {item.name}
                    </MenuItem>
                  );
                })
              : ""}
          </Select>
          <FormHelperText>Selecciona una Subcategoria</FormHelperText>
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
