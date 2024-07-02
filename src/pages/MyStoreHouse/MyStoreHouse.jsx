import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useAuthStore } from "../../hooks";

const ButtonDetail = [
  {
    path: "/auth/Productos",
    text: "Productos",
  },
  {
    path: "/auth/MiAlmacen/stock",
    text: "Administración de producto",
  },
  {
    path: "/auth/MiAlmacen/product-orders",
    text: "Ordenes de Compra",
  },
];

export const MyStoreHouse = () => {
  const { navigate } = useAuthStore();
  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
     <Grid item marginTop={{xs:'-30px'}} xs={12} minHeight={'100px'} className="Titles">   
      <Typography textAlign={'center'} variant="h1" fontSize={{xs:'20px', sm:'30px', lg:'40px'}} >
        Mi almacén
      </Typography>
      </Grid>

      <Grid
        item
        container
        marginTop={2}
        display={"flex"}
        justifyContent={{ xs: "center" }}
      >
        {ButtonDetail.map((item, index) => {
          return(

          <Grid key={index} item xs={12} lg={4}  >
            <Button
              onClick={() => navigate(item.path)}
              variant="contained"
              sx={{ width: "400px", height: "200px", m: 2, borderRadius:'20px' }}
              color="secondary"
            >
              {item.text}
            </Button>
          </Grid>
          )
        })}
      </Grid>
    </Grid>
  );
};
