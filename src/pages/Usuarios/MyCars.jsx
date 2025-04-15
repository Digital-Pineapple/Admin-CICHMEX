import React, { useEffect, useState } from "react";
import StyledCard from "../../components/ui/StyledCard";
import Grid from "@mui/material/Grid";
import { useMyCars } from "../../hooks/useMyCars";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Typography, Button, Fab } from "@mui/material";
import { Add, Try } from "@mui/icons-material";
import FormModal from "../../components/Forms/FormModal";

const MyCars = () => {
  // Hook personalizado para cargar, agregar y eliminar autos
  const { loadMyCars, myCars, deleteMyCar, addMyCar } = useMyCars();
  
  // Estado para manejar el ID del auto a eliminar
  const [deleteOne, setDeleteOne] = useState("");
  
  // Estado para manejar los valores del auto a agregar
  const [valuesCar, setValuesCar] = useState("");
  
  // Estado para manejar la recarga de datos
  const [reload, setReload] = useState(false);
  
  // Obtiene el parámetro "id" de la URL
  const { id } = useParams();

  // Efecto para cargar los autos del usuario y manejar la eliminación de un auto
  useEffect(() => {
    if (id) {
      loadMyCars(id); // Carga los autos del usuario
    }
    if (deleteOne) {
      loadMyCars(id); // Recarga los autos después de eliminar
      deleteMyCar(deleteOne); // Elimina el auto seleccionado
      enqueueSnackbar("Vehiculo eliminado", { variant: "success" }); // Notificación de éxito
    }
  }, [id, deleteOne]);

  // Efecto para agregar un nuevo auto
  useEffect(() => {
    if (valuesCar) {
      addMyCar(id, valuesCar); // Agrega un nuevo auto
    }
  }, [valuesCar, id]);

  // Efecto para recargar los datos cuando se activa el estado "reload"
  useEffect(() => {
    if (reload === true) {
      loadMyCars(id); // Recarga los autos
      setReload(false); // Resetea el estado de recarga
    }
  }, [reload]);

  return (
    <>
      {/* Contenedor principal */}
      <Grid container mx={"10%"} spacing={0}></Grid>
      
      {/* Título y listado de autos */}
      <Grid mx="10%" container spacing={0}>
        <Typography
          variant="h2"
          color="primary"
          align="center"
          sx={{ mb: "5%" }}
        >
          Mis Autos
        </Typography>
        
        {/* Modal para agregar un nuevo auto */}
        <FormModal id={id} setValuesCar={setValuesCar} setReload={setReload} />
        
        {/* Mapeo de los autos del usuario */}
        {myCars?.map((car) => (
          <StyledCard
            key={car._id}
            brand={car.brand}
            model={car.model}
            plate={car.plate_number}
            version={car.version}
            image={car.carDetail_image}
            setDelete={setDeleteOne} // Función para eliminar un auto
            id={car._id}
          />
        ))}
      </Grid>
    </>
  );
};

export default MyCars;
