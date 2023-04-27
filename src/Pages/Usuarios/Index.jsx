import { useEffect } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import UserTable from '../../components/usuarios/Table'
import { useUsers } from '../../hooks/useUsers'

const Index = () => {

  const { loadUsers, users } = useUsers();

useEffect(()=>{
  loadUsers();
}, [])

  return (
    <Grid container  marginX="20">
      <Box sx={{ textAlign: 'center',width: '100%' }}>
        <Typography variant="h3">Usuarios</Typography>
      </Box>
      <Box sx={{ width: '100%'}}>
      <UserTable 
        users={users}
      />
      </Box>
    </Grid>
  )
}

export default Index