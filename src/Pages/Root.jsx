import React from 'react';
import { styled } from '@mui/material/styles';
import { Box,Grid,Paper,Button,TextField,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../ui/LoadingScreen';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Root = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const { loading } = useSelector(state => state.ui);

  const onLogin = () => {
    navigate('/Usuarios');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box sx={{ bgcolor: '#CC3C5C',width: '100%',minHeight: '100vh' }} >

      {loading && <LoadingScreen />}

      <Grid container sx={{ minHeight: '100vh',display: 'flex',flexDirection: 'row',justifyContent: 'center',alignItems: 'center' }} >
        <Grid item xs={12} md={5}>
          <img src="/assets/Carwash1.png" className='my-auto' alt="Icon" height="100%" width="100%" />
        </Grid>
        <Grid item xs={12} md={7} mt={15} p={2}>
          <Item >
            <Typography component="h1" variant="h5" sx={{ mt: 9 }}>
              Iniciar Sesión
            </Typography>
            <hr color='#CC3C5C' size='3px' />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 9,px: 4 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3,mb: 15 }}
              >
                Sign In
              </Button>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Root
