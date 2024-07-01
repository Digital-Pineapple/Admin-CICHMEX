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
  const { id } = useParams();
  const { loadOneBranch, branch, verifyOneBranch } = useBranches();

  useEffect(() => {
    loadOneBranch(id);
  }, [id]);

  const coords = {
    lat: branch?.location?.lat,
    lng: branch?.location?.lgt,
  };

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY,
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
      <Grid item xs={12}>
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "35px" }}
          color="primary"
        >
          Susursal:{branch?.name}
        </Typography>
      </Grid>

      <Grid item xs={12} md={5}>
        <Card>
          <CardContent>
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
            <Typography variant="body1">
              Hora de apertura : {branch.opening_time}
              <br />
              Hora de cierre : {branch.closing_time}
            </Typography>
            <Typography variant="body1">
              Estado:{branch.location?.state}
            </Typography>
            <Typography variant="body1">
              Municipio:{branch.location?.municipality}
            </Typography>
            <Typography variant="body1">
              Dirección:{branch.location?.direction}
            </Typography>
            <br />
            <Typography variant="body1">id:{branch.user_id?._id}</Typography>
            <Typography variant="body1">
              Encargado:{branch.user_id?.fullname}
            </Typography>
            <Typography variant="body1">
              Correo:{branch.user_id?.email}
            </Typography>
          </CardContent>
          <CardActions>
            {
              branch.activated ? '': (
            <ActivatedButton
              title={`¿Desea activar las sucursal ${branch.name}?`}
              callbackActivatedItem={()=> verifyOneBranch(id, branch.user_id?._id)}
            />
              )
            }
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"}>
        {isLoaded ?  (
            <MapGoogle
              styles={{ width: "100%", height: "300px" }}
              zoom={18}
              center={coords}
              scrollable={false}
            >
              <MarkerF position={coords} />
            </MapGoogle>
          
        ) : (
          <Skeleton variant="rectangular" />
        )}
      </Grid>
    </Grid>
  );
};
