
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, InputAdornment, TextField, Tooltip, imageListItemBarClasses } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useRef } from 'react';
import { useState } from 'react';
import { useServices } from '../../hooks/useServices';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const validate = values => {
  const errors = {};
  if (!values.price) {
    errors.price = 'El valor es requerido';
  }else if (values.price <= 0) {
    errors.price = 'El valor no pude ser menor de 0';
  }

  return errors;
};
const ServicesCard = ({item, setNew}) => {
 
  const [expanded, setExpanded] = useState(false);
  const [loadingb, setLoadingb] = useState(false);
  const [add, setAdd] = useState('')
  const [open, setOpen] = useState(false)
  const timer = useRef();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickclose = () => {
    setOpen(false)
  }

  const styleAdd ={
...(add && {
  bgcolor: green[500],
  "&:hover":{
    bgcolor:green[700]
  }
})
  }
  // const formik = useFormik({
  //   initialValues: {
  //     ...item,
  //   },
  //   validate,
  //   onSubmit: (values) => {
  //     try {
  //       setNew(values)
  //       setOpen(false)
  //       if (!loadingb) {
  //         setLoadingb(true);
  //         timer.current = window.setTimeout(() => {
  //           setLoadingb(false)
  //         }, 2000);
  //       }
  //     } catch (error) {
  //       return enqueueSnackbar("Error al editar el servicio", {
  //         variant: "error",
  //         anchorOrigin: {
  //           vertical: "top",
  //           horizontal: "right",
  //         },
  //       });
  //     }
  //   },
  // });
  const handleAdd = () => {
try {
  setNew(item)
  setAdd(true)
  setOpen(false)
  enqueueSnackbar("Servicio agregado", { variant: "success", anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  }})
} catch (error) {
  
}
  }

  return (
    <Card sx={{ maxWidth:250 }}>
        
      <CardHeader
        title={item.name}
        subheader={<Chip label={item._id}/>}
        action={
          <Box sx={{ position: "relative" }}>
            <Tooltip title="Agregar servicio">
          <Fab
            aria-label="agregar"
            color="primary"
            sx={styleAdd}
            onClick={handleClickOpen}
          >
            <Add/>
          </Fab>
            </Tooltip>
          {loadingb && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
        }
      >
      </CardHeader>
      <CardMedia
        component="img"
        height="150"
        image={item.service_image}
        alt={item.name}
      />
      
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Ver más"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant='h4' paragraph>Detalle:</Typography>
          <Typography paragraph>
            SubCategoría: {item.nameSubCategory}
          </Typography>
          <Typography paragraph>
           Categoria: {item.nameCategory}
          </Typography>
          <Typography paragraph>
           Descripcion:
          </Typography>
          <Typography>
            {item.description}
          </Typography>
        </CardContent>
      </Collapse>
      {/* <Dialog open={open} onClose={handleClickclose}>
        <DialogTitle>Precio del servicio</DialogTitle>
          <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Activa los tipos de autos para este servicio
          </DialogContentText>

          <TextField
           InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}   
            autoFocus
            margin="dense"
            id="price"
            name="price"
            label="precio"
            type="number"
            fullWidth
            variant='filled'
            value={formik.values.price}
            onChange={formik.handleChange}
          />
           {formik.errors.price ? <div>{formik.errors.price}</div> : null}
        </DialogContent>
        <DialogActions>
          <Button  type='submit'>Agregar</Button>
          <Button onClick={handleClickclose}>Cancelar</Button>
        </DialogActions>
          </form>
      </Dialog>  */}
      <Dialog open={open} onClose={handleClickclose}>
        <DialogTitle>¿Estas seguro de agregar este servicio?</DialogTitle>
        <DialogActions>
          <Button onClick={handleAdd}>Agregar</Button>
          <Button onClick={handleClickclose}>Cancelar</Button>
        </DialogActions>
        
      </Dialog> 

      
    </Card>
  );
}


export default ServicesCard
