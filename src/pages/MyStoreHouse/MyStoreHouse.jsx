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
    <Grid container ml={"100px"}>
      <Typography variant="h1" color="primary">
        Mi Almacén
      </Typography>

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
