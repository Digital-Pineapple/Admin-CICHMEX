import React from 'react'
import { useNavigate } from 'react-router-dom';
import DrawerIcons from '../../components/ui/DrawerIcons';
import Titles from '../../components/ui/Titles';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import WarningAlert from '../../components/ui/WarningAlert';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#CC3C5C",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(nombre, descripcion, precio) {
    return { nombre, descripcion, precio };
}

const rows = [
    createData('Autolavado express', 'Autolavado express', 150),
    createData('Autolavado con aspiradora', 'Autolavado con aspiradora', 200),
    createData('Autolavado con cera y espuma', 'Autolavado con cera y espuma', 250),
];

const themeColor = createTheme({
    palette: {
        primary: {
            main: '#CC3C5C',
        },
    },
});

const Index = () => {

    const navigate = useNavigate();

    const serviceRegister = () => {
      navigate('/Nuevo-servicio');
    }

    return (

        <DrawerIcons>
            <ThemeProvider theme={themeColor}>
                <Titles
                    name={<h2 align='center'>Servicios</h2>}
                />
                <Button variant="contained" disableElevation sx={{ color: "CC3C5C", my: 5, p: 2, borderRadius: 5 }} onClick={serviceRegister}>
                    Registrar nuevo servicio
                </Button>
            </ThemeProvider>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombre</StyledTableCell>
                            <StyledTableCell align="center">Descripción</StyledTableCell>
                            <StyledTableCell align="center">Precio&nbsp;($)</StyledTableCell>
                            <StyledTableCell align="center">Opciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.nombre}>
                                <StyledTableCell component="th" scope="row">
                                    {row.nombre}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.descripcion}</StyledTableCell>
                                <StyledTableCell align="center">{row.precio}</StyledTableCell>
                                <StyledTableCell sx={{display:'flex', justifyContent:'center'}}><WarningAlert route="/Editar-servicio" title={<h4>¿Estas seguro de eliminar este usuario?</h4>} /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ThemeProvider theme={themeColor}>
                <Box display="flex" justifyContent="center" py={10}>
                    <Pagination count={10} color="primary" />
                </Box>
            </ThemeProvider>
        </DrawerIcons>

    )
}

export default Index
