import React, { useEffect } from 'react'
import {Grid, Typography, Card, CardContent, CardActions,Button} from '@mui/material'
import { useBranches } from '../../hooks/useBranches'
import { useParams } from 'react-router-dom'
import { GoogleMap } from '../../components/Google/GoogleMap'

export const BranchDetail = () => {
    const { id,  } = useParams();
    const {loadOneBranch, branch, verifyOneBranch}=  useBranches()

    useEffect(() => {
     loadOneBranch(id)
    }, [id])

    
  return (
   <Grid container paddingX={'10%'} justifyContent={'center'} spacing={2} boxSizing={'border-box'} display={'flex'} width={'100%'}
    minHeight={'80vh'}>
        <Grid  item xs={12}>
    <Typography textAlign={'center'} variant="h1" fontSize={{xs:'35px'}} color="primary">
        Susursal:{branch?.name}
    </Typography>
        </Grid>
          
   <Grid item  xs={12} md={5}>
    <Card >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Descripción
        </Typography>
        
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {branch?.description}
        </Typography>
        <Typography variant="body1">
            Hora de apertura : {branch.opening_time}
            <br/>
            Hora de cierre : {branch.closing_time}
        </Typography>
        <Typography variant="body1">
           Estado:{branch.location?.state}
        </Typography>
        <Typography variant="body1">
            Municipio:{branch.location?.municipality}
        </Typography>
        <Typography variant="body1">
            Dirección:{branch.location?.direction}
        </Typography>
        <br />
        <Typography variant="body1">
            id:{branch.user_id?._id}
        </Typography>
        <Typography variant="body1">
            Encargado:{branch.user_id?.fullname}
        </Typography>
        <Typography variant="body1">
            Correo:{branch.user_id?.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>{verifyOneBranch(id, branch.user_id._id)}} size="small">Activar</Button>
      </CardActions>
    </Card>
   </Grid>
<Grid item xs={12} md={5} >
    <GoogleMap location ={branch.location}/>
</Grid>

   </Grid>
  )
}
