import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import TableClothes from "../Products/StepNewProduct/TablesTypeProduct/TableClothes";
import { useState } from "react";
import TableOthers from "../Products/StepNewProduct/TablesTypeProduct/TableOthers";
import TableShoes from "../Products/StepNewProduct/TablesTypeProduct/TableShoes";
import TableFoods from "../Products/StepNewProduct/TablesTypeProduct/TableFoods";

const TableGuides = () => {
  // Estado para manejar el valor seleccionado en el grupo de botones de radio
  const [value, setValue] = useState("clothes");

  // Función para manejar el cambio de selección en el grupo de botones de radio
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid container gap={2}>
      {/* Título principal de la página */}
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Agregar guia
        </Typography>
      </Grid>

      {/* Sección para seleccionar el tipo de producto */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel sx={{ fontSize: "18px", textAlign: 'center' }} id="type Product">
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
            {/* Opciones de tipo de producto */}
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
            {/* <FormControlLabel
              value="Accesories"
              control={<Radio />}
              label="Accesorios"
              labelPlacement="top"
            /> */}
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

      {/* Renderizado condicional de las tablas según el tipo de producto seleccionado */}
      <Grid item xs={12} display={'flex'} boxSizing={'border-box'}>
        {value === "clothes" ? <TableClothes fromVariants={true} /> : ""}
        {value === "Shoes" ? <TableShoes fromVariants={true} /> : ""}
        {value === "Other" ? <TableOthers fromVariants={true} /> : ""}
        {value === "Food" ? <TableFoods fromVariants={true} /> : ""}
      </Grid>
    </Grid>
  );
};

export default TableGuides;
