import Titles from "../../components/ui/Titles";
import { TextField, Grid, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useServices } from "../../hooks/useServices";

const Create = () => {
    const [selectedService, setSelectedService] = useState("");
    const [quantity, setQuantity] = useState("");
    const [myServices, setMyServices] = useState([]);
  
    const handleChangeService = (event) => {
      setSelectedService(event.target.value);
    };
  
    const handleChangeQuantity = (event) => {
      setQuantity(event.target.value);
    };
  
    const handleAddService = () => {
      if (selectedService && quantity) {
        const newService = { service_id: selectedService._id, quantity, name: selectedService.name };
        setMyServices([...myServices, newService]);
        setSelectedService("");
        setQuantity("");
      }
    };
  
    const handleDeleteService = (index) => {
      const updatedServices = [...myServices];
      updatedServices.splice(index, 1);
      setMyServices(updatedServices);
    };

  const { loadServices, services } = useServices();

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <>
      <Titles name={<h2 align="center">Nueva membresía</h2>} />

      <Grid container pl={10}>

        <Grid
          item
          xs={12}
          width={"100%"}
          color="primary"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h5" align="center">
            Datos Generales
          </Typography>
        </Grid>

        <Grid
          container
          padding={5}
          boxSizing={"border-box"}
          justifyContent={"space-between"}
          minHeight={"50vh"}
          bgcolor={"red"}
        >
          <Grid
            item
            justifyItems={"center"}
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            xs={12}
            bgcolor={"blue"}
          >
            <TextField label="Nombre" color="primary" focused />
            <TextField
              label="Precio Estándar"
              type="number"
              color="primary"
              focused
            />
            <TextField
              label="Porcentaje de descuento"
              color="secondary"
              focused
            />
            <TextField
              label="Porcentaje de descuento en tiendas"
              color="secondary"
              focused
            />
          </Grid>
          </Grid>



<Grid
  container
  spacing={1}
  direction="column"
  wrap="nowrap"

  
>
    <Grid item xs={12} bgcolor={'green'} display={'flex'} marginY={'20px'} justifyContent={'center'} >
<Typography variant="h1" fontSize={'25px'} >Servicios de la membresía</Typography>      
    </Grid>

    <Grid item xs={5}>
        <FormControl fullWidth>
          <InputLabel id="select-service">Seleccionar Servicio</InputLabel>
          <Select
            labelId="select-service"
            value={selectedService}
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

      <Grid item xs={5}>
        <TextField
          label="Cantidad"
          type="number"
          value={quantity}
          onChange={handleChangeQuantity}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" onClick={handleAddService}>
          Agregar Servicio
        </Button>
      </Grid>


  
</Grid>


      <Grid container minHeight={'20vh'} >
        <Typography variant="h5">Servicios Seleccionados</Typography>
        {myServices.map((item, index) => (
          <div key={index}>
            <Typography>{item.name}</Typography>
            <Typography>{item.quantity}</Typography>
            <Button
              variant="contained"
              onClick={() => handleDeleteService(index)}
            >
              Eliminar
            </Button>
          </div>
        ))}
      </Grid>

        //
      </Grid>
    </>
  );
};

export default Create;
