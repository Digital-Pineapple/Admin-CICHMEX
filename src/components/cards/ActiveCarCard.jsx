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

const ActiveCarCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([]);

  const subCategory = useSelector((state) =>
    state.subCategories.subCategories?.find(
      (item2) => item2?._id === item?.SubCategory
    )
  );
  const category = useSelector((state) =>
    state.categories.categories?.find(
      (item2) => item2._id === subCategory?.category
    )
  );
  const typeCars = useSelector((state) => state.typeCars.typeCars);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickInfo = () => {
    setOpen(true);
  };
  const handleClickclose = () => {
    setOpen(false);
  };
  const onAddClick = () => {
    
  };

  return (
    <Grid item xs={18} md={9} lg={6} width={"100%"}>
      <Card sx={{ minWidth: 300, m: 2 }}>
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
        <CardMedia
          component="img"
          height="150"
          image={item?.service_image}
          alt={item?.name}
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
          <FormControl component="fieldset" variant="outlined">
            <FormLabel component="legend">Activar tipo de auto</FormLabel>
            <FormGroup>
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
