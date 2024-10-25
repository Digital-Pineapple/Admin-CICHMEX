import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import TableClothes from "../Products/StepNewProduct/TablesTypeProduct/TableClothes";
import { useState } from "react";

const TableGuides = () => {
  const [value, setValue] = useState("clothes");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid item spacing={2} gap={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel sx={{ fontSize: "18px", textAlign:'center' }} id="type Product">
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
      <Grid item xs={12} display={'flex'} boxSizing={'border-box'}>
        {value === "clothes" ? <TableClothes /> : ""}
      </Grid>
    </Grid>
  );
};

export default TableGuides

