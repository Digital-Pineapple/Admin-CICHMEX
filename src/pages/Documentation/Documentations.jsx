import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useDocumentations } from "../../hooks/useDocumentation";
import ModalDocuments from "../../components/CheckDocument/ModalDocuments";
import { useCustomers } from "../../hooks/useCustomers";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadDocumentation, editDocumentation } = useDocumentations();
  const { loadCustomer, loadCustomers } = useCustomers();

  useEffect(() => {
    loadCustomers();
    loadDocumentation(id);
    loadCustomer();

  }, []);

  const formik = useFormik({
    initialValues: {
            name : "" ,
            message: ""  ,
            status : ""  ,
            url : "",
            verify : "" ,
            customer_id : ""  ,
      
    },
    onSubmit: (values) => {
      try {
        editDocumentation(customer._id, values);
        navigate("/auth/documentation", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al verificar usuario", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  const out = () => {
    navigate("/auth/usuarios", { replace: true });
  };

  return (
    <Box component="form"  marginX={"10%"}>
      <Titles name={<h2 align="center">Verificar Documentos</h2>} />
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
          <Grid container direction="row">
            <Grid display="flex" width="50%" flexDirection="column" gap={2}>
          
              <ModalDocuments
                name={"Comprobante de Domicilio"}
      
              />
          
              <ModalDocuments
                name={"Antecedentes Penales"}
               
              />
              <ModalDocuments name={"Curp"} />
            </Grid>
            <Grid>
                <FormControl component="fieldset">
              <ModalDocuments
                name={"Identificacion Oficial"}
               
                
              >
              </ModalDocuments>
                </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent={"center"}
            justifyItems={"center"}
            alignItems={"center"}
          >
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained">
                Terminar verificación
              </Button>
              <Button onClick={out} variant="outlined" color="secondary">
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
