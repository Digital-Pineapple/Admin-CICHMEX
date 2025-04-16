import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Tooltip } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useDocumentations } from "../../hooks/useDocumentation";
import { enqueueSnackbar } from "notistack";

import { red } from "@mui/material/colors";
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from "formik";
import { message } from "antd";

// Componente principal que representa un botón para rechazar un documento
const VerifyButton = ({pathFile}) => {
  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(false);
  // Estado para manejar el éxito de la operación
  const [success, setSuccess] = useState('')
  // Hook personalizado para manejar la verificación de documentos
  const {varifyDocumentation}= useDocumentations();
  // Estado para manejar la apertura del diálogo
  const [open, setOpen] = useState(false)
  // Estado para almacenar el mensaje de rechazo
  const [message, setMessage] = useState('')

  // Efecto para actualizar el estado de éxito basado en la propiedad `verify` del archivo
  useEffect(() => {
    setSuccess(!pathFile?.verify)
  }, [pathFile])

  // Función para manejar la verificación/rechazo del documento
  const onVerify = () => {
    if (!loading) {
      setOpen(true)
      setSuccess();
      setLoading(true);
      timer.current = window.setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      }, 2000);
    }
    try {
      varifyDocumentation(pathFile._id,false,message);
      setOpen(false);
      return enqueueSnackbar("Se rechazó este archivo", {
      variant: 'error',
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      });
    } catch (error) {
      setSuccess(false);
      return enqueueSnackbar(`Hubo un error: ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      });
    }
  }

  // Referencia para manejar el temporizador
  const timer = useRef();

  // Estilo dinámico para el botón basado en el estado de éxito
  const buttonSx = {
    ...(success && {
      bgcolor: red[500],
      '&:hover': {
      bgcolor: red[700],
      },
    }),
  };

  // Efecto para limpiar el temporizador al desmontar el componente
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  // Función para abrir el diálogo
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Función para cerrar el diálogo
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      {/* Tooltip que muestra información sobre el botón */}
      <Tooltip title='Rechazar'>
        <Box sx={{ m: 2, position: 'relative' }}>
          {/* Botón flotante para rechazar */}
          <Fab
            aria-label="save"
            color="primary"
            sx={buttonSx}
            onChange={handleClickOpen}
          >
            {success ? <ClearIcon /> : <HighlightOffIcon />}
          </Fab>
          {/* Indicador de carga */}
          {loading && (
            <CircularProgress
              size={68}
              sx={{
                color: red[500],
                position: 'absolute',
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
          {/* Formulario para ingresar el mensaje */}
          <form onSubmit={onVerify}>
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
          {/* Botón para confirmar el rechazo */}
          <Button onClick={onVerify}>Rechazar</Button>
          {/* Botón para cancelar */}
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog> 
    </div>
  )
}

export default VerifyButton
