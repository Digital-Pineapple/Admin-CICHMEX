import { Grid2, Typography, Grid, Card, CardContent, CardActions, Button, CardHeader, Avatar, IconButton, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useAuthStore } from '../../hooks'
import { Security } from '@mui/icons-material'
import { borderRadius, Box } from '@mui/system'
import ChangePassword from './ChangePassword'

const MyAccount = () => {
  const { user } = useAuthStore()
  const [openModal, setOpenModal] = useState(false)
  const { fullname, type_user, email, image_profile } = user
  const TYPES_USER = {
    'SUPER-ADMIN':  'Super Administrador' ,
    'ADMIN':  'Administrador',
    'SUB-ADMIN': 'Sub administrador' ,
    'CARRIER-DRIVER': 'Transportista' 
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius:'15px',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  
  return (
    <Grid2 container gap={2} maxWidth={"85vw"}>
      <Grid2
        marginTop={{ xs: "-30px" }}
        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Mi perfil
        </Typography>
      </Grid2>
      <Grid2 container width={'100%'} gap={2} >
        <Grid2 size={4}>
          <Card sx={{width:'100%'}}  variant="elevation" >
            <CardHeader
              title="Información personal"
              subheader={`${fullname}`}

            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                <Avatar  sx={{width:'150px', height:'150px'}}  aria-label="image-profile">
                  <img src={image_profile} alt="image_profile" />
                </Avatar>
              
              <Typography variant="body1" marginTop={2} color="initial">
                <strong>Tipo de usuario: </strong> {TYPES_USER[type_user? type_user.role[0]: null]} <br />
                <strong>Correo: </strong> {email}
              </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
          </Card>
        </Grid2>
        <Grid2 size={4}>
          <Card sx={{width:'100%', height:'100%'}} variant="elevation">
            <CardHeader
              title="Seguridad"
              subheader=""
              
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar  sx={{width:'100px', height:'100px'}}  aria-label="image-profile">
                  <Security sx={{width:'90%', height:'80%'}}/>
                </Avatar>
              
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                size="small"
                onClick={()=>handleOpen()}
              >
                Cambiar contraseña
              </Button>
            </CardActions>
          </Card>

        </Grid2>
      </Grid2>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-change-password"
        aria-describedby="modal-modal-change-password"
      >
        <Box sx={style}>
          <ChangePassword handleClose={handleClose}/>
        </Box>
      </Modal>
    </Grid2>
  )
}

export default MyAccount
