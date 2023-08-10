import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup'
import CircularProgress from '@mui/material/CircularProgress';
import { green, red } from '@mui/material/colors';
import Fab from '@mui/material/Fab';

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

const ModalDocuments = ({name, pdfPath }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



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
          <Button onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}

export default ModalDocuments





 