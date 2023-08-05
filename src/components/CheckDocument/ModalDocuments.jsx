import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup'
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Tooltip from '@mui/material/Tooltip';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalDocuments = ({name, pdfPath, success1}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(success1);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      success();
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        
      }, 2000);
    }
  };


  return (
    <div>
      <ButtonGroup variant="contained" color="primary" aria-label="">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button fullWidth onClick={handleOpen}>{name}</Button>
      
     
    </Box>
      </ButtonGroup>

      <Dialog
        
        open={open}
        onClose={handleClose}
        aria-labelledby="documentación"
      >
        <DialogTitle id="name">
          {name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {pdfPath? pdfPath && (<embed src={pdfPath}
          type="application/pdf" width="100%" height="600px" 
          />):'no hay documento'}
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        <Tooltip title='Verificar'>
      <Box sx={{ m: 2, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <AddTaskIcon />}
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
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalDocuments





 