import React from "react";
import Button from "@mui/material/Button";
import { color } from "@mui/system";
import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../../../hooks/useProducts";

const AddSizeModal = ({ productId, variant, sizes, handleClose }) => {
  const { addOneSizeVariant } = useProducts();
  const sizesExist = variant.items.map((i) => i.attributes.size);
  const availableSizes = sizes.filter(
    (size) => !sizesExist.some((existing) => existing === size.label)
  );

  const DefaultValues = (variant) => ({
    size: "",
    price: "",
    porcentDiscount: "",
    discountPrice: "",
    tag: "",
    weight: "",
    color: variant.color,
    design: variant.design[0],
    images: variant.images,
    stock: "",
    product_id: productId,
    purchase_price: "",
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues: DefaultValues(variant),
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
    addOneSizeVariant(e, handleClose);
  };

  return (
    <Grid2
      component={"form"}
      display={"flex"}
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
      container
    >
      <Grid2 size={12} minHeight={"100px"} className="Titles">
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px" }}
        >
          Agregar talla
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.size}>
          <InputLabel>Talla o medida*</InputLabel>
          <Controller
            name={`size`}
            control={control}
            rules={{
              required: "Campo requerido",
            }}
            render={({ field }) => (
              <Select
                {...field}
                size="small"
                label="Talla o medida*"
                value={watch(`size`)}
              >
                {availableSizes?.map((dimension) => (
                  <MenuItem key={dimension.label} value={dimension.label}>
                    {dimension.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            {errors?.size?.message || "Seleccione una medida"}
          </FormHelperText>
        </FormControl>
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={"purchase_price"}
          control={control}
          rules={{
            required: "Campo requerido",
            validate: (value) => {
              const price = getValues('price');
              return (
                value <= price ||
                "El precio de compra no puede ser mayor que el precio neto"
              );
            },
          }}
          render={({ field: textField }) => (
            <TextField
              {...textField}
              fullWidth
              size="small"
              label={"Precio de compra (MXN)*"}
              autoComplete="off"
              onChange={textField.onChange}
              placeholder="Precio de compra"
              type="number"
              error={!!errors.purchase_price}
              helperText={errors.purchase_price?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`price`}
          control={control}
          rules={{
            required: "Campo requerido",
            min: {
              value: 0,
              message: "El valor no puede ser menor a $0",
            },
          }}
          render={({ field: textField }) => (
            <TextField
              {...textField}
              fullWidth
              size="small"
              label={"Precio neto(MXN)*"}
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
              label={"Peso (gr)"}
              error={!!errors.weight}
              helperText={errors.weight?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`stock`}
          control={control}
          rules={{
            required: "Campo requerido *",
          }}
          render={({ field: textField }) => (
            <TextField
              {...textField}
              fullWidth
              size="small"
              label={"Stock"}
              type="number"
              error={!!errors.stock}
              helperText={errors.stock?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 display={"flex"} gap={2} size={12}>
        <Button
          fullWidth
          onClick={() => handleClose()}
          variant="contained"
          color="warning"
        >
          Cancelar
        </Button>
        <Button fullWidth type="submit" variant="contained" color="success">
          Guardar Cambios
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AddSizeModal;
