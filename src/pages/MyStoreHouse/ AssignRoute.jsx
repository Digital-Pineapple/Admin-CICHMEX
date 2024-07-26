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

const AssignRoute = () => {
  const { id } = useParams();
  const { loadProductOrder, productOrder, rowsProducts, loadAssignRoute } =
    useProductOrder();

  const { CarrierDrivers, loadCarrierDrivers, navigate } = useUsers();
  useEffect(() => {
    loadProductOrder(id);
    loadCarrierDrivers();
  }, [id]);
  const rows = rowsProducts();

  const formik = useFormik({
    initialValues: {
      user_id: productOrder.route_detail.user
        ? productOrder.route_detail.user
        : "",
      order_id: id ? id : productOrder?._id,
    },
    onSubmit: (values) => {
      loadAssignRoute(values);
    },
  });

  const date = localDate(productOrder?.supply_detail?.date);

  return (
    <Grid
      container
      component={"form"}
      padding={2}
      onSubmit={formik.handleSubmit}
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
          Asignar Ruta - Transportista
        </Typography>
      </Grid>

      <Grid item xs={12} md={5}>
        <h2>Id de orden: {productOrder?.order_id}</h2>
        <Typography>
          Responsable de empaque: {productOrder?.supply_detail?.user?.fullname}
        </Typography>
        <Typography>Fecha de empaque: {date}</Typography>

        <h2>Sucursal de Entrega:</h2>

        <Typography>
          Nombre de la sucursal: {productOrder?.branch?.name}
        </Typography>
        <Typography>Estado: {productOrder?.branch?.location?.state}</Typography>
        <Typography>
          Municipio: {productOrder?.branch?.location?.municipality}
        </Typography>
        <Typography>
          Dirección: {productOrder?.branch?.location?.direction}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <h2>Lista de productos</h2>
        {rows ? (
          <DataGrid
            hideFooterSelectedRowCount={true}
            columns={[
              {
                field: "name",
                headerName: "Nombre del producto",
                flex: 1,
                align: "center",
              },
              {
                field: "quantity",
                headerName: "Cantidad ",
                flex: 1,
                align: "center",
              },
            ]}
            rows={rows}
          />
        ) : (
          <Skeleton variant="rectangular" />
        )}
      </Grid>

      <Grid item xs={12} md={5}>
        <FormControl fullWidth>
          <FormLabel>Asigne al transportista encargado</FormLabel>
          <Select
            id="user_id"
            name="user_id"
            value={formik.values.user_id}
            label="Selecciona la categoría"
            onChange={formik.handleChange}
          >
            {CarrierDrivers.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.fullname}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Seleccione un Transportista</FormHelperText>
        </FormControl>
        <ButtonGroup
          variant="contained"
          fullWidth
          color="inherit"
          aria-label=""
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<AssistantDirection />}
            type="submit"
          >
            Asignar transportista
          </Button>
          <Button onClick={()=>navigate('/auth/Envios/punto-de-entrega', {replace:true})} variant="contained" color="warning" startIcon={<Close />}>
            Cancelar
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default AssignRoute;
