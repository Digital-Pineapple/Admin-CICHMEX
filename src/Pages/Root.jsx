import React from 'react';
import { styled } from '@mui/material/styles';
import { Box,Grid,Paper,Button,TextField,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/ui/LoadingScreen';
import { useSelector } from 'react-redux';
import FormLogin from '../components/login/FormLogin';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Root = () => {
  const { login } = useAuth();
  const { loading } = useSelector(state => state.ui);

  return (
    <Box sx={{ bgcolor: '#CC3C5C',width: '100%',minHeight: '100vh', }} >

      {loading && <LoadingScreen />}

      <Grid container sx={{ minHeight: '100vh',display: 'flex',flexDirection: 'row',justifyContent: 'center',alignItems: 'center' }} >
        <Grid item xs={12} md={5}>
          <img src="/assets/Carwash1.png" className='my-auto' alt="Icon" height="100%" width="100%" />
        </Grid>
        <FormLogin />
      </Grid>
    </Box>
  )
}

export default Root
