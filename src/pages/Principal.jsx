import { Grid, ButtonGroup, Button} from '@mui/material'
import Carwash from '../assets/Images/icono1.png'
import Image from 'mui-image'
import { LogoutButton } from '../components/Buttons/LogoutButton'


export const Principal = () => {
  return (
    <>
      <Grid sx={{margin:'10%'}} >
        <Grid container spacing={4}>
            <Button>Usuarios</Button>
            <Button>Lavadores independientes</Button>
            <Button>Administradores</Button>
            <Button></Button>
        </Grid>
      <LogoutButton />
      </Grid>
      
     
    </>
  )
}