import { Grid2, Typography, Grid, Card, CardContent, CardActions, Button, CardHeader, Avatar, IconButton, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useAuthStore } from '../../hooks'
import { Security } from '@mui/icons-material'
import { borderRadius, Box } from '@mui/system'
import ChangePassword from './ChangePassword'

const MyAccount = () => {
  const { user } = useAuthStore() // Hook para obtener la información del usuario autenticado
  const [openModal, setOpenModal] = useState(false) // Estado para controlar la apertura del modal
  const { fullname, type_user, email, profile_image } = user // Desestructuración de los datos del usuario
  const TYPES_USER = {
    'SUPER-ADMIN':  'Super Administrador' ,
    'ADMIN':  'Administrador',
    'SUB-ADMIN': 'Sub administrador' ,
    'CARRIER-DRIVER': 'Transportista' 
  };

  // Estilo para el modal
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

  // Función para abrir el modal
  const handleOpen = () => setOpenModal(true);

  // Función para cerrar el modal
  const handleClose = () => setOpenModal(false);
  
  return (
    <Grid2 container gap={2} maxWidth={"85vw"}>
      {/* Título principal de la página */}
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

      {/* Contenedor principal con dos tarjetas */}
      <Grid2 container width={'100%'} gap={2} >
        {/* Tarjeta de información personal */}
        <Grid2 size={4}>
          <Card sx={{width:'100%'}}  variant="elevation" >
            <CardHeader
              title="Información personal"
              subheader={`${fullname}`}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                {/* Avatar con la imagen de perfil */}
                <Avatar  sx={{width:'150px', height:'150px'}}  aria-label="image-profile">
                  <img src={profile_image} alt="image_profile" />
                </Avatar>
              
              {/* Información del usuario */}
              <Typography variant="body1" marginTop={2} color="initial">
                <strong>Tipo de usuario: </strong> {TYPES_USER[type_user? type_user.role[0]: null]} <br />
                <strong>Correo: </strong> {email}
              </Typography>
            </CardContent>
            <CardActions>
              {/* Espacio reservado para futuras acciones */}
            </CardActions>
          </Card>
        </Grid2>

        {/* Tarjeta de seguridad */}
        <Grid2 size={4}>
          <Card sx={{width:'100%', height:'100%'}} variant="elevation">
            <CardHeader
              title="Seguridad"
              subheader=""
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {/* Icono de seguridad */}
              <Avatar  sx={{width:'100px', height:'100px'}}  aria-label="image-profile">
                <Security sx={{width:'90%', height:'80%'}}/>
              </Avatar>
            </CardContent>
            <CardActions>
              {/* Botón para abrir el modal de cambio de contraseña */}
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

      {/* Modal para cambiar la contraseña */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-change-password"
        aria-describedby="modal-modal-change-password"
      >
        <Box sx={style}>
          {/* Componente para manejar el cambio de contraseña */}
          <ChangePassword handleClose={handleClose}/>
        </Box>
      </Modal>
    </Grid2>
  )
}

export default MyAccount
