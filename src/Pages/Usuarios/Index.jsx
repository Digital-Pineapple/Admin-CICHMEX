// import React,{ useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import DrawerIcons from '../../components/ui/DrawerIcons';
// import Titles from '../../components/ui/Titles';
// import { styled,ThemeProvider,createTheme } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Pagination from '@mui/material/Pagination';
// import { Box } from '@mui/material';
// import { redirectPages } from '../../helpers/helpers';
// import WarningAlert from '../../components/ui/WarningAlert';
// import { useDispatch,useSelector } from 'react-redux';
// import { startLoadUsers } from '../../store/actions/userActions';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#CC3C5C",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(nombre,telefono,correo) {
//   return { nombre,telefono,correo };
// }

// const themeColor = createTheme({
//   palette: {
//     primary: {
//       main: '#CC3C5C',
//     },
//   },
// });

// const Index = () => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const getUsers = async () => {
//     await dispatch(startLoadUsers())
//   }

//   useEffect(() => {
//     getUsers();
//   },[])

//   const { users } = useSelector((state) => state.users);

//   return (

//     // <DrawerIcons>
//     //   <ThemeProvider theme={themeColor}>
//     //     <Titles
//     //       name={<h2 align='center'>Usuarios</h2>}
//     //     />
//     //     <Button variant="contained" disableElevation sx={{ color: "CC3C5C",my: 5,p: 1,borderRadius: 5,px: 5 }} onClick={() => redirectPages(navigate,'/Nuevo-usuario')}>
//     //       Registrar nuevo usuario
//     //     </Button>
//     //   </ThemeProvider>
//     //   <TableContainer component={Paper}>
//     //     <Table sx={{ minWidth: 700 }} aria-label="customized table">
//     //       <TableHead>
//     //         <TableRow>
//     //           <StyledTableCell>Nombre</StyledTableCell>
//     //           <StyledTableCell align="center">Telefono</StyledTableCell>
//     //           <StyledTableCell align="center">Correo</StyledTableCell>
//     //           <StyledTableCell align="center">Opciones</StyledTableCell>
//     //         </TableRow>
//     //       </TableHead>
//     //       <TableBody>
//     //         {users.map((user) => (
//     //           <StyledTableRow key={user._id}>
//     //             <StyledTableCell component="th" scope="row">
//     //               {user.fullname}
//     //             </StyledTableCell>
//     //             <StyledTableCell align="center">{user?.phone?.phone_number || 'N/A'}</StyledTableCell>
//     //             <StyledTableCell align="center">{user?.email}</StyledTableCell>
//     //             <StyledTableCell sx={{ display: 'flex',justifyContent: 'center' }}>
//     //               <WarningAlert
//     //                 route={`/Editar-usuario/${user._id}`}
//     //                 title="Estas seguro que deseas eliminar al usuario"
//     //               />
//     //             </StyledTableCell>
//     //           </StyledTableRow>
//     //         ))}
//     //       </TableBody>
//     //     </Table>
//     //   </TableContainer>
//     //   <ThemeProvider theme={themeColor}>
//     //     <Box display="flex" justifyContent="center" py={10}>
//     //       <Pagination count={10} color="primary" />
//     //     </Box>
//     //   </ThemeProvider>
//     // </DrawerIcons>

//     <h1>Usuarios </h1>

//   )
// }

// export default Index



import { Grid,Typography,Box } from '@mui/material'
import React from 'react'
import UserTable from '../../components/usuarios/Table'

const Index = () => {
  return (
    <Grid container xs={12} md={6}>
      <Box sx={{ minWidth: '100vw', paddingX: 2, textAlign: 'center'}}>
        <Typography>Usuarios</Typography>
      </Box>
      <Box>
      <UserTable />
      </Box>
    </Grid>
  )
}

export default Index