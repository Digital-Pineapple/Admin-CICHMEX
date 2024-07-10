import Titles from "../../components/ui/Titles";
import {
  TextField,
  Grid,
  Typography,
  Button,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  ButtonGroup,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useServices } from "../../hooks/useServices";
import { useTypeCars } from "../../hooks/UseTypeCars";
import { useFormik } from "formik";
import { AttachMoney } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { useMembership } from "../../hooks/useMembership";

const Create = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedTypeCar, setSelectedTypeCar] = useState("");
  const [quantity, setQuantity] = useState("");
  const [myServices, setMyServices] = useState([]);
  const [myTypeCars, setMyTypeCars] = useState([]);
  const { loadServices, services, navigate } = useServices();
  const { typeCars, loadTypeCars } = useTypeCars();
  const {addMembership} = useMembership()

  useEffect(() => {
    loadServices();
    loadTypeCars();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      price_standard: "",
      discount_porcent: "",
      discount_products: "",
      service_quantity: [],
      type_cars: [],
    },
    onSubmit: (values) => {
     const x = values.type_cars
     const y = x.map((i)=>i.typeCar_id)
     values.type_cars = y
     console.log(values);
      try {
        addMembership(values)
        
      } catch (error) {
        enqueueSnackbar(`Error: ${error.data.response?.message}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  const handleChangeService = (event) => {
    setSelectedService(event.target.value);
  };

  const handleChangeTypeCar = (event) => {
    setSelectedTypeCar(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddService = () => {
    if (selectedService && quantity) {
      const newService = {
        service_id: selectedService._id,
        quantity,
      };
      const updatedServices = [...myServices, newService];
      setMyServices(updatedServices);
      setSelectedService("");
      setQuantity("");
      formik.setFieldValue("service_quantity", updatedServices);
    }
  };

  const handleAddTypeCar = () => {
    if (selectedTypeCar) {
      const newTypeCar = {
        typeCar_id: selectedTypeCar._id,
        name: selectedTypeCar.name,
      };
      const updatedTypeCars = [...myTypeCars, newTypeCar];
      setMyTypeCars(updatedTypeCars);
      setSelectedTypeCar("");
      formik.setFieldValue("type_cars", updatedTypeCars);
    }
  };

  const handleDeleteService = (index) => {
    const updatedServices = [...myServices];
    updatedServices.splice(index, 1);
    setMyServices(updatedServices);
    formik.setFieldValue("service_quantity", updatedServices);
  };

  const handleDeleteTypeCar = (index) => {
    const updatedTypeCars = [...myTypeCars];
    updatedTypeCars.splice(index, 1);
    setMyTypeCars(updatedTypeCars);
    formik.setFieldValue("type_cars", updatedTypeCars);
  };

  const outCreate = () => {
    navigate("/auth/Membresias");
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Grid item marginTop={{ xs: "-30px" }} xs={12} minHeight={"100px"} className="Titles">
        <Typography textAlign={"center"} variant="h1" fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}>
          Crear Membresía
        </Typography>
      </Grid>

      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography variant="h3" margin={2} fontSize={"30px"} textAlign="center">
            Datos Generales
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8} lg={5}>
          <TextField
            focused
            fullWidth
            id="name"
            name="name"
            label="Nombre de la membresía"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3.5} lg={2.3}>
          <TextField
            focused
            fullWidth
            id="price_standard"
            name="price_standard"
            label="Precio estándar"
            variant="outlined"
            value={formik.values.price_standard}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={5.9} lg={2}>
          <TextField
            focused
            fullWidth
            id="discount_porcent"
            name="discount_porcent"
            label="Descuento de membresía"
            variant="outlined"
            value={formik.values.discount_porcent}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={5.6} lg={2}>
          <TextField
            focused
            fullWidth
            id="discount_products"
            name="discount_products"
            label="Descuento en productos"
            variant="outlined"
            value={formik.values.discount_products}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>

      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography variant="h3" margin={2} fontSize={"30px"} textAlign="center">
            Servicios de la membresía
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <FormControl fullWidth>
            <InputLabel id="select-service">Seleccionar Servicio</InputLabel>
            <Select
              labelId="select-service"
              value={selectedService}
              label="Seleccionar Servicio"
              onChange={handleChangeService}
            >
              {services.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5.5} lg={2.5}>
          <TextField
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={handleChangeQuantity}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button variant="contained" fullWidth onClick={handleAddService}>
            Agregar Servicio
          </Button>
        </Grid>

        {myServices.length > 0 ? (
          <Grid
            container
            gap={2}
            bgcolor={blueGrey[200]}
            borderRadius={"10px"}
            minHeight={"20vh"}
            padding={2}
            justifyContent={"center"}
          >
            <Grid item xs={12}>
              <Typography color={"primary"} textAlign={"center"} variant="h5">
                Servicios Seleccionados
              </Typography>
            </Grid>
            {myServices.map((item, index) => (
              <Grid xs={5} sm={3} lg={2} key={index}>
                <Card variant="elevation">
                  <CardContent>
                    <Typography>Servicio: {item.name}</Typography>
                    <Typography>Cantidad: {item.quantity}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" onClick={() => handleDeleteService(index)}>
                      Eliminar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center" variant="h6" color="textSecondary">
            No hay servicios seleccionados
          </Typography>
        )}
      </Grid>

      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography variant="h3" margin={2} fontSize={"30px"} textAlign="center">
            Tipos de auto aceptados
          </Typography>
        </Grid>

        <Grid item xs={12} sm={7.5} lg={8.6}>
          <FormControl fullWidth>
            <InputLabel id="select-typeCar">Seleccionar tipo de auto</InputLabel>
            <Select
              labelId="select-typeCar"
              value={selectedTypeCar}
              label="Seleccionar tipo de auto"
              onChange={handleChangeTypeCar}
            >
              {typeCars.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} lg={3}>
          <Button variant="contained" fullWidth onClick={handleAddTypeCar}>
            Agregar Tipo de auto
          </Button>
        </Grid>

        {myTypeCars.length > 0 ? (
          <Grid
            container
            gap={2}
            bgcolor={blueGrey[200]}
            borderRadius={"10px"}
            minHeight={"20vh"}
            padding={2}
            justifyContent={"center"}
          >
            <Grid item xs={12}>
              <Typography color={"primary"} textAlign={"center"} variant="h5">
                Tipos de auto seleccionados
              </Typography>
            </Grid>
            {myTypeCars.map((item, index) => (
              <Grid xs={5} sm={3} lg={2} key={index}>
                <Card variant="elevation">
                  <CardContent>
                    <Typography>Tipo de auto: {item.name}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" onClick={() => handleDeleteTypeCar(index)}>
                      Eliminar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center" variant="h6" color="textSecondary">
            No hay autos seleccionados
          </Typography>
        )}
      </Grid>

      <Grid container justifyContent={"center"} alignItems={"center"}>
        <ButtonGroup variant="contained" color="inherit" size="large" aria-label="group" fullWidth>
          <Button type="submit" variant="contained" color="success">
            Guardar
          </Button>
          <Button onClick={outCreate} variant="contained" size="large" color="warning">
            Salir
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Create;
