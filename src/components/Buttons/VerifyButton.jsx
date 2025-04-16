import {
  Cancel,
  DoneAll,
  HighlightOff,
  VerifiedOutlined,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import { useDocumentations } from "../../hooks/useDocumentation";
import { enqueueSnackbar } from "notistack";
import { green, red } from "@mui/material/colors";
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Tooltip } from "@mui/material";

// Componente principal que representa un botón para verificar o rechazar documentos
const VerifyButton = ({ pathFile }) => {
  const { varifyDocumentation } = useDocumentations();
  const [validate, setValidate] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const timer = useRef();

  // Abre el diálogo para ingresar el motivo de rechazo
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Cierra el diálogo de rechazo
  const handleClose = () => {
    setOpen(false);
  };

  // Estilo para el botón de verificación
  const styleVerify = {
    ...(validate && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  }

  // Estilo para el botón de rechazo
  const styleRefused = {
    ...(!validate && {
      bgcolor: red[500],
      "&:hover": {
        bgcolor: red[700],
      },
    }),
  }

  // Efecto que actualiza el estado de validación cuando cambia el archivo
  useEffect(() => {
    setValidate(pathFile?.verify)
    clearTimeout(timer.current);
  }, [pathFile]);

  // Función para manejar la validación del documento
  const validation = () => {
    if (!loading) {
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setLoading(false)
        setValidate(true)
        try {
          varifyDocumentation(pathFile._id, true);
          return enqueueSnackbar("Se verificó con exito", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        } catch (error) {
          setLoading(false);
          setValidate(false)
          return enqueueSnackbar(`Hubo un error`, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      }, 2000);
    }
  };

  // Función para manejar el rechazo del documento
  const refused = () => {
    if (!loading2) {
      setLoading2(true);
      timer.current = window.setTimeout(() => {
        setValidate(false)
        setLoading2(false)
        try {
          varifyDocumentation(pathFile._id, false, message);
          setOpen(false);
          return enqueueSnackbar("Se rechazo con exito", {
            variant: 'warning',
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        } catch (error) {
          setLoading2(false);
          setValidate(true)
          return enqueueSnackbar(`Hubo un error`, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      }, 2000);
    }
  };

  return (
    <>
      {/* Botón para aceptar/verificar el documento */}
      <Tooltip title="Aceptar">
        <Box sx={{ m: 2, position: "relative" }}>
          <Fab
            aria-label="save"
            color="primary"
            sx={styleVerify}
            onClick={validation}
          >
            {validate ? <DoneAll /> : <VerifiedOutlined />}
          </Fab>
          {loading && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Tooltip>

      {/* Botón para rechazar el documento */}
      <Tooltip title="Rechazar">
        <Box sx={{ m: 2, position: "relative" }}>
          <Fab
            aria-label="refused"
            color="primary"
            sx={styleRefused}
            onClick={handleClickOpen}
          >
            {!validate ? <Cancel /> : <HighlightOff />}
          </Fab>
          {loading2 && (
            <CircularProgress
              size={68}
              sx={{
                color: red[500],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Tooltip>

      {/* Diálogo para ingresar el motivo de rechazo */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Motivo de rechazo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Describe el motivo de rechazo del documento
          </DialogContentText>
          <form onSubmit={refused}>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              name="message"
              label=""
              type="text"
              fullWidth
              variant='filled'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={refused}>Rechazar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VerifyButton;
