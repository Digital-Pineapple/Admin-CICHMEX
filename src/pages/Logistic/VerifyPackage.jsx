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
import LoadPackageModal from "../../components/Modals/LoadPackageModal";

const VerifyPackage = () => {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL.
  const { loadProductOrder, productOrder, navigate, loadVerifyStartRoute } =
    useProductOrder(); // Hook personalizado para manejar órdenes de productos.

  const { loadUser, user } = useUsers(); // Hook personalizado para manejar usuarios.

  useEffect(() => {
    loadProductOrder(id); // Carga la orden de producto al montar el componente o cuando cambia el 'id'.
  }, [id]);

  useEffect(() => {
    loadUser(productOrder?.route_detail?.user); // Carga los datos del usuario asociado a la ruta de la orden.
  }, [productOrder]);

  const date = localDate(productOrder?.supply_detail?.date); // Convierte la fecha ISO a un formato local.

  const startRoute = () => {
    // Inicia la verificación y el inicio de la ruta.
    loadVerifyStartRoute({ order_id: id, user: productOrder?.route_detail?.user });
  };
  return (
    <Grid
      container
      padding={{ xs: 2, md: 5 }}
      display={"flex"}
      justifyContent={"space-between"}
    >
      {/* Título principal */}
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

      {/* Muestra el ID de la orden */}
      <Grid item xs={12} m={2}>
        <Typography variant="h3" textAlign={"center"}>
          Id de orden: {productOrder?.order_id}
        </Typography>
      </Grid>

      {/* Información del almacén y la sucursal o dirección de envío */}
      <Grid item xs={12} md={5}>
        <h2>Almacén:</h2>
        <Typography>
          Responsable de empaque: {productOrder?.supply_detail?.user?.fullname}
        </Typography>
        <Typography>Fecha de empaque: {date}</Typography>

        {productOrder.branch ? (
          <>
            {/* Información de la sucursal de entrega */}
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
              Localidad: {productOrder?.branch?.location?.neighborhood}
            </Typography>
            <Typography>
              Dirección: {productOrder?.branch?.location?.direction}
            </Typography>
            <Typography>
              CP: {productOrder?.branch?.location?.cp}
            </Typography>
          </>
        ) : (
          <>
            {/* Información de la dirección de envío */}
            <h2>Direccion de envío:</h2>
            <Typography>
              Estado: {productOrder?.deliveryLocation?.state}
            </Typography>
            <Typography>
              Municipio: {productOrder?.deliveryLocation?.municipality}
            </Typography>
            <Typography>
              Calle: {productOrder?.deliveryLocation?.direction}
            </Typography>
            <Typography>
              Código postal: {productOrder?.deliveryLocation?.cp}
            </Typography>
            <Typography>
              Referencias: {productOrder?.deliveryLocation?.references}
            </Typography>
          </>
        )}
      </Grid>

      {/* Botones para verificar y comenzar la ruta o cancelar */}
      <Grid mt={2} item xs={12} md={6}>
        <ButtonGroup fullWidth variant="contained" color="inherit">
          <Button color="success" onClick={() => startRoute()}>
            Verificar y comenzar ruta
          </Button>
          <Button
            color="error"
            onClick={() =>
              navigate(`/auth/cargar-paquetes`, { replace: true })
            }
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default VerifyPackage;
