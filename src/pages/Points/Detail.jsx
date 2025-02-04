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
//componente que muestra el detalle de la sucursal
export default function BranchOfficeDetail() {
  const { id } = useParams();  
  const { onGetDeliveryPoint, deliveryPoint : sucursal, loading } = useDeliveryPoints();
  useEffect(()=>{
    if(id){
      onGetDeliveryPoint(id)
    }
  },[])
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const coords = {
    lat: sucursal?.location?.lat,
    lng: sucursal?.location?.lgt,
  };
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY,
  });

  if(loading){
    return <CircularProgress />
  }

  return (
    <Grid container minHeight={"90vh"}>
      {/* <pre>{JSON.stringify(sucursal, null, 2)}</pre> */}
      <Grid
        item
        xs={10}
        margin={"auto"}
        marginTop={"30px"}
        marginBottom={"200px"}
      >
        <Grid item display={"flex"} alignItems={"center"} marginBottom={"20px"}>
          <NavigateBeforeIcon fontSize="medium" />
          <Link to={`/puntos-entrega/todos`}>Volver</Link>
        </Grid>
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
            {sucursal?.name}
          </Typography>
          <Typography
            variant="body2"
            color={sucursal?.verify ? "success" : "grey"}
            fontWeight={900}
          >
            {sucursal?.activated ? <span style={{ color: "green" }}>Verificado</span> : "Sin Verificar"}
          </Typography>
        </Grid>
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
              images={sucursal?.images}
              altura={isSmallScreen ? "200px" : "400px"}
            />
          ) : (
            <Typography marginY={"80px"}>
              No tienes imagenes para mostrar
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} padding={"10px"}>
          <Typography variant="h6" fontWeight={400}>
            <strong>Telefono: </strong> 
            +52 {sucursal?.phone_number}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            <strong>Tipo de sucursal: </strong>             
            { sucursal?.type }
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            <strong>Descripción: </strong> {sucursal?.description}
          </Typography>          
          <Typography variant="h6" fontWeight={400}>
            <strong>Dirección: </strong>
            {sucursal?.location?.state}, {sucursal?.location?.municipality},{" "}
            {sucursal?.location?.direction}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            <strong>Horarios: </strong>
            </Typography>
            {
              sucursal?.schedules && sucursal?.schedules?.length > 0 ?
              <ScheduleList schedules={sucursal?.schedules} />:
              <Typography>No hay horarios</Typography>
            }                      
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          {isLoaded ? (
            coords.lat &&
            coords.lng && (
              <MapGoogle
                styles={{ width: "100%", height: "300px" }}
                zoom={18}
                center={coords}
                scrollable={false}
              >
                <MarkerF position={coords} />
              </MapGoogle>
            )
          ) : (
            <CircularProgress sx={{ marginTop: "30px" }} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
