import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useCommissions } from "../../hooks/useCommissions";

const Edit = () => {
  const { id } = useParams();
  const { loadCommission, editCommission, commission } = useCommissions();
  const navigate = useNavigate();

  useEffect(() => {
    loadCommission(id);
  }, []);

  useEffect(() => {
    formik.setValues({
      name: commission.name,
      status: commission.status,
      amount: commission.amount,
      discount : commission.discount
    });
  }, [commission]);

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      amount: "",
      discount : "",

    },
    onSubmit: (values) => {
      try {
        editCommission(commission._id, values);
        navigate("/auth/comisiones", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al editar la comisión", {
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
    navigate("/auth/comisiones", { replace: true });
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Editar Comisión</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
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
            label="Nombre de la comisión"
            variant="outlined"
            value={formik.values?.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
          
          <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel>Monto</InputLabel>
          <OutlinedInput
            id="amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Monto"
            focused
            name="amount"
            variant="outlined"
            value={formik.values?.amount}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel>Descuento</InputLabel>
          <OutlinedInput
            id="discount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Descuento"
            focused
            name="discount"
            variant="outlined"
            value={formik.values?.discount}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
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
