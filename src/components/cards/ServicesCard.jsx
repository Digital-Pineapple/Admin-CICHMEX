// Importaciones necesarias de Material-UI y otros módulos
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
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
import { useState } from 'react';
import { useServiceAdd } from '../../providers/ServicesProvider';
import { useServicesCustomer } from '../../hooks/useServicesCustomer';

// Componente estilizado para manejar la animación de expansión
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

// Componente principal que representa una tarjeta de servicio
const ServicesCard = ({item, services_id}) => {
  
  // Estados locales para manejar la expansión, carga, adición y apertura del diálogo
  const [expanded, setExpanded] = useState(false);
  const [loadingb, setLoadingb] = useState(false);
  const [add, setAdd] = useState('')
  const [open, setOpen] = useState(false)
  const {addOneSCustomer} = useServicesCustomer()

  // Función para manejar el clic en el botón de expansión
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Función para abrir el diálogo de confirmación
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Función para cerrar el diálogo de confirmación
  const handleClickclose = () => {
    setOpen(false);
  };

  // Estilo dinámico para el botón de agregar
  const styleAdd = {
    ...(add && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700]
      }
    })
  };

  // Función para manejar la acción de agregar un servicio
  const handleAdd = () => {
    console.log(services_id);
    try {
      addOneSCustomer(services_id, item);
    } catch (error) {
      // Manejo de errores (si es necesario)
    }
    setAdd(true);
    setOpen(false);
  };
  
  return (
    <Grid item xs={18} md={9} lg={6} width={'100%'}>
      <Card sx={{ minWidth: 300, m: 2 }}> 
        {/* Encabezado de la tarjeta */}
        <CardHeader
          title={item.name}
          subheader={<Chip label={item._id} />}
          action={
            <Box sx={{ position: "relative" }}>
              <Tooltip title="Agregar servicio">
                <Fab
                  aria-label="agregar"
                  color="primary"
                  sx={styleAdd}
                  onClick={handleClickOpen}
                >
                  <Add />
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
        />
        {/* Imagen del servicio */}
        <CardMedia
          component="img"
          height="150"
          image={item.service_image}
          alt={item.name}
        />
        
        {/* Botón para expandir la tarjeta */}
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

        {/* Contenido colapsable con detalles del servicio */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant='h4' paragraph>Detalle:</Typography>
            <Typography paragraph>
              SubCategoría: {item.nameSubCategory}
            </Typography>
            <Typography paragraph>
              Categoría: {item.nameCategory}
            </Typography>
            <Typography paragraph>
              Descripción:
            </Typography>
            <Typography>
              {item.description}
            </Typography>
          </CardContent>
        </Collapse>

        {/* Diálogo de confirmación para agregar el servicio */}
        <Dialog open={open} onClose={handleClickclose}>
          <DialogTitle>¿Estás seguro de agregar este servicio?</DialogTitle>
          <DialogActions>
            <Button onClick={handleAdd}>Agregar</Button>
            <Button onClick={handleClickclose}>Cancelar</Button>
          </DialogActions>
        </Dialog> 
      </Card>
    </Grid>
  );
}

export default ServicesCard;
