import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Typography, CircularProgress } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useMediaQuery } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";
import MapGoogle from "../../components/Google/MapGoogle";
import {SlideBranchesImages} from "../../components/Caroussels/SlideBranchesImages";
import ScheduleList from "../../components/Lists/ScheduleList";
import useDeliveryPoints from "../../hooks/useDeliveryPoints";

// Componente que muestra el detalle de una sucursal
export default function BranchOfficeDetail() {
  const { id } = useParams(); // Obtiene el parámetro "id" de la URL
  const { onGetDeliveryPoint, deliveryPoint: sucursal, loading } = useDeliveryPoints(); // Hook personalizado para obtener los datos de la sucursal

  useEffect(() => {
    if (id) {
      onGetDeliveryPoint(id); // Llama a la función para obtener los datos de la sucursal por su ID
    }
  }, []);

  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Detecta si la pantalla es pequeña
  const coords = {
    lat: sucursal?.location?.lat, // Coordenadas de latitud de la sucursal
    lng: sucursal?.location?.lgt, // Coordenadas de longitud de la sucursal
  };

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY, // Carga la API de Google Maps con la clave de entorno
  });

  if (loading) {
    return <CircularProgress />; // Muestra un indicador de carga mientras se obtienen los datos
  }

  return (
    <Grid container minHeight={"90vh"}>
      {/* Contenedor principal */}
      <Grid
        item
        xs={10}
        margin={"auto"}
        marginTop={"30px"}
        marginBottom={"200px"}
      >
        {/* Enlace para volver a la lista de puntos de entrega */}
        <Grid item display={"flex"} alignItems={"center"} marginBottom={"20px"}>
          <NavigateBeforeIcon fontSize="medium" />
          <Link to={`/puntos-entrega/todos`}>Volver</Link>
        </Grid>

        {/* Encabezado con el nombre y estado de verificación de la sucursal */}
        <Grid
          item
          xs={12}
          sx={{ backgroundColor: "#ededed" }}
          display={"flex"}
          marginBottom={"20px"}
          alignItems={"center"}
          justifyContent={"space-between"}
          padding={"15px"}
        >
          <Typography variant="h4" fontWeight={900}>
            {sucursal?.name} {/* Nombre de la sucursal */}
          </Typography>
          <Typography
            variant="body2"
            color={sucursal?.verify ? "success" : "grey"}
            fontWeight={900}
          >
            {sucursal?.activated ? (
              <span style={{ color: "green" }}>Verificado</span>
            ) : (
              "Sin Verificar"
            )}
          </Typography>
        </Grid>

        {/* Carrusel de imágenes de la sucursal */}
        <Grid
          container
          item
          className="image-branch-container"
          xs={12}
          md={6}
          display={"flex"}
          margin={"auto"}
          justifyContent={"center"}
        >
          {sucursal?.images?.length > 0 ? (
            <SlideBranchesImages
              images={sucursal?.images} // Imágenes de la sucursal
              altura={isSmallScreen ? "200px" : "400px"} // Altura dinámica según el tamaño de la pantalla
            />
          ) : (
            <Typography marginY={"80px"}>
              No tienes imágenes para mostrar
            </Typography>
          )}
        </Grid>

        {/* Información detallada de la sucursal */}
        <Grid item xs={12} padding={"10px"}>
          <Typography variant="h6" fontWeight={400}>
            <strong>Teléfono: </strong>
            +52 {sucursal?.phone_number} {/* Número de teléfono */}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            <strong>Tipo de sucursal: </strong>
            {sucursal?.type} {/* Tipo de sucursal */}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            <strong>Descripción: </strong> {sucursal?.description} {/* Descripción */}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            <strong>Dirección: </strong>
            {sucursal?.location?.state}, {sucursal?.location?.municipality},{" "}
            {sucursal?.location?.direction} {/* Dirección completa */}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            <strong>Horarios: </strong>
          </Typography>
          {sucursal?.schedules && sucursal?.schedules?.length > 0 ? (
            <ScheduleList schedules={sucursal?.schedules} /> // Lista de horarios
          ) : (
            <Typography>No hay horarios</Typography>
          )}
        </Grid>

        {/* Mapa de Google con la ubicación de la sucursal */}
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          {isLoaded ? (
            coords.lat &&
            coords.lng && (
              <MapGoogle
                styles={{ width: "100%", height: "300px" }} // Estilo del mapa
                zoom={18} // Nivel de zoom
                center={coords} // Coordenadas centrales
                scrollable={false} // Deshabilita el desplazamiento
              >
                <MarkerF position={coords} /> {/* Marcador en el mapa */}
              </MapGoogle>
            )
          ) : (
            <CircularProgress sx={{ marginTop: "30px" }} /> // Indicador de carga mientras se carga el mapa
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
