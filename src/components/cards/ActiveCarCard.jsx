// Importaciones necesarias de Material-UI y otras librerías
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import TextfieldAndSwitch from "../Forms/TextfieldAndSwitch";

// Componente estilizado para manejar la expansión del contenido
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <>
      <Typography variant="body1" color="initial">
        Agregar autos
      </Typography>
      <IconButton {...other} />
    </>
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Componente principal que representa una tarjeta de auto activo
const ActiveCarCard = ({ item }) => {
  // Estado para manejar la expansión del contenido
  const [expanded, setExpanded] = useState(false);
  // Estado para manejar la apertura del diálogo de información
  const [open, setOpen] = useState(false);
  // Estado para almacenar los valores seleccionados
  const [values, setValues] = useState([]);

  // Selector para obtener la subcategoría del auto
  const subCategory = useSelector((state) =>
    state.subCategories.subCategories?.find(
      (item2) => item2?._id === item?.SubCategory
    )
  );

  // Selector para obtener la categoría de la subcategoría
  const category = useSelector((state) =>
    state.categories.categories?.find(
      (item2) => item2._id === subCategory?.category
    )
  );

  // Selector para obtener los tipos de autos
  const typeCars = useSelector((state) => state.typeCars.typeCars);

  // Maneja el clic para expandir o contraer el contenido
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Maneja el clic para abrir el diálogo de información
  const handleClickInfo = () => {
    setOpen(true);
  };

  // Maneja el clic para cerrar el diálogo de información
  const handleClickclose = () => {
    setOpen(false);
  };

  // Maneja el clic para agregar los valores seleccionados (pendiente de implementación)
  const onAddClick = () => {
    // Lógica para agregar valores
  };

  return (
    <Grid item xs={18} md={9} lg={6} width={"100%"}>
      <Card sx={{ minWidth: 300, m: 2 }}>
        {/* Encabezado de la tarjeta */}
        <CardHeader
          title={item?.name}
          subheader={<Chip label={item?._id} />}
          action={
            <Box sx={{ position: "relative" }}>
              <Tooltip title="Informacion">
                <IconButton
                  size="large"
                  aria-label="información"
                  color="primary"
                  onClick={handleClickInfo}
                >
                  <Info />
                </IconButton>
              </Tooltip>
            </Box>
          }
        ></CardHeader>

        {/* Imagen del auto */}
        <CardMedia
          component="img"
          height="150"
          image={item?.service_image}
          alt={item?.name}
        />

        {/* Botón para expandir el contenido */}
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

        {/* Contenido expandible */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <FormControl component="fieldset" variant="outlined">
            <FormLabel component="legend">Activar tipo de auto</FormLabel>
            <FormGroup>
              {/* Lista de tipos de autos con interruptores */}
              {typeCars?.map((item2, index) => {
                return (
                  <TextfieldAndSwitch
                    item={item2}
                    id={item2._id}
                    setValues={setValues}
                    values={values}
                  />
                );
              })}
              {/* Botón para guardar los valores seleccionados */}
              {values ? (
                <Button
                  onClick={onAddClick}
                  variant="contained"
                  color="success"
                >
                  Guardar
                </Button>
              ) : null}
            </FormGroup>

            <FormHelperText>Be careful</FormHelperText>
          </FormControl>
        </Collapse>

        {/* Diálogo de información */}
        <Dialog open={open} onClose={handleClickclose}>
          <DialogTitle>{`Información de: ${item?.name}`}</DialogTitle>
          <DialogContent>
            <Typography variant="h4" paragraph>
              Detalle:
            </Typography>

            <Typography paragraph>SubCategoría: {subCategory?.name}</Typography>
            <Typography paragraph>
              Descripcion de la subcategoria: {subCategory?.description}
            </Typography>
            <Typography paragraph>
              Categoria: {category?.name}
              <Typography paragraph>
                Descripcion de la categoria: {category?.description}
              </Typography>
            </Typography>
            <Typography variant="h5" paragraph>
              Descripcion del servicio:
            </Typography>
            <Typography>{item?.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickclose}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default ActiveCarCard;
