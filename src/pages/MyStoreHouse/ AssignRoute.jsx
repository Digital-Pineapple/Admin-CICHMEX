import {
  Grid,
  Button,
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  ButtonGroup, TextField,
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AssignRoute = () => {
  const { id } = useParams();
  const { loadProductOrder, productOrder, loading, loadAssignRoute } =
    useProductOrder();
  const [selectShipping, setSelectShipping] = useState(0)
  const { CarrierDrivers, loadCarrierDrivers, navigate } = useUsers();
  useEffect(() => {
    loadProductOrder(id);
    loadCarrierDrivers();
  }, [id]);


  const shippingCompanies = [
    "Fedex",
    "DHL",
    "Estafeta",
    "Paquete Express"
  ]
  const formik = useFormik({
    initialValues: {
      user_id: productOrder?.route_detail?.user
        ? productOrder.route_detail.user
        : "",
      order_id: id ? id : productOrder?._id,
      guide: '',
      shipping_company: ''
    },
    onSubmit: (values) => {
      let data = { ...values }; // Clonar los valores
  
      if (values.shipping_company) {
        data.user_id = ''; // Modificar el campo en el objeto clonado
      }
      loadAssignRoute(data);
      formik.resetForm()
    },
  });
  


  const date = localDate(productOrder?.supply_detail?.date);
  if (loading) {
    return (<LoadingScreenBlue />)
  }


  return (
    <Grid
      container
      component={"form"}
      padding={2}
      onSubmit={formik.handleSubmit}
      display={"flex"}
      justifyContent={"center"}
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
            <h2>Dirección de entrega:</h2>

            <Typography>
              Código Postal: {productOrder?.deliveryLocation?.cp}
            </Typography>
            <Typography>
              Estado: {productOrder?.deliveryLocation?.state}
            </Typography>
            <Typography>
              Municipio: {productOrder?.deliveryLocation?.municipality}
            </Typography>
            <Typography>
              Dirección: {productOrder?.deliveryLocation?.direction}
            </Typography>
          </>
        )}
      </Grid>

      {
        selectShipping === 0 ? (
          <Grid item xs={12} md={5}>
            <FormControl fullWidth>
              <FormLabel>Asigne al transportista encargado</FormLabel>
              <Select
                id="user_id"
                name="user_id"
                value={formik.values.user_id}
                label="Seleccione al transportista"
                onChange={formik.handleChange}
              >
                {CarrierDrivers.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.fullname}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Seleccione al transportista</FormHelperText>
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
              <Button
                onClick={() =>
                  navigate("/auth/Ordenes-de-producto", { replace: true })
                }
                variant="contained"
                color="warning"
                startIcon={<Close />}
              >
                Cancelar
              </Button>
            </ButtonGroup>
          </Grid>
        ) : (

          <Grid item xs={12} md={5}>
            <FormControl fullWidth>
              <FormLabel>Asigne la compañia de envio</FormLabel>
              <Select
                id="shipping_company"
                name="shipping_company"
                value={formik.values.shipping_company}
                label="Selecciona la compañia"
                onChange={formik.handleChange}
              >
                {shippingCompanies.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Seleccione una compañia</FormHelperText>
            </FormControl>
            <TextField
              id="guide"
              label="guia de envio"
              value={formik.values.guide}
              onChange={formik.handleChange}
              variant="outlined"
            />
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
                Asignar compañia
              </Button>
              <Button
                onClick={() =>
                  navigate("/auth/Ordenes-de-producto", { replace: true })
                }
                variant="contained"
                color="warning"
                startIcon={<Close />}
              >
                Cancelar
              </Button>
            </ButtonGroup>
          </Grid>
        )
      }



      <Grid item xs={12}>
        <ButtonGroup fullWidth variant="contained" color="primary" aria-label="SelectShipphing">
          <Button onClick={() => {setSelectShipping(0), formik.setValues({shipping_company:'', guide:''})}} >Asignar transportista</Button>
          <Button onClick={() => {setSelectShipping(1), formik.setFieldValue('user_id','')}}>Asignar compañia de envios</Button>

        </ButtonGroup>

      </Grid>


    </Grid>
  );
};

export default AssignRoute;
