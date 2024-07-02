import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Tooltip,
  Typography,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import { green, red } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { useStoreHouse } from "../../hooks/useStoreHouse";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px  #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 5,
};

const AddButton2 = ({ title, product }) => {
  const [openForm, setopenForm] = useState(false);
  const handleOpen = () => setopenForm(true);
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setopenForm(false);
    }
  };
  const { addStockProduct } = useStoreHouse();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      stock: "",
    },
  });

  const sendInfo = async (data) => {
    const num1 = parseInt(data.stock)
    const num2 = parseInt(product.stock)
    const text = `Cantidad :${num2} + ${num1} = ${num1+num2}`
    setopenForm(false)
    Swal.fire({
          title: title,
          text: text,
          showDenyButton: true,
          denyButtonText: "Cancelar",
          confirmButtonText: "Agregar",
          confirmButtonColor: green[700],
          allowOutsideClick:false,
        }).then((result) => {
          if (result.isConfirmed) {
            addStockProduct(product.stock_id, data);
            reset()
          } else if (result.isDenied) {
            reset()
            Swal.fire({
              title: "Cancelado",
              icon: "error",
              confirmButtonColor: red[900],
              timer: 2000,
              timerProgressBar: true,
            });
          }
        });
  };


  const ModalSweet = () => {
    handleOpen();
  };

  const validateGreaterThanZero = (value) => {
    return parseInt(value) > 0 || "El valor debe ser mayor a 0";
  };

  return (
    <>
      <Button
        color="success"
        onClick={() => ModalSweet()}
        // startIcon={<Add />}
        variant="contained"
        fullWidth
      >
        {title ? title : ""}
      </Button>
      <Modal
        open={openForm}
        onClose={handleClose}
        component={"form"}
        onSubmit={handleSubmit(sendInfo)}
      >
        <Grid container sx={style}>
          <IconButton
            disableRipple
            aria-label="Cerrar"
            onClick={() => setopenForm(false)}
            sx={{position:'absolute', transform: "translate(790%, -90%)",}}
          >
            <Close />
          </IconButton>

          <Typography variant="h4" component="h2">
            Agregar Stock {product?.name}
          </Typography>
          <br />
          <Typography variant="h6" component="h2">
            Stock Actual {product?.stock}
          </Typography>
          <Controller
            name="stock"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Valor requerido" },
              validate: validateGreaterThanZero,
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                label="Cantidad"
                fullWidth
                sx={{ marginY: "20px" }}
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                inputProps={{ ...field }}
              />
            )}
          />
          <Button variant="contained" type="submit" fullWidth color="primary">
            Agregar stock
          </Button>
        </Grid>
      </Modal>
    </>
  );
};

export default AddButton2;
