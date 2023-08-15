import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Paper,
  CardActions,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDocumentations } from "../../hooks/useDocumentation";
import ModalDocuments from "../../components/CheckDocument/ModalDocuments";
import { useCustomers } from "../../hooks/useCustomers";
import VerifyButton from "../../components/Buttons/VerifyButton";
import DeclineButton from "../../components/Buttons/DeclineButton";
import { ValidateContext } from '../../contexts/ValidateContext'
const Documentation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadDocumentation } = useDocumentations();
  const { loadCustomer, customer } = useCustomers();
  const { documentations } = useSelector((state) => state.documentations);
const [validation, setValidation] = useState(false)
  
  useEffect(() => {
    loadCustomer(id);
    loadDocumentation(id);
  }, [id]);

  const out = () => {
    navigate("/auth/usuarios", { replace: true });
  };
  const findFile = (name, targetName) => {
    return documentations.find(
      (documentations) => documentations.name === targetName
    );
  };

  const pathIne = findFile(documentations.name, "ine");

  const pathProok_Address = findFile(documentations.name, "prook_address");

  const pathCurp = findFile(documentations.name, "curp");

  const pathCriminalRecord = findFile(documentations.name, "criminal_record");

  const pathRfc = findFile(documentations.name, "rfc");

  return (
    <Box component="form" marginX={"10%"}>
      <ValidateContext.Provider value={{validation,setValidation}}>
      <Titles name={<h2 align="center">Verificar Documentos</h2>} />

      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Card sx={{ minWidth: "50%" }}>
            <CardContent>
              <Avatar
                variant="circular"
                src={customer?.profile_image}
                alt="foto de perfil"
                sx={{ width: "100px", height: "100px" }}
              />
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
                {customer?.type_customer === "0"
                  ? "Cliente"
                  : customer?.type_customer === "1"
                  ? "Lavador independiente"
                  : customer?.type_customer === "2"
                  ? "Establecimiento"
                  : "administrador"}
              </Typography>
              <Typography variant="body2">Numero de telefono:</Typography>

              {customer.phone?.phone_number
                ? customer?.phone.phone_number
                : "No hay telefono registrado"}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} direction={"row"}>
          <CardContent>
            <ModalDocuments
              pdfPath={pathIne?.url}
              name={"Identificacion Oficial"}
            />
            {pathProok_Address?.message === undefined ||
            pathIne?.message.length > 0 &&
            pathIne?.verify === false ? (
              <Paper elevation={5} sx={{ padding: "20px" }}>
                <Typography variant="h5">Motivo de rechazo:</Typography>
                {pathIne?.message}
              </Paper>
            ) : null}
            <CardActions>
              <VerifyButton pathFile={pathIne} />
              <DeclineButton pathFile={pathIne} />
            </CardActions>
          </CardContent>
          <CardContent>
            <ModalDocuments
              pdfPath={pathProok_Address?.url}
              name={"Comprobante de domicilio"}
            />
            {pathProok_Address?.message === undefined ||
            pathProok_Address?.message.length >= 0 &&
            pathProok_Address?.verify === false ? (
              <Paper elevation={5} sx={{ padding: "20px" }}>
                <Typography variant="h5">Motivo de rechazo:</Typography>
                {pathProok_Address?.message}
              </Paper>
            ) : null}
            <CardActions>
              <VerifyButton pathFile={pathProok_Address} />
              <DeclineButton pathFile={pathProok_Address} />
            </CardActions>
          </CardContent>
          <CardContent>
            <ModalDocuments pdfPath={pathCurp?.url} name={"Curp"} />
            {pathCurp?.message === undefined ||
            pathCurp?.message.length > 0 && pathCurp?.verify === false ? (
              <Paper elevation={5} sx={{ padding: "20px" }}>
                <Typography variant="h5">Motivo de rechazo:</Typography>
                {pathCurp?.message}
              </Paper>
            ) : null}
            <CardActions>
              <VerifyButton pathFile={pathCurp} />
              <DeclineButton pathFile={pathCurp} />
            </CardActions>
          </CardContent>

          <CardContent>
            <ModalDocuments
              pdfPath={pathCriminalRecord?.url}
              name={"Antecedentes Penales"}
            />
            {pathCriminalRecord?.message === undefined ||
            pathCriminalRecord?.message.length > 0 &&
            pathCriminalRecord?.verify === false ? (
              <Paper elevation={5} sx={{ padding: "20px" }}>
                <Typography variant="h5">Motivo de rechazo:</Typography>
                {pathCriminalRecord?.message}
              </Paper>
            ) : null}
            <CardActions>
              <VerifyButton pathFile={pathCriminalRecord} />
              <DeclineButton pathFile={pathCriminalRecord} />
            </CardActions>
          </CardContent>

          <CardContent>
            <ModalDocuments pdfPath={pathRfc?.url} name={"RFC"} />
            { pathRfc?.message === undefined || 
            pathRfc?.message.length > 0 && pathRfc?.verify === false ? (
              <Paper elevation={5} sx={{ padding: "20px" }}>
                <Typography variant="h5">Motivo de rechazo:</Typography>
                {pathRfc?.message}
              </Paper>
            ) : null}
            <CardActions>
              <VerifyButton pathFile={pathRfc} />
              <DeclineButton pathFile={pathRfc} />
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
      <Grid justifyContent={"center"} width="100%">
        {pathIne?.verify === true &&
        pathCurp?.verify === true &&
        pathProok_Address === true &&
        pathCriminalRecord === true &&
        pathRfc === true ? (
          <Button type="submit" variant="contained">
            Verificar cuenta
          </Button>
        ) : (
          <Button disabled type="submit" variant="contained">
            Verificar cuenta
          </Button>
        )}
        <Button onClick={out} variant="outlined" color="secondary">
          Salir
        </Button>
      </Grid>
      </ValidateContext.Provider>
    </Box>
  );
};

export default Documentation;
