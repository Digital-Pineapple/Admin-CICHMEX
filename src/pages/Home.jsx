import React, { useEffect, useState } from 'react'

import Image from 'mui-image'
import imageLogotipo from './../assets/Images/CHMX/Imagotipo CHMX Naranja.png'
import Typography from '@mui/material/Typography'
import { useAuthStore } from '../hooks'
import FavWhatsapp from '../components/Buttons/FavWhatsapp'
import { Button, Grid2 } from '@mui/material'
import io from 'socket.io-client'

// const socket = io.connect(import.meta.env.VITE_SOCKET_URL)
const Home = () => {
  // const [messages, setMessages] = useState([])
  //   useEffect(()=>{
  //     socket.on("received_message", (data)=>{
  //       setMessages(prev => [...prev, data])
  //     })

  //   },[socket]);

  //   const handleClick = () => {
  //     console.log("el evento fue emitido")                 
             
  //   }
    const {user} = useAuthStore()
  return (
        <Grid2 width={'100%'} paddingX={{xs:0, md:10}} container gap={2} display={'flex'} justifyContent={'center'}>
           <Grid2 size={12}>
            <Typography padding={{xs:2,lg:4}} variant="h1" fontSize={{xs:'30px', md:'45px'}} color="initial">Bienvenido: {user.fullname}</Typography>
            <img style={{width:'100%'}} src={imageLogotipo}/>
           </Grid2>
            
        </Grid2>
      

  )
}

export default Home
