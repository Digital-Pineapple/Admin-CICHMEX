import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'





const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }


function subtotal(items) {
  return items?.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}




  const EntriesOutputsModal = ({open, handleClose, details}) => {

  return (
    <>
     
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Entradas del producto: {details?.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Salir
            </Button>
          </Toolbar>
        </AppBar>

<Grid container paddingX={10} paddingY={4}>
  <Grid item xs={12} dui> 
   <Typography variant="body1" color="initial">Codigo:{details?.tag}</Typography>
   <Typography variant="body1" color="initial">Precio:{details?.price}</Typography>
   <Typography variant="body1" color="initial">Stock Actual:{details?.stock}</Typography>
  </Grid>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              Detalle
            </TableCell>
           
          </TableRow>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Responsable</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Nueva Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details?.inputs?.map((row) => (
            <TableRow key={row.day}>
              <TableCell>{row.day}</TableCell>
              <TableCell>{row.hour}</TableCell>
              <TableCell>{row.responsible}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.newQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
</Grid>
       
      </Dialog>
    </>
  );
}

export default EntriesOutputsModal