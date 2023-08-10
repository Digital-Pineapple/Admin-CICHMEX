import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Tooltip } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useDocumentations } from "../../hooks/useDocumentation";
import { enqueueSnackbar } from "notistack";

import { red } from "@mui/material/colors";
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFormik } from "formik";
import { message } from "antd";

const VerifyButton = ({pathFile}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('')
    const {varifyDocumentation}= useDocumentations();
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

useEffect(() => {
  setSuccess(!pathFile?.verify)
}, [pathFile])


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
          return enqueueSnackbar("Se rechazo este archivo", {
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
        }}
    

    const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: red[500],
      '&:hover': {
        bgcolor: red[700],
      },
    }),
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Tooltip title='Rechzar'>
      <Box sx={{ m: 2, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleClickOpen}
          >
          {success? <ClearIcon /> : <HighlightOffIcon />}
        </Fab>
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
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Motivo de rechazo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Describe el motivo de rechazo del documento
          </DialogContentText>
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
          <Button onClick={onVerify}  >Rechazar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog> 
    </div>
  )
}

export default VerifyButton
