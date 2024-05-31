import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { useAuthStore } from '../../hooks'




export const MyStoreHouse = () => {

   const {navigate}= useAuthStore()
  return (
    <Grid container
    display={'flex'}
    justifyContent={'center'}
     spacing={0}>
        <Grid
          item 
          xs={12}
          display={'flex'}
          justifyContent={'center'}
        >   
        <Typography variant="h1" color="primary">Mi Almacén</Typography>
        </Grid>
        <Grid item container width={'80%'} flexDirection={{xs:'column', lg:'row'}} marginTop={2} display={'flex'} justifyContent={{xs:'center'}} >
           <Button  onClick={()=>navigate('/auth/Productos')} variant="contained" sx={{width:'400px', height:'200px', m:2}} color="secondary">
             Productos
           </Button>
           <Button onClick={()=>navigate('/auth/MiAlmacen/stock')}variant="contained" sx={{width:'400px', height:'200px', m:2}} color="secondary">
             Stock de productos
           </Button>
           <Button onClick={()=>navigate('/auth/MiAlmacen/product-orders')} variant="contained" sx={{width:'400px', height:'200px', m:2}} color="secondary">
             Ordenes de Compra
           </Button>
          
        </Grid>
    </Grid>
  )
}
