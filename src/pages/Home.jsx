import React from 'react'
import Grid from '@mui/material/Grid'
import Image from 'mui-image'
import imageLogotipo from './../assets/Images/CHMX/Imagotipo CHMX Negro.png'
import Typography from '@mui/material/Typography'
import { useAuthStore } from '../hooks'
import FavWhatsapp from '../components/Buttons/FavWhatsapp'

const Home = () => {
    const {user} = useAuthStore()
  return (
    <div>
        <Grid container spacing={0} display={'flex'} justifyContent={'center'}>
            <Image src={imageLogotipo} easing='linear' fit='cover' title='Home' >
            </Image>
            <Typography variant="h1" color="initial">Bienvenido: {user.fullname}</Typography>
            <FavWhatsapp phoneNumber={'7294020831'} message={'En que le puedo ayudar?'}/>
          
        </Grid>
      
    </div>
  )
}

export default Home
