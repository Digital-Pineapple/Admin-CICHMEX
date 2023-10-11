
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

const ServicesCard = ({item}) => {
  
  const [expanded, setExpanded] = useState(false);
  const [loadingb, setLoadingb] = useState(false);
  const [add, setAdd] = useState('')
  const [open, setOpen] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickOpen = ()=> {setOpen(true)} 
  const handleClickclose = () => {setOpen(false)}


  const styleAdd ={
...(add && {
  bgcolor: green[500],
  "&:hover":{
    bgcolor:green[700]
  }
})
  }
  const setAddServices = useServiceAdd()

  const handleAdd = () => {
    setAddServices.handleAdd(item)
    setAdd(true)
    setOpen(false)
  
  }
  
  return (
    <Grid item xs={18} md={9} lg={6}  width={'100%'} >
    <Card sx={{ minWidth:300, m:2}}> 
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

      <Dialog open={open} onClose={handleClickclose}>
        <DialogTitle>¿Estas seguro de agregar este servicio?</DialogTitle>
        <DialogActions>
          <Button onClick={handleAdd}>Agregar</Button>
          <Button onClick={handleClickclose}>Cancelar</Button>
        </DialogActions>
      </Dialog> 
    </Card>
    </Grid>
  );
}


export default ServicesCard
