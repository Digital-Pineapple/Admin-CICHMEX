import React, { useEffect, useState } from 'react'

import Image from 'mui-image'
import imageLogotipo from './../assets/Images/CHMX/Imagotipo CHMX Naranja.png'
import imagotipo from '../assets/Images/CHMX/Imagotipo Cuadrado CHMX.png'
import Typography from '@mui/material/Typography'
import { useAuthStore } from '../hooks'
import FavWhatsapp from '../components/Buttons/FavWhatsapp'
import { Button, Grid2 } from '@mui/material'
import io from 'socket.io-client'

// Componente principal de la página de inicio
const Home = () => {
  // Obtiene la información del usuario autenticado desde el hook personalizado
  const { user } = useAuthStore()

  return (
    // Contenedor principal con diseño responsivo
    <Grid2 width={'100%'} paddingX={{ xs: 0, md: 10 }} container gap={2} display={'flex'} justifyContent={'center'}>
      
      {/* Sección para pantallas grandes */}
      <Grid2 size={12} display={{ xs: 'none', md: 'block' }} justifyContent={'center'} alignItems={'center'} padding={2}>
        {/* Mensaje de bienvenida con el nombre del usuario */}
        <Typography padding={{ xs: 2, lg: 4 }} variant="h1" fontSize={{ xs: '30px', md: '45px' }} color="initial">
          Bienvenido: {user.fullname}
        </Typography>
        {/* Imagen del logotipo principal */}
        <img style={{ width: '100%' }} src={imageLogotipo} />
      </Grid2>

      {/* Sección para pantallas pequeñas */}
      <Grid2 size={12} display={{ xs: 'block', md: 'none' }} justifyContent={'center'} alignItems={'center'} padding={2}>
        {/* Mensaje de bienvenida con el nombre del usuario */}
        <Typography padding={{ xs: 2, lg: 4 }} fontWeight={'Bold'} variant="h1" fontSize={{ xs: '40px', md: '45px' }} color="initial">
          Bienvenido: {user.fullname}
        </Typography>
        {/* Imagen del logotipo alternativo */}
        <img style={{ width: '100%' }} src={imagotipo} />
      </Grid2>
    </Grid2>
  )
}

export default Home
