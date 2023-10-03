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
  const { loadMyCars, myCars, deleteMyCar, addMyCar } = useMyCars();
  const [deleteOne, setDeleteOne] = useState("");
  const [valuesCar, setValuesCar] = useState("")
  const [reload, setReload] = useState(false)
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      loadMyCars(id);
    }
    if (deleteOne) {
      loadMyCars(id);
      deleteMyCar(deleteOne);
      enqueueSnackbar("Vehiculo eliminado", { variant: "success" });
    }
  }, [id, deleteOne]);
  useEffect(() => {
    if (valuesCar) {
      addMyCar(id,valuesCar)
    }
  }, [valuesCar,id])

useEffect(() => {
  if (reload === true) 
  {
    loadMyCars(id)
    setReload(false)
  }
}, [reload])

  return (
    <>
      <Grid m="10%" container spacing={0}>
        <Typography
          variant="h2"
          color="primary"
          align="center"
          sx={{ mb: "5%" }}
        >
          Mis Autos
        </Typography>
        <FormModal id={id} setValuesCar={setValuesCar} setReload={setReload} />
        {myCars?.map((car) => (
          <StyledCard
            key={car._id}
            brand={car.brand}
            model={car.model}
            plate={car.plate_number}
            version={car.version}
            image={car.carDetail_image}
            setDelete={setDeleteOne}
            id={car._id}
          />
        ))}
      </Grid>
    </>
  );
};

export default MyCars;
