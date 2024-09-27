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
  const { id } = useParams();
  const { loadProductOrder, productOrder, navigate, loadVerifyStartRoute } =
    useProductOrder();

  const { loadUser, user } = useUsers();
  useEffect(() => {
    loadProductOrder(id);
  }, [id]);
  useEffect(() => {
    loadUser(productOrder?.route_detail?.user);
  }, [productOrder]);

  const date = localDate(productOrder?.supply_detail?.date);

  const startRoute =()=>{
    loadVerifyStartRoute({order_id:id, user:productOrder?.route_detail?.user})
  }
  

  
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

      <Grid mt={2} item xs={12} md={6}>
        <ButtonGroup fullWidth variant="contained" color="inherit">
          <Button color="success" onClick={()=>startRoute()}>Verificar y comenzar ruta</Button>
          <Button color="error" onClick={()=>navigate(`/auth/cargar-paquetes`, {replace:true})} >Cancelar</Button>
        </ButtonGroup>
      </Grid>
  
    </Grid>
  );
};

export default VerifyPackage;
