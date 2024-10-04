import React from 'react'
import Grid from '@mui/material/Grid'
import Image from 'mui-image'
import imageLogotipo from './../assets/Images/CHMX/Imagotipo CHMX Negro.png'
import Typography from '@mui/material/Typography'
import { useAuthStore } from '../hooks'

const Home = () => {
    const {user} = useAuthStore()
  return (
    <div>
        <Grid container spacing={0} display={'flex'} justifyContent={'center'}>
            <Image src={imageLogotipo} easing='linear' fit='cover' title='Home' >
            </Image>
            <Typography variant="h1" color="initial">Bienvenido: {user.fullname}</Typography>
          
        </Grid>
      
    </div>
  )
}

export default Home
