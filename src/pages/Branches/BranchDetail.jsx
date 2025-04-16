import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useBranches } from "../../hooks/useBranches";
import { useParams } from "react-router-dom";
import { useLoadScript, MarkerF } from "@react-google-maps/api";
import MapGoogle from "../../components/Google/MapGoogle";
import ActivatedButton from "../../components/Buttons/ActivatedButton";

export const BranchDetail = () => {
  const { id } = useParams(); // Obtiene el parámetro `id` de la URL.
  const { loadOneBranch, branch, verifyOneBranch } = useBranches(); // Hook personalizado para manejar datos de sucursales.

  useEffect(() => {
    loadOneBranch(id); // Carga los datos de una sucursal específica al montar el componente.
  }, [id]);

  const coords = {
    lat: branch?.location?.lat, // Coordenada de latitud de la sucursal.
    lng: branch?.location?.lgt, // Coordenada de longitud de la sucursal.
  };

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY, // Carga la API de Google Maps con la clave proporcionada.
  });

  return (
    <Grid
      container
      paddingX={"10%"}
      justifyContent={"center"}
      spacing={2}
      boxSizing={"border-box"}
      display={"flex"}
      width={"100%"}
      minHeight={"80vh"}
    >
      {/* Título principal con el nombre de la sucursal */}
      <Grid item xs={12}>
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "35px" }}
          color="primary"
        >
          Punto de entrega: {branch?.name}
        </Typography>
      </Grid>

      {/* Tarjeta con la información detallada de la sucursal */}
      <Grid item xs={12} md={5}>
        <Card>
          <CardContent>
            {/* Descripción de la sucursal */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Descripción
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {branch?.description}
            </Typography>

            {/* Horarios de apertura y cierre */}
            <Typography variant="body1">
              Hora de apertura : {branch.opening_time}
              <br />
              Hora de cierre : {branch.closing_time}
            </Typography>

            {/* Información de ubicación */}
            <Typography variant="body1">
              Estado: {branch.location?.state}
            </Typography>
            <Typography variant="body1">
              Municipio: {branch.location?.municipality}
            </Typography>
            <Typography variant="body1">
              Dirección: {branch.location?.direction}
            </Typography>

            <br />

            {/* Información del encargado */}
            <Typography variant="body1">id: {branch.user_id?._id}</Typography>
            <Typography variant="body1">
              Encargado: {branch.user_id?.fullname}
            </Typography>
            <Typography variant="body1">
              Correo: {branch.user_id?.email}
            </Typography>
          </CardContent>

          {/* Botón para activar la sucursal si está desactivada */}
          <CardActions>
            {branch.activated ? (
              ""
            ) : (
              <ActivatedButton
                title={`¿Desea activar el punto de entrega: ${branch.name}?`}
                callbackActivatedItem={() =>
                  verifyOneBranch(id, branch.user_id?._id)
                }
              />
            )}
          </CardActions>
        </Card>
      </Grid>

      {/* Mapa de Google con la ubicación de la sucursal */}
      <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"}>
        {isLoaded ? (
          <MapGoogle
            styles={{ width: "100%", height: "300px" }}
            zoom={18} // Nivel de zoom del mapa.
            center={coords} // Coordenadas de la sucursal.
            scrollable={false} // Desactiva el desplazamiento del mapa.
          >
            <MarkerF position={coords} /> {/* Marcador en la ubicación de la sucursal */}
          </MapGoogle>
        ) : (
          <Skeleton variant="rectangular" /> // Muestra un placeholder mientras se carga el mapa.
        )}
      </Grid>
    </Grid>
  );
};
