import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useAuthStore } from "../../hooks";

// Array que contiene los detalles de los botones, incluyendo la ruta y el texto que se mostrará
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
    text: "Pedidos",
  },
];

export const MyStoreHouse = () => {
  const { navigate } = useAuthStore(); // Hook personalizado para manejar la navegación

  return (
    <Grid 
      container 
      maxWidth={'85vw'} 
      style={{ marginLeft: "10%", height: "70%", width: "80%" }}
    >
      {/* Título principal de la página */}
      <Grid 
        item 
        marginTop={{ xs: '-30px' }} 
        xs={12} 
        minHeight={'100px'} 
        className="Titles"
      >   
        <Typography 
          textAlign={'center'} 
          variant="h1" 
          fontSize={{ xs: '20px', sm: '30px', lg: '40px' }}
        >
          Mi almacén
        </Typography>
      </Grid>

      {/* Contenedor para los botones */}
      <Grid
        item
        container
        marginTop={2}
        display={"flex"}
        justifyContent={{ xs: "center" }}
      >
        {/* Mapeo del array ButtonDetail para generar un botón por cada entrada */}
        {ButtonDetail.map((item, index) => {
          return (
            <Grid key={index} item xs={12} lg={4}>
              {/* Botón que navega a la ruta especificada en el array ButtonDetail */}
              <Button
                onClick={() => navigate(item.path)} // Navegación a la ruta correspondiente
                variant="contained"
                sx={{ width: "400px", height: "200px", m: 2, borderRadius: '20px' }}
                color="secondary"
              >
                {item.text} {/* Texto del botón */}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
