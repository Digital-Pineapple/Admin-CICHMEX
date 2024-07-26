import {
  Grid,
  Skeleton,
  Button,
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  ButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { localDate } from "../../Utils/ConvertIsoDate";
import { useUsers } from "../../hooks/useUsers";
import { AssistantDirection, Close } from "@mui/icons-material";

const VerifyPackage = () => {
  const { id } = useParams();
  const { loadProductOrder, productOrder } =
    useProductOrder();

  const { loadUser, user } = useUsers();
  useEffect(() => {
    loadProductOrder(id);
    loadUser(productOrder.route_detail.user);
  }, [id]);

  const date = localDate(productOrder?.supply_detail?.date);
  return (
    <Grid
      container
      padding={{xs:2, md:5}}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h2"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Verificar y cargar paquete
        </Typography>
      </Grid>
      <Grid item xs={12} m={2}>
        <Typography variant="h3" textAlign={'center'}>Id de orden: {productOrder?.order_id}</Typography>
      </Grid>

      <Grid item xs={12} md={5}>
      <h2>Almacén:</h2>

        <Typography>
          Responsable de empaque: {productOrder?.supply_detail?.user?.fullname}
        </Typography>
        <Typography>Fecha de empaque: {date}</Typography>

        {productOrder.branch ? (
          <>
            <h2>Sucursal de Entrega:</h2>

            <Typography>
              Nombre de la sucursal: {productOrder?.branch?.name}
            </Typography>
            <Typography>
              Estado: {productOrder?.branch?.location?.state}
            </Typography>
            <Typography>
              Municipio: {productOrder?.branch?.location?.municipality}
            </Typography>
            <Typography>
              Dirección: {productOrder?.branch?.location?.direction}
            </Typography>
          </>
        ) : (
          <>
            <h2>Direccion de envío:</h2>
            <Typography>
              Estado: {productOrder?.deliveryLocation?.state}
            </Typography>
            <Typography>
              Municipio: {productOrder?.deliveryLocation?.municipality}
            </Typography>
            <Typography>
              Calle: {productOrder?.deliveryLocation?.address}
            </Typography>
            <Typography>
              Numero exterior: {productOrder?.deliveryLocation?.extNumber}
            </Typography>
            <Typography>
              Numero interior: {productOrder?.deliveryLocation?.intNumber}
            </Typography>
            <Typography>
              Referencias: {productOrder?.deliveryLocation?.references}
            </Typography>
          </>
        )}
      </Grid>

      <Grid item xs={12} md={5}>
        <h2>Transportista:</h2>

        <Typography>Nombre: {user.fullname}</Typography>
        <Typography>Correo: {user.email}</Typography>
        <Typography>
          Telefono:{" "}
          {user?.phone_id?.phone_number
            ? user?.phone_id?.phone_number
            : "Sin numero"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default VerifyPackage;
