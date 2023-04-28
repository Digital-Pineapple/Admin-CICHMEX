import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/ui/LoadingScreen';
import { useSelector } from 'react-redux';
import FormLogin from '../components/login/FormLogin';

const Root = () => {

  const { loading } = useSelector(state => state.ui);

  return (
    <Box sx={{ bgcolor: '#CC3C5C', padding: 3 }} >
      <Grid container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
        <Grid item xs={12} md={5}>
          <img src="/assets/CarWash1.png" className='my-auto' alt="Icon" height="100%" width="100%" />
        </Grid>
        <Grid item xs={12} md={7}>
          <FormLogin />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Root
