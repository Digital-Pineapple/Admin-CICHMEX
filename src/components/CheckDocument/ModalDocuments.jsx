import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import { green, red } from '@mui/material/colors';
import Fab from '@mui/material/Fab';

import Tooltip from '@mui/material/Tooltip';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Estilo personalizado para el modal
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

// Componente ModalDocuments que recibe las propiedades `name` y `pdfPath`
const ModalDocuments = ({ name, pdfPath }) => {
  // Estado para controlar si el modal está abierto o cerrado
  const [open, setOpen] = React.useState(false);

  // Función para abrir el modal
  const handleOpen = () => setOpen(true);

  // Función para cerrar el modal
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Grupo de botones que contiene el botón para abrir el modal */}
      <ButtonGroup variant="contained" color="primary" aria-label="">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Botón que muestra el nombre del documento y abre el modal al hacer clic */}
          <Button fullWidth onClick={handleOpen}>{name}</Button>
        </Box>
      </ButtonGroup>

      {/* Componente Dialog que actúa como modal */}
      <Dialog
        open={open} // Controla si el modal está abierto o cerrado
        onClose={handleClose} // Cierra el modal al hacer clic fuera o en el botón de cerrar
        aria-labelledby="documentación"
      >
        {/* Título del modal que muestra el nombre del documento */}
        <DialogTitle id="name">
          {name}
        </DialogTitle>

        {/* Contenido del modal */}
        <DialogContent>
          <DialogContentText>
            {/* Si existe `pdfPath`, se muestra el documento PDF incrustado, de lo contrario, se muestra un mensaje */}
            {pdfPath ? (
              <embed
                src={pdfPath} // Ruta del archivo PDF
                type="application/pdf"
                width="100%"
                height="600px"
              />
            ) : (
              'no hay documento' // Mensaje cuando no hay documento disponible
            )}
          </DialogContentText>
        </DialogContent>

        {/* Acciones del modal, como el botón para cerrarlo */}
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalDocuments;