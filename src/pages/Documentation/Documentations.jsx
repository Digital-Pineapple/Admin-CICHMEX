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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentations } from "../../hooks/useDocumentation";
import ModalDocuments from "../../components/CheckDocument/ModalDocuments";
import VerifyButton from "../../components/Buttons/VerifyButton";
import { enqueueSnackbar } from "notistack";
import { useUsers } from "../../hooks/useUsers";

const Documentation = () => {
  const { id } = useParams(); // Obtiene el parámetro `id` de la URL.
  const navigate = useNavigate(); // Hook para navegar entre rutas.
  const { loadDocumentation, documentations } = useDocumentations(); // Hook personalizado para cargar documentación.
  const { loadUser, user, verifyUser } = useUsers(); // Hook personalizado para cargar y verificar usuarios.

  const [open, setOpen] = useState(false); // Estado para controlar la apertura del diálogo.

  useEffect(() => {
    loadUser(id); // Carga la información del usuario basado en el `id`.
    loadDocumentation(id); // Carga la documentación del usuario basado en el `id`.
  }, [id]);

  const handleClickOpen = () => {
    setOpen(true); // Abre el diálogo de confirmación.
  };

  const handleClose = () => {
    setOpen(false); // Cierra el diálogo de confirmación.
  };

  const out = () => {
    navigate("/auth/usuarios", { replace: true }); // Redirige a la página de usuarios.
  };

  const findFile = (name, targetName) => {
    // Busca un archivo específico en la lista de documentaciones.
    return documentations.find(
      (documentations) => documentations.name === targetName
    );
  };

  const verification = () => {
    verifyUser(id); // Verifica al usuario.
    setOpen(false); // Cierra el diálogo después de la verificación.
  };

  const pathCsf = findFile(documentations.name, "csf"); // Obtiene el archivo de comprobante de situación fiscal.

  return (
    <Box marginX={"10%"}>
      {/* Título de la página */}
      <Titles name={<h2 align="center">Verificar Documentos</h2>} />

      {/* Información del usuario */}
      <Grid container display={"block"} justifyContent={"center"} alignContent={"center"}>
        <Card sx={{ minWidth: "50%" }}>
          <CardContent>
            {/* Muestra la imagen de perfil del usuario */}
            <Avatar
              variant="circular"
              src={user?.profile_image}
              alt="foto de perfil"
              sx={{ width: "100px", height: "100px" }}
            />
            {/* Información básica del usuario */}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Usuario : {user._id}
            </Typography>
            <Typography variant="h5" component="div">
              {user?.fullname}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user?.email}
            </Typography>
            <Typography variant="body2">
              Tipo de usuario:
              <br />
              {user?.type_customer === "0"
                ? "Cliente"
                : user?.type_customer === "1"
                ? "Lavador independiente"
                : user?.type_customer === "2"
                ? "Establecimiento"
                : "administrador"}
            </Typography>
            <Typography variant="body2">Numero de telefono:</Typography>
            {/* Muestra el número de teléfono del usuario o un mensaje si no está registrado */}
            {user.phone?.phone_number
              ? user?.phone.phone_number
              : "No hay telefono registrado"}
          </CardContent>
        </Card>
      </Grid>

      {/* Documentos */}
      <Grid
        container
        display={"flex"}
        minHeight={"50vh"}
        justifyContent={"center"}
        alignContent={"center"}
        direction={"row"}
      >
        {/* Componente RFC */}
        <CardContent>
          {/* Modal para visualizar el documento */}
          <ModalDocuments
            pdfPath={pathCsf?.url}
            name={"Comprobante de siruación fiscal"}
          />
          {/* Muestra el motivo de rechazo si existe */}
          {pathCsf?.message === undefined ||
          (pathCsf?.message.length > 0 && pathCsf?.verify === false) ? (
            <Paper elevation={5} sx={{ padding: "20px" }}>
              <Typography variant="h5">Motivo de rechazo:</Typography>
              {pathCsf?.message}
            </Paper>
          ) : null}
          <CardActions>
            {/* Botón para verificar el documento */}
            <VerifyButton pathFile={pathCsf} />
          </CardActions>
        </CardContent>
      </Grid>

      {/* Botones para verificar la cuenta o salir */}
      <Grid
        display={"flex"}
        justifyContent={"center"}
        marginBottom={"3rem"}
        minHeight={"5vh"}
        width="100%"
      >
        {pathCsf?.verify === true ? (
          <Button onClick={handleClickOpen} variant="contained">
            Verificar cuenta
          </Button>
        ) : (
          <Button disabled onClick={handleClickOpen} variant="contained">
            Verificar cuenta
          </Button>
        )}
        <Button onClick={out} variant="outlined" color="secondary">
          Salir
        </Button>
      </Grid>

      {/* Diálogo de confirmación para verificar la cuenta */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"¿Estas seguro(a) de verificar la cuenta?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Recuerda que verificar la documentacion correcta es tu
            responsabilidad
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={verification} autoFocus>
            Verificar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Documentation;
