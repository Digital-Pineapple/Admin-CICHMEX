import { Box, CircularProgress, Fab, Tooltip } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { green } from "@mui/material/colors";
import { useDocumentations } from "../../hooks/useDocumentation";
import { enqueueSnackbar } from "notistack";

const VerifyButton = ({pathFile}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(pathFile?.verify | '' )
    const {varifyDocumentation}= useDocumentations();
    useEffect(() => {
      setSuccess(pathFile?.verify)

    }, [pathFile])

    const onVerify = () => {
        if (!loading) {
          setSuccess();
          setLoading(true);
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            
          
            
          }, 2000);
        }
        try {
          varifyDocumentation(pathFile._id,true,'');
          return enqueueSnackbar("Se verifico con exito", {
            variant: 'success',
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        } catch (error) {
          setSuccess(false);
          return enqueueSnackbar("Error al verificar documento", {
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
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  
  return (
    <div>
      <Tooltip title='Verificar'>
      <Box sx={{ m: 2, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={onVerify}
          >
          {success === true ? <CheckIcon /> : <AddTaskIcon />}
        </Fab>
        {loading && (
          <CircularProgress
          size={68}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
          />
          )}
      </Box>
    </Tooltip>  
    </div>
  )
}

export default VerifyButton
