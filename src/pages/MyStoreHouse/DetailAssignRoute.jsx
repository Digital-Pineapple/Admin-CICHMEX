import { Close } from "@mui/icons-material";
import {
  Grid2,
  Typography,
  Button,
  Fab,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import React from "react";

const DetailAssignRoute = ({ productOrder, carrierDrivers = [] }) => {
  let info = productOrder.data;

  // Función para obtener información del usuario asignado a la ruta
  const user = (user_id) => {
    const user = carrierDrivers.find((i) => user_id === i._id);
    return (
      <Typography>
        <strong>Nombre:</strong> {user?.fullname} <br />
        <strong>Correo:</strong> {user?.email} <br />
        <strong>Telefono:</strong> {user?.phone_id?.phone_number} <br />
      </Typography>
    );
  };

  // Función para mostrar información de la compañía de envíos
  const company = (data) => {
    return (
      <>
        <Typography>
          <strong>Compañía:</strong> {data.shipping_company} <br />
          <strong>Guía:</strong> {data.guide} <br />
        </Typography>
        {/* Muestra un iframe con el PDF de la guía de envío */}
        <iframe
          src={data.guide_pdf}
          width="100%"
          height="100%"
        ></iframe>
      </>
    );
  };

  return (
    <Grid2
      container
      padding={2}
      display={"flex"}
      justifyContent={"center"}
      gap={2}
    >
      {/* Título principal de la página */}
      <Grid2
        size={12}
        minHeight={"70px"}
      >
        <Typography
          variant="h2"
          fontSize={{ xs: "15px", sm: "20px", lg: "30px" }}
        >
          Detalle de envío
        </Typography>
      </Grid2>

      {/* Tarjeta con información básica de la orden */}
      <Grid2 item size={{ xs: 12, sm: 5.7 }}>
        <Card sx={{ height: "100%" }} variant="outlined">
          <CardHeader title={`Id de orden:${info?.order_id}`} />
          <CardContent>
            <Typography fontSize={"14px"}>
              Fecha de empaque: <strong>{info?.supply_date}</strong>
            </Typography>
            <Typography fontSize={"14px"}>
              <strong>Cliente:</strong><br />
              Nombre: <strong>{info.user_id ? info.user_id.fullname:''}</strong> <br />
              Correo: <strong>{info.user_id ? info.user_id.email:''}</strong>  
            </Typography>
          </CardContent>
        </Card>
      </Grid2>

      {/* Tarjeta con información de la sucursal o dirección de entrega */}
      <Grid2 item size={{ xs: 12, sm: 6 }}>
        <Card variant="outlined">
          <CardContent>
            {info.branch ? (
              <>
                {/* Información de la sucursal de entrega */}
                <Typography variant="h5">Sucursal de Entrega:</Typography>
                <Typography>
                  Nombre de la sucursal: {info?.branch?.name}
                </Typography>
                <Typography>Estado: {info?.branch?.location?.state}</Typography>
                <Typography>
                  Municipio: {info?.branch?.location?.municipality}
                </Typography>
                <Typography>
                  Dirección: {info?.branch?.location?.direction}
                </Typography>
              </>
            ) : (
              <>
                {/* Información de la dirección de entrega */}
                <Typography variant="h5">Dirección de entrega:</Typography>
                <Typography fontSize={"14px"}>
                  Código Postal:{" "}
                  <strong>{info?.deliveryLocation?.zipcode}</strong>
                  <br />
                  Estado: <strong>{info?.deliveryLocation?.state}</strong>
                  <br />
                  Municipio:{" "}
                  <strong>{info?.deliveryLocation?.municipality}</strong>
                  <br />
                  Localidad:{" "}
                  <strong>{info?.deliveryLocation?.neighborhood}</strong>
                  <br />
                  Calle: <strong>{info?.deliveryLocation?.street}</strong>
                  <br />
                  No: <strong>{info?.deliveryLocation?.numext}</strong>
                  <br />
                  {info?.deliveryLocation?.reference
                    ? `Referencia: ${info?.deliveryLocation?.reference}`
                    : ""}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid2>

      {/* Tarjeta con información de la asignación de la ruta */}
      <Grid2 size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardHeader
            title="Asignación"
            subheader={
              info.route_detail?.guide
                ? "Asignada a compaía de envios"
                : info.route_detail?.user
                ? "Asignado a usuario"
                : "Sin asignación"
            }
          />
          <CardContent>
            {/* Muestra información del usuario o compañía asignada */}
            {info.route_detail?.user
              ? user(info.route_detail?.user)
              : info.route_detail?.guide
              ? company(info.route_detail)
              : "Sin asignación"}
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default DetailAssignRoute;
