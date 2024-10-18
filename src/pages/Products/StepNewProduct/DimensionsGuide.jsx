import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  IconButton,
  Typography, TextField,
} from "@mui/material";
import TableClothes from "./TablesTypeProduct/TableClothes";
import { useSizeGuide } from "../../../hooks/useSizeGuide";
import { Add } from "@mui/icons-material";

const DimensionsGuide = () => {
  const { loadSizeGuides, sizeGuides } = useSizeGuide();
  const [value, setValue] = React.useState("clothes");
  const [stateAddNewGuide, setStateAddNewGuide] = useState(false);
  useEffect(() => {
    loadSizeGuides();
  }, [stateAddNewGuide]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const startAddNewGuide = () => {
    setStateAddNewGuide(true);
  };

  const TableGuides = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel sx={{ fontSize: "20px" }} id="type Product">
              Seleccione el tipo de producto
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="typeProduct"
              name="type_product"
              defaultValue="clothes"
              onChange={(e) => handleChange(e)}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <FormControlLabel
                value="clothes"
                control={<Radio />}
                label="Ropa"
                labelPlacement="top"
              />
              <FormControlLabel
                value="Shoes"
                control={<Radio />}
                label="Zapatos"
                labelPlacement="top"
              />
              <FormControlLabel
                value="Accesories"
                control={<Radio />}
                label="Accesorios"
                labelPlacement="top"
              />
              <FormControlLabel
                value="Food"
                control={<Radio />}
                label="Alimentos"
                labelPlacement="top"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Otros"
                labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {value === "clothes" ? <TableClothes /> : ""}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <Card variant="elevation">
            <CardHeader
              title="Guia de dimensiones"
              subheader="Asocia una guía que contenga las medidas necesarias y evita preguntas o devoluciones"
            />
            <CardContent>
              <Card
                variant="elevation"
                sx={{ backgroundColor: stateAddNewGuide ? 'inherit' : "primary.light" }}
              >
                <CardContent>
                  {stateAddNewGuide ? (
                    TableGuides()
                  ) : (
                    <Typography variant="body2" color="primary.contrastText">
                      <strong>
                        Asocia una guía de tallas que aplique a tu producto para
                        evitar devoluciones
                      </strong>
                      <br />
                      Asegúrate de incluir todas las tallas de tus variantes en
                      la guía que crees y ayuda a tu comprador a elegir el
                      producto de acuerdo a sus medidas.
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  {stateAddNewGuide ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => setStateAddNewGuide(!stateAddNewGuide)}
                    >
                      Cancelar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => setStateAddNewGuide(!stateAddNewGuide)}
                    >
                      Agregar nueva guia
                    </Button>
                  )}
                </CardActions>
              </Card>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DimensionsGuide;
