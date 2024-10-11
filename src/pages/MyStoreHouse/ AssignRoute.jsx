import {
  Grid,
  Button,
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  ButtonGroup,
  TextField,
  Card,
  CardContent,
  CardActions, CardHeader, Avatar, IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useFormik, useFormikContext } from "formik";
import { localDate } from "../../Utils/ConvertIsoDate";
import { useUsers } from "../../hooks/useUsers";
import { AssistantDirection, Close } from "@mui/icons-material";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AssignRoute = () => {
  const { id } = useParams();
  const { loadProductOrder, productOrder, loading, loadAssignRoute } =
    useProductOrder();
  const {  navigate } = useUsers();
  useEffect(() => {
    loadProductOrder(id);
  }, [id]);

  const shippingCompanies = ["Fedex", "DHL", "Estafeta", "Paquete Express"];
  const formik = useFormik({
    initialValues: {
      user_id: productOrder?.route_detail?.user
        ? productOrder.route_detail?.user
        : "",
      order_id: id ? id : productOrder?._id,
      guide: "",
      shipping_company: "",
    },
    onSubmit: (values) => {
      let data = { ...values }; // Clonar los valores

      if (values.shipping_company) {
        data.user_id = ""; // Modificar el campo en el objeto clonado
      }
      loadAssignRoute(data);
      formik.resetForm();
    },
  });

  const date = localDate(productOrder?.supply_detail?.date);
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid
      container
      component={"form"}
      padding={2}
      onSubmit={formik.handleSubmit}
      display={"flex"}
      justifyContent={"center"}
      gap={2}
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
          Asignar compañia de envios
        </Typography>
      </Grid>

      <Grid item xs={12} sm={5}>
        <Card sx={{height:'100%'}} variant="outlined">
          <CardHeader
            title={`Id de orden:${productOrder?.order_id}`}
          />
          <CardContent>
            <Typography fontSize={"14px"}>
              Responsable de empaque:{" "}
              <strong> {productOrder?.supply_detail?.user?.fullname}</strong>
              <br />
              Fecha de empaque: <strong>{date}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card variant="outlined">
          <CardContent>
            {productOrder.branch ? (
              <>
                <Typography variant="h5">Sucursal de Entrega:</Typography>

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
                <Typography variant="h5">Dirección de entrega:</Typography>
                <Typography fontSize={"14px"}>
                  Código Postal:{" "}
                  <strong>{productOrder?.deliveryLocation?.zipcode}</strong>
                  <br />
                  Estado:{" "}
                  <strong>{productOrder?.deliveryLocation?.state}</strong>
                  <br />
                  Municipio:{" "}
                  <strong>
                    {productOrder?.deliveryLocation?.municipality}
                  </strong>
                  <br />
                  Localidad:{" "}
                  <strong>
                    {productOrder?.deliveryLocation?.neighborhood}
                  </strong>
                  <br />
                  Calle:{" "}
                  <strong>{productOrder?.deliveryLocation?.street}</strong>
                  <br />
                  No: <strong>{productOrder?.deliveryLocation?.numext}</strong>
                  <br />
                  {productOrder?.deliveryLocation?.reference
                    ? `Referencia: ${productOrder?.deliveryLocation?.reference}`
                    : ""}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={5} >
        <FormControl  fullWidth size="small">
          <FormLabel>Asigne la compañia de envio</FormLabel>
          <Select
            id="shipping_company"
            name="shipping_company"
            value={formik.values.shipping_company}
            // label="Selecciona la compañia"
            onChange={formik.handleChange}
          >
            {shippingCompanies.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          size="small"
          id="guide"
          label="guia de envio"
          value={formik.values.guide}
          onChange={formik.handleChange}
          variant="outlined"
          sx={{marginY:2}}
        />
        
         
         
      </Grid>
      <Grid item xs={12} display={'flex'} gap={2} justifyContent={'center'}>
      <Button
            onClick={() =>
              navigate("/almacenista/mis-ventas", { replace: true })
            }
            variant="contained"
            color="warning"
            startIcon={<Close />}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<AssistantDirection />}
            type="submit"
          >
            Asignar compañia
          </Button>
       
      </Grid>

    </Grid>
  );
};

export default AssignRoute;
