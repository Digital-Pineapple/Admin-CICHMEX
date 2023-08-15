import { Grid, ButtonGroup, Button, Paper, Typography, Avatar, TextField, Input, FormControl, InputLabel, InputAdornment, Chip} from '@mui/material'
import Carwash from '../assets/Images/icono1.png'
import Image from 'mui-image'
import { LogoutButton } from '../components/Buttons/LogoutButton'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';
import ImageAvatar from '../assets/Images/Icono App2.png'
import { AccountCircle, Mail } from '@mui/icons-material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

export const Principal = () => {
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = React.useState('1');
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    formik.setValues({
      name: user.fullname,
      email: user.email,
      
    });
  }, [user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email:'',
    },
    onSubmit: (values) => {
      try {
        navigate("/auth/servicios", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al editar", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });
  return (
    <>
      <Grid sx={{marginX:'10%'}}   >
  <Typography variant="h4" color="initial">
    Cuenta
  </Typography>
      <Box sx={{ width: '100%', typography: 'body1', }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Mis datos" value="1" />
            <Tab label="Configuración" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
<Paper sx={{padding:'5%', borderRadius:'20px'}}  variant="elevation" elevation="10" >
  <Grid container >
  <Grid item xs={4} >
    <Typography variant='h4'>Información básica</Typography>
  </Grid>
  <Grid item xs={8} 
  component="form"
 onSubmit={formik.handleSubmit} 
  sx={{
    '& .MuiTextField-root': { m: 1, width: '90%' },
  }}
  noValidate
  autoComplete="off"
>
    <Avatar 
    src={user.image_profile? user.image_profile : ImageAvatar}
    sx={{ width: 100, height: 100, border:5, borderColor:'#902282', margin:1}}/>
   <Chip sx={{marginY:1}} variant="outlined" color="info" label={`id: ${user._id}`} />

      <TextField
          id="name"
          label="Nombre Completo"
          multiline
          focused
          value={formik.values.name}
          onChange={formik.handleChange}
        />
         <TextField
          id="email"
          multiline
          disabled
          value={formik.values.email}
          onChange={formik.handleChange}
        />
  </Grid>
  </Grid>
</Paper>
        </TabPanel>
        <TabPanel value="2">
        <Paper sx={{padding:'5%', borderRadius:'20px'}}  variant="elevation" elevation="10" >
  <Grid container >
  <Grid item xs={4} >
    <Typography variant='h4'>Cambiar contraseña</Typography>
  </Grid>
  <Grid item xs={8} 
  component="form"
 onSubmit={formik.handleSubmit} 
  sx={{
    '& .MuiTextField-root': { m: 1, width: '90%' },
  }}
  noValidate
  autoComplete="off"
>
   <Chip sx={{marginY:1}} variant="outlined" color="info" label={`id: ${user._id}`} />
   <Typography variant="h5" color="#A24999">Antigua Contraseña</Typography>
      <TextField
          id="password"
          multiline
          focused
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
        />
        <Typography variant="h5" color="#A24999">Nueva contraseña</Typography>
         <TextField
          id=""
          multiline
          disabled
          value={formik.values.newPassword}
          onChange={formik.handleChange}
        />
  </Grid>
  </Grid>
</Paper>
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
    </Grid>
    </>
  )
}