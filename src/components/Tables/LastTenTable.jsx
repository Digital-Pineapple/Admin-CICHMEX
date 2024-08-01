import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
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




const LastTenTable = ({rows}) => {
    const dataTable = rows?.map((item, index)=>{
        const id = index;
        const order_id = item.order_id;
        const discount = item.discount;
        const subTotal= item.subTotal;
        const total = item.total;
        return{id, total,subTotal, order_id, discount}
    })
  return (
    <>
    <Typography padding={2} textAlign={'center'} variant="h6" color="primary">Ultimos 10 pedidos</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID de orden</StyledTableCell>
            <StyledTableCell align="right">Subtotal</StyledTableCell>
            <StyledTableCell align="right">Descuento</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.order_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.subTotal}</StyledTableCell>
              <StyledTableCell align="right">{row.discount}</StyledTableCell>
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