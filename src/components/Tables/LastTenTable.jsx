import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'

// Estiliza las celdas de la tabla, diferenciando entre las celdas del encabezado y las del cuerpo
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Estiliza las filas de la tabla, alternando colores para las filas impares y ocultando el borde de la última fila
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Oculta el borde de la última fila
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Componente principal que renderiza una tabla con los últimos 10 pedidos
const LastTenTable = ({rows}) => {
    // Mapea los datos recibidos en el prop `rows` para estructurarlos en un formato adecuado para la tabla
    const dataTable = rows?.map((item, index)=>{
        const id = index; // Asigna un índice único como ID
        const order_id = item.order_id; // ID de la orden
        const discount = item.discount; // Descuento aplicado
        const subTotal= item.subTotal; // Subtotal del pedido
        const total = item.total; // Total del pedido
        return{id, total,subTotal, order_id, discount}
    })

  return (
    <>
      {/* Título de la tabla */}
      <Typography padding={2} textAlign={'center'} variant="h6" color="primary">
        Ultimos 10 pedidos
      </Typography>
      
      {/* Contenedor de la tabla */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          {/* Encabezado de la tabla */}
          <TableHead>
            <TableRow>
              <StyledTableCell>ID de orden</StyledTableCell>
              <StyledTableCell align="right">Subtotal</StyledTableCell>
              <StyledTableCell align="right">Descuento</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          
          {/* Cuerpo de la tabla */}
          <TableBody>
            {dataTable?.map((row) => (
              <StyledTableRow key={row.id}>
                {/* Celda para el ID de la orden */}
                <StyledTableCell component="th" scope="row">
                  {row.order_id}
                </StyledTableCell>
                {/* Celda para el subtotal */}
                <StyledTableCell align="right">{row.subTotal}</StyledTableCell>
                {/* Celda para el descuento */}
                <StyledTableCell align="right">{row.discount}</StyledTableCell>
                {/* Celda para el total */}
                <StyledTableCell align="right">{row.total}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default LastTenTable