import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Image from 'mui-image'
import imageLogotipo from './../assets/Images/CHMX/Imagotipo CHMX Negro.png'
import Typography from '@mui/material/Typography'
import { useAuthStore } from '../hooks'
import FavWhatsapp from '../components/Buttons/FavWhatsapp'
import { Button } from '@mui/material'
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
    <div>
        <Grid container spacing={0} display={'flex'} justifyContent={'center'}>
          {/* <ul>
          {
            messages.map((message, index)=>{
              return (
                <li key={index}>{message}</li>
              );              
            })
          }
          </ul> */}
            <Image src={imageLogotipo} easing='linear' fit='cover' title='Home' >
            </Image>
            <Typography variant="h1" color="initial">Bienvenido: {user.fullname}</Typography>
            <FavWhatsapp phoneNumber={'7294020831'} message={'En que le puedo ayudar?'}/>
          
        </Grid>

        {/* <Button onClick={handleClick}>
          Emitir evento
        </Button> */}
      
    </div>
  )
}

export default Home
