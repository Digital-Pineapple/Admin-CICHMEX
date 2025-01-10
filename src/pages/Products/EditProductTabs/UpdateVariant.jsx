import { Grid2, TextField, Button, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../../../hooks";

const UpdateVariant = ({ variantValues, handleClose}) => {
  const {editVariant} = useProducts()
  const DefaultValues = (data) => ({
    price: data.price || "",
    porcentDiscount: data.porcentDiscount || "",
    discountPrice: data.price || "",
    tag: data.tag || "",
    weight: data.weight || "",
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: DefaultValues(variantValues),
  });

  const calculateDiscountPrice = (price, porcentDiscount) => {
    const parsedPrice = parseFloat(price);
    const parsedDiscount = parseFloat(porcentDiscount) || 0;
    return parsedPrice - (parsedPrice * parsedDiscount) / 100;
  };
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = parseFloat(value) || 0; // Convierte a número o usa 0 como predeterminado

    // Obtén los valores actuales del formulario
    let price = watch(`price`) || 0;
    let discount = watch(`porcentDiscount`) || 0;

    // Actualiza solo el valor relevante
    if (name.includes("price")) price = fieldValue;
    if (name.includes("porcentDiscount")) discount = fieldValue;

    // Calcula el precio con descuento
    const discountPrice = calculateDiscountPrice(price, discount);

    // Actualiza los valores del formulario
    setValue(`price`, price);
    setValue(`porcentDiscount`, discount);
    setValue(`discountPrice`, discountPrice);
  };

  const onSubmit = (e) => {
    editVariant(variantValues._id, e, handleClose)
  };
  return (
    <Grid2 component={"form"} display={'flex'} gap={2} onSubmit={handleSubmit(onSubmit)} container>
      <Grid2

        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px" }}
        >
          Editar talla : { variantValues.attributes?.size }
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`price`}
          control={control}
          rules={{
            required: "Campo requerido",
          }}
          render={({ field: textField }) => (
            <TextField
              {...textField}
              fullWidth
              size="small"
              label={"Precio(MXN)*"}
              autoComplete="off"
              onChange={handlePriceChange}
              placeholder="Precio"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`porcentDiscount`}
          control={control}
          rules={{
            min: {
              value: 0,
              message: "El descuento no puede ser menor a 0%",
            },
            max: {
              value: 99,
              message: "El descuento no puede ser mayor al 99%",
            },
          }}
          render={({ field: textField }) => (
            <TextField
              {...textField}
              fullWidth
              size="small"
              label="Descuento (%)"
              autoComplete="off"
              onChange={(e) => handlePriceChange(e)}
              type="number"
              error={!!errors.porcentDiscount}
              helperText={errors.porcentDiscount?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`discountPrice`}
          control={control}
          rules={{
            validate: (value) =>
              value === "" || value >= 0 || "El descuento debe ser mayor a 0 ",
          }}
          render={({ field: textField }) => (
            <TextField
              {...textField}
              fullWidth
              size="small"
              label="Precio con Descuento (MXN)"
              onChange={(e) => handlePriceChange(e)}
              autoComplete="off"
              type="number"
              error={!!errors.discountPrice}
              helperText={errors.discountPrice?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`tag`}
          control={control}
          rules={{
            required: "Campo requerido *",
          }}
          render={({ field: textField }) => (
            <TextField
              {...textField}
              fullWidth
              size="small"
              label={"Código"}
              error={!!errors.tag}
              helperText={errors.tag?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`weight`}
          control={control}
          rules={{
            required: "Campo requerido *",
          }}
          render={({ field: textField }) => (
            <TextField
              {...textField}
              fullWidth
              size="small"
              label={"peso"}
              error={!!errors.weight}
              helperText={errors.weight?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 display={'flex'} gap={2} size={12}>
        <Button fullWidth onClick={()=> handleClose()} variant="contained" color="warning">
          Cancelar
        </Button>
        <Button fullWidth type="submit" variant="contained" color="success">
          Guardar Cambios
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default UpdateVariant;
