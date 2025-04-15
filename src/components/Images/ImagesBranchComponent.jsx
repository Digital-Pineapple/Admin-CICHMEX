import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Button, IconButton, Divider, Badge, Modal, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterIcon from '@mui/icons-material/Filter';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import useImages from '../../../hooks/useImages';

// Componente personalizado para el estilo del Badge
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 19,
    top: 18,
  },
}));

// Estilo para el modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 0.5,
};

const ImagesBranchComponent = () => {
  // Estado para controlar la apertura del modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true); // Función para abrir el modal
  const handleClose = () => setOpen(false); // Función para cerrar el modal

  // Hook personalizado para manejar las imágenes
  const { images, handleImageChange, deleteImage } = useImages();

  return (
    <>
      {/* Contenedor principal para mostrar el botón de agregar fotos */}
      <Grid 
        item 
        xs={6} 
        sx={{ backgroundColor: '#F7F7F7' }} 
        display={'flex'} 
        flexDirection={'column'} 
        alignItems={'center'} 
        justifyContent={'center'} 
        marginTop={'20px'} 
        height={'300px'} 
        borderRadius={'5px'}
      >
        {/* Icono de filtro */}
        <FilterIcon style={{ fontSize: '40px', alignSelf: 'center' }} />  

        {/* Botón para abrir el modal */}
        <Button 
          sx={{ alignSelf: 'center', marginTop: '10px' }} 
          color='primary' 
          variant='outlined' 
          onClick={handleOpen}
        >
          Agrega Fotos
        </Button>
      </Grid>
  
      {/* Modal para subir y gestionar imágenes */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            {/* Botón para cerrar el modal */}
            <Grid className='close-modal' item xs={3} display={'flex'} justifyContent={'flex-start'}>
              <IconButton onClick={handleClose}>
                <ClearIcon style={{ fontSize: '20px' }} />
              </IconButton>
            </Grid>

            {/* Mensaje en el modal */}
            <Grid 
              item 
              xs={6} 
              className='message-modal' 
              display={'flex'} 
              justifyContent={'center'} 
              flexDirection={'column'} 
              alignItems={'center'}
            >
              <Typography variant='body1' fontWeight={900}>Sube las fotos</Typography>
              <Typography sx={{ fontSize: '11px' }}>Minimo 3 imagenes</Typography>
            </Grid>

            {/* Botón para agregar imágenes */}
            <Grid 
              item 
              className='add-image-modal' 
              xs={3} 
              display={'flex'} 
              justifyContent={'flex-end'}
            >
              <input
                id='imageicon'
                name='imageicon'
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                hidden
              />
              <label htmlFor={'imageicon'}>
                <IconButton component="span">
                  <AddIcon />
                </IconButton>
              </label>
            </Grid>

            {/* Contenedor para mostrar las imágenes subidas */}
            <Grid 
              item 
              container 
              display={'flex'} 
              justifyContent={'center'}  
              alignItems={'center'}
            >
              { 
                images.length ? (
                  // Si hay imágenes, se muestran en un grid
                  <Grid 
                    container 
                    spacing={1} 
                    item 
                    display={'flex'} 
                    justifyContent={'flex-start'} 
                    padding={'6px'}
                  >
                    {images.map(({ id, filePreview }) => (
                      <Grid item xs={6} key={id}>
                        <StyledBadge 
                          badgeContent={
                            <IconButton 
                              sx={{ backgroundColor: 'black', color: 'black' }} 
                              onClick={() => deleteImage(id)}
                            > 
                              <DeleteIcon sx={{ color: 'white', fontSize: '20px' }} /> 
                            </IconButton>
                          }
                        >
                          <Avatar 
                            src={filePreview} 
                            variant='square' 
                            sx={{ width: '100%', height: '200px' }} 
                          /> 
                        </StyledBadge>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  // Si no hay imágenes, se muestra un botón para explorar archivos
                  <Box sx={{ height: '250px', display: 'flex', alignItems: 'center' }}>
                    <input
                      id='image'
                      name='image'
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleImageChange}
                      hidden
                    />
                    <label htmlFor={'image'}>
                      <Button variant="outlined" component="span">
                        Explorar
                      </Button>
                    </label>
                  </Box>
                )
              }
            </Grid>

            {/* Botones en el pie del modal */}
            <Grid className='footer-buttons' item xs={12} display={'flex'}>
              {/* Botón "Listo" */}
              <Grid item xs={6} display={'flex'} justifyContent={'flex-start'}>
                <Button variant='text' size='medium'>Listo</Button>
              </Grid>
              {/* Botón "Guardar" habilitado solo si hay 3 imágenes */}
              <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
                <Button 
                  variant='contained' 
                  size='medium' 
                  disabled={!(images.length === 3)}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default ImagesBranchComponent
