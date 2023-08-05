import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions, Avatar,
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

const Documentation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadDocumentation, editDocumentation,  } = useDocumentations();
  const { loadCustomer,customer } = useCustomers();
  const { documentations } = useSelector((state)=> state.documentations)

  useEffect(() => {
    loadCustomer(id)
    loadDocumentation(id)
  }, [id]);
  const formik = useFormik({
    initialValues: {
      name: "",
      message: "",
      status: "",
      url: "",
      verify: "",
      customer_id: "",
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
 const findFile =(name, targetName) =>{
  return documentations.find((documentations)=>documentations.name === targetName )
 }
 const pathIne = findFile((documentations.name),'ine')
 
const pathProok_Address = findFile((documentations.name),'prook_address')

const pathCurp = findFile((documentations.name),'curp')

const pathCriminalRecord = findFile((documentations.name),'criminal_record')

const pathRfc = findFile((documentations.name),'rfc')
;

  return (
    <Box component="form" marginX={"10%"}>
      <Titles name={<h2 align="center">Verificar Documentos</h2>} />

      <Grid container direction={'row'} >
        <Grid item  >
          <ModalDocuments pdfPath={pathIne?.url } success1={pathIne?.verify} name={"Identificacion Oficial"} />
          <ModalDocuments pdfPath={pathProok_Address?.url} name={"Comprobante de domicilio"} />
          <ModalDocuments pdfPath={pathCurp?.url} name={"Curp"} />
          <ModalDocuments pdfPath={pathCriminalRecord?.url} name={"Antecedentes Penales"} />
          <ModalDocuments pdfPath={pathRfc?.url} name={"RFC"}/>
        </Grid>
      </Grid>
      <Grid item >
        <Card sx={{ minWidth: "50%" }}>
          <CardContent>
            <Avatar variant="circular" src={customer?.profile_image} alt="foto de perfil" sx={{ width: '100px', height: '100px' }} />
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Usuario
            </Typography>
            <Typography variant="h5" component="div">
              {customer?.fullname}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {customer?.email}
            </Typography>
            <Typography variant="body2">
              Tipo de usuario:
              <br />
              {customer?.type_customer === "0" ? 'Cliente':
              customer?.type_customer === "1" ? 'Lavador independiente':
              customer?.type_customer === "2" ? 'Establecimiento':
              'administrador'}
            </Typography>
            <Typography variant="body2">Numero de telefono:</Typography>

            {customer.phone?.phone_number ? customer?.phone.phone_number : 'No hay telefono registrado' }
          </CardContent>
        </Card>
      </Grid>
      <Button type="submit" variant="contained">
        Terminar verificación
      </Button>
      <Button onClick={out} variant="outlined" color="secondary">
        Salir
      </Button>
    </Box>
  );
};

export default Documentation;
