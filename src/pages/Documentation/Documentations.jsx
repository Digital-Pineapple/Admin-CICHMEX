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
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadDocumentation, documentations } = useDocumentations();
  const { loadUser, user, verifyUser} = useUsers()

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadUser(id);
    loadDocumentation(id);
  }, [id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const out = () => {
    navigate("/auth/usuarios", { replace: true });
  };
  const findFile = (name, targetName) => {
    return documentations.find(
      (documentations) => documentations.name === targetName
    );
  };
  const verification = () => {
      verifyUser(id);
      setOpen(false)
  };

  const pathCsf = findFile(documentations.name, "csf");
 


  return (
    <Box marginX={"10%"}>


      <Titles name={<h2 align="center">Verificar Documentos</h2>} />

        {/* Informacion de usuario */}
      
        <Grid container display={'block'} justifyContent={'center'} alignContent={'center'}>
          <Card sx={{ minWidth: "50%" }}>
            <CardContent>
              <Avatar
                variant="circular"
                src={user?.profile_image}
                alt="foto de perfil"
                sx={{ width: "100px", height: "100px" }}
              />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
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

              {user.phone?.phone_number
                ? user?.phone.phone_number
                : "No hay telefono registrado"}
            </CardContent>
          </Card>
        </Grid>
        {/* Documentos */}

  

        <Grid container display={'flex'} minHeight={'50vh'} justifyContent={'center'} alignContent={'center'} direction={"row"}>
        {/* Componente RFC */}

          <CardContent>
            <ModalDocuments
              pdfPath={pathCsf?.url}
              name={"Comprobante de siruación fiscal"}
            />
            {pathCsf?.message === undefined ||
            (pathCsf?.message.length > 0 && pathCsf?.verify === false) ? (
              <Paper elevation={5} sx={{ padding: "20px" }}>
                <Typography variant="h5">Motivo de rechazo:</Typography>
                {pathCsf?.message}
              </Paper>
            ) : null}
            <CardActions>
              <VerifyButton pathFile={pathCsf} />
            </CardActions>
          </CardContent>


        </Grid>

      <Grid display={'flex'}  justifyContent={"center"} marginBottom={'3rem'}  minHeight={'5vh'} width="100%">
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
