import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Button, IconButton, Divider, Badge, Modal, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterIcon from '@mui/icons-material/Filter';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import useImages from '../../../hooks/useImages';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 19,
    top: 18,
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display:'flex',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 0.5,
};

const ImagesBranchComponent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { images, handleImageChange, deleteImage } = useImages();
  
  return (
    <>
    <Grid item xs={6} sx={{backgroundColor:'#F7F7F7'}} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} marginTop={'20px'} height={'300px'} borderRadius={'5px'} >
       <FilterIcon style={{fontSize:'40px', alignSelf:'center'}}/>  
       {/* <Typography>Agrega imagenes de tu sucursal</Typography> */}
       <Button sx={{ alignSelf:'center', marginTop:'10px'}} color='primary' variant='outlined' onClick={handleOpen}>Agrega Fotos</Button>
    </Grid>
    {/* Modal para seleccionar y subir imagenes */}
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container>
          <Grid className='close-modal' item xs={3} display={'flex'} justifyContent={'flex-start'}>
            <IconButton onClick={handleClose}>
              <ClearIcon style={{ fontSize: '20px' }} />
            </IconButton>
          </Grid>
          <Grid item xs={6} className='message-modal' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
            <Typography variant='body1' fontWeight={900} >Sube las fotos</Typography>
            <Typography sx={{ fontSize: '11px' }}>Minimo 3 imagenes</Typography>
          </Grid>

          <Grid item className='add-image-modal' xs={3} display={'flex'} justifyContent={'flex-end'}>
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

          <Grid item container display={'flex'} justifyContent={'center'}  alignItems={'center'}>
           
            
            { 
              images.length?
              <Grid container spacing={1} item display={'flex'} justifyContent={'flex-start'} padding={'6px'}>
                {images.map(({id,filePreview})=>
                <Grid item xs={6} key={id}>
                  <StyledBadge badgeContent={<IconButton sx={{backgroundColor:'black', color:'black'}} onClick={()=>deleteImage(id)}> <DeleteIcon sx={{color:'white', fontSize:'20px'}}/> </IconButton>}>
                    <Avatar src={filePreview} variant='square' sx={{width:'100%', height:'200px'}} /> 
                  </StyledBadge>
                </Grid>)}
              </Grid>
              : 
              <Box sx={{height:'250px', display:'flex', alignItems:'center'}}>
                <input
                  id='image'
                  name='image'
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  hidden
                />
                <label htmlFor={'image'}>
                  <Button variant="outlined" component="span" >
                    Explorar
                  </Button>
                </label>
            </Box>
            }
       
          </Grid>

          <Grid className='footer-buttons' item xs={12} display={'flex'}>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-start'}>
              <Button variant='text' size='medium'>Listo</Button>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
              <Button variant='contained' size='medium' disabled={!(images.length===3)}>Guardar</Button>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </Modal>
    </>
      
    
  )
}

export default ImagesBranchComponent
