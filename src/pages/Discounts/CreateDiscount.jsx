import {
  Grid2,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Tooltip,
  Checkbox,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ProductsFilter from "../../components/Filters/ProductsFilter";
import { ModelTraining } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useDiscounts } from "../../hooks/useDiscounts";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";

const CreateDiscount = () => {
  const { loadingDiscount, createDiscount, navigate } = useDiscounts();
  const [valuePromotion, setvaluePromotion] = useState({
    type: "percentage",
    key: Date.now(),
  });
  
  const [forProducts, setForProducts] = useState({
    type: "all-products",
    key: Date.now(),
  });

  const inputRef = useRef(null);

  const {
    control,
    formState: { errors },
    watch,
    resetField,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: null,
      description: null,
      code: null,
      percent: null,
      fixed_amount: null,
      type_discount: null,
      unlimited: false,
      start_date: dayjs(Date.now()).startOf("day"),
      expiration_date: dayjs(Date.now()).endOf("day"),
      min_cart_amount: null,
      max_cart_amount: null,
      for_all_products: true,
      products: [],
      is_active: "active",
      maxUses: null,
    },
  });

  const generateRandomCode = (length = 8) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    return code;
  };

  const startDate = watch("start_date");
  const typeDiscountRender = watch("type_discount");
  const unlimited = watch("unlimited");

  

  useEffect(() => {
    if (typeDiscountRender === "is_amount") {
      setvaluePromotion({ type: "fixed_amount", key: Date.now() });
    } else if (typeDiscountRender === "is_percent")
      setvaluePromotion({ type: "percentage", key: Date.now() });
    if (typeDiscountRender === "free_shipping") {
      resetField("fixed_amount");
      resetField("percent");
      resetField("code");
    }
    if (typeDiscountRender === "for_creators") {
      resetField("code");
    }
  }, [typeDiscountRender]);

  const typeDiscount = [
    { value: "free_shipping", label: "Envio gratis" },
    { value: "first_buy", label: "Primera compra" },
    { value: "for_creators", label: "Creadores" },
    { value: "is_amount", label: "Monto de decuento" },
    { value: "is_percent", label: "Porcentaje" },
  ];

  const handleChangeValuePromotion = (event) => {
    const newType = event.target.value;

    let finalType = newType;

    if (typeDiscountRender === "is_amount") {
      finalType = "fixed_amount";
    } else if (typeDiscountRender === "is_percent") {
      finalType = "percentage";
    }

    setvaluePromotion({
      type: finalType,
      key: Date.now(),
    });
  };
  const handleChangeSelectProducts = (event) => {
    const newType = event.target.value;
    setForProducts({ type: newType, key: Date.now() });
    if (newType === "all-products") {
      setValue("for_all_products", true);
      setValue("products", []);
    }

    if (newType === "products") {
      setValue("for_all_products", false);
    }
  };

  const renderProductsFilter = (data) => {
    if (data === "all-products") {
      return null;
    }

    if (data === "products") {
      return <ProductsFilter setSelectedProducts={setValue} active={true} />;
    }

    return null; // Asegurar que siempre hay un retorno válido
  };

  const renderValuePromotion = () => {
    return (
      <Controller
        key={valuePromotion.key}
        name={valuePromotion.type === "percentage" ? "percent" : "fixed_amount"}
        control={control}
        rules={{
          required: {
            value: typeDiscountRender === "free_shipping" ? false : true,
            message: "Campo requerido*",
          },
          validate: (value) => {
            if (typeDiscountRender === "free_shipping") {
              return;
            }
            if (valuePromotion.type === "percentage") {
              if (value > 0) {
                return value < 100 || "El valor debe ser menor a 100";
              }
              return "El valor debe ser mayor a 0";
            } else {
              return value > 0 || "El valor debe ser mayor a 0";
            }
          },
        }}
        defaultValue=""
        shouldUnregister={true}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label={
              valuePromotion.type === "percentage" ? "Porcentaje*" : "Monto*"
            }
            size="small"
            fullWidth
            error={
              valuePromotion.type === "percentage"
                ? !!errors.percent
                : !!errors.fixed_amount
            }
            helperText={
              valuePromotion.type === "percentage"
                ? errors?.percent?.message
                : errors?.fixed_amount?.message
            }
            slotProps={{
              input: {
                [valuePromotion.type === "percentage"
                  ? "endAdornment"
                  : "startAdornment"]: (
                  <InputAdornment
                    position={
                      valuePromotion.type === "percentage" ? "end" : "start"
                    }
                  >
                    {valuePromotion.type === "percentage" ? "%" : "$"}
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    );
  };

  const onSubmit = (data) => {
    if (data.for_all_products === false && data.products.length === 0) {
      return Swal.fire({
        title: "Seleccione productos",
        icon: "error",
        confirmButtonColor: "red",
      });
    } else {
      createDiscount(data);
    }
  };

  if (loadingDiscount) return <LoadingScreenBlue />;
  return (
    <Grid2 container component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Grid2
        marginTop={{ xs: "-30px" }}
        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Crear descuento
        </Typography>
      </Grid2>
      <Card variant="elevation">
        <CardHeader
          title="Descuentos"
          subheader="Ingrese los datos para crear promoción"
        />
        <CardContent>
          <Grid2 container gap={2}>
            <Grid2
              size={6}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
            >
              <Controller
                name="name"
                control={control}
                rules={{
                  required: { value: true, message: "Campo requerido*" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre*"
                    fullWidth
                    error={!!errors?.name}
                    helperText={errors?.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{
                  required: { value: true, message: "Campo requerido*" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descripción*"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={5}
                    error={!!errors?.description}
                    helperText={errors?.description?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={3}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
            >
              <Controller
                name="type_discount"
                control={control}
                rules={{ required: "Campo requerido*" }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors?.type_discount}>
                    <InputLabel id="select-label-type-discount">
                      Tipo de descuento*
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="select-label-type-discount"
                      label="Tipo de descuento*"
                    >
                      {typeDiscount.map((i, index) => (
                        <MenuItem key={index} value={i.value}>
                          {i.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.type_discount && (
                      <FormHelperText sx={{ color: "warning.main" }}>
                        {errors?.type_discount?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="code"
                control={control}
                disabled={typeDiscountRender === "for_creators"}
                rules={{
                  required: { value: true, message: "Campo requerido*" },
                  minLength: { value: 10, message: "Minimo 10 caracteres" },
                  maxLength: { value: 10, message: "Máximo 10 caracteres" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={inputRef}
                    label="Código*"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <Tooltip title="Generar código">
                            <InputAdornment position="end">
                              <IconButton
                                disabled={typeDiscountRender === "for_creators"}
                                onClick={() => {
                                  const newCode = generateRandomCode(10);
                                  setValue("code", newCode);
                                  setTimeout(() => {
                                    if (inputRef.current) {
                                      inputRef.current.focus();
                                      inputRef.current.select();
                                    }
                                  }, 0);
                                }}
                                color="secondary"
                              >
                                <ModelTraining />
                              </IconButton>
                            </InputAdornment>
                          </Tooltip>
                        ),
                      },
                    }}
                    error={!!errors?.code}
                    helperText={errors?.code?.message}
                    onChange={(e) => {
                      // Convierte a mayúsculas y elimina espacios
                      const cleanValue = e.target.value
                        .toUpperCase()
                        .replace(/\s/g, "");
                      field.onChange(cleanValue);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " ") e.preventDefault();
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={2.5}
              boxSizing={"border-box"}
              alignContent={"center"}
              justifyItems={"center"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
            >
              <Controller
                name="is_active"
                control={control}
                rules={{ required: "Campo requerido*" }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors?.is_active}>
                    <InputLabel id="select-label-state">Estado*</InputLabel>
                    <Select
                      {...field}
                      labelId="select-label-state"
                      label="Estado*"
                      size="small"
                    >
                      <MenuItem value={"active"}>Activo</MenuItem>
                      <MenuItem value={"not-active"}>Inactivo</MenuItem>
                    </Select>
                    {errors?.is_active && (
                      <FormHelperText sx={{ color: "warning.main" }}>
                        {errors.is_active.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Grid2
                display={
                  typeDiscountRender === "free_shipping" ? "none" : "block"
                }
                size={12}
              >
                <RadioGroup
                  row
                  aria-labelledby="form-control-type"
                  name="type"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  value={
                    typeDiscountRender === "is_amount"
                      ? "amount"
                      : typeDiscountRender === "is_percent"
                        ? "percentage"
                        : valuePromotion?.type || ""
                  }
                  onChange={handleChangeValuePromotion}
                >
                  <FormControlLabel
                    value="percentage"
                    control={<Radio color="secondary" />}
                    label="Porcentaje"
                    sx={{
                      "& .MuiFormControlLabel-label": { fontSize: "12px" },
                    }}
                    disabled={typeDiscountRender === "is_amount"}
                  />
                  <FormControlLabel
                    value="amount"
                    control={<Radio color="secondary" />}
                    label="Monto"
                    sx={{
                      "& .MuiFormControlLabel-label": { fontSize: "12px" },
                    }}
                    disabled={typeDiscountRender === "is_percent"}
                  />
                </RadioGroup>
                {renderValuePromotion()}
              </Grid2>
            </Grid2>
            <Grid2 size={9} display={"flex"} gap={1}>
              <Controller
                name="min_cart_amount"
                control={control}
                rules={{
                  required: { value: true, message: "Campo requerido*" },
                  min: {
                    value: 0,
                    message: "El monto mínimo no puede ser negativo",
                  },
                  valueAsNumber: true, // Convertir a número automáticamente
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Monto mínimo de compra*"
                    type="number"
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      },
                      htmlInput: {
                        min: 0,
                        step: "0.01",
                      },
                    }}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    error={!!errors?.min_cart_amount}
                    helperText={errors?.min_cart_amount?.message}
                  />
                )}
              />
              <Controller
                name="max_cart_amount"
                control={control}
                rules={{
                  required: { value: true, message: "Campo requerido*" },
                  validate: (value, formValues) =>
                    value > formValues.min_cart_amount ||
                    "El monto máximo debe ser mayor al mínimo",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Monto máximo de compra*"
                    type="number"
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      },
                      htmlInput: {
                        min: 0,
                        step: "0.01",
                      },
                    }}
                    error={!!errors?.max_cart_amount}
                    helperText={errors?.max_cart_amount?.message}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                )}
              />

              <Controller
                name="start_date"
                control={control}
                rules={{ required: "Campo requerido *" }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      {...field}
                      disablePast
                      sx={{ width: "100%" }}
                      label={"Fecha de inicio (inicia a las 00:00)"}
                      onChange={(date) => {
                        const normalizedDate = dayjs(date).startOf("day");
                        setValue("start_date", normalizedDate, {
                          shouldValidate: true,
                        });
                      }}
                      slotProps={{
                        textField: {
                          error: !!errors.start_date,
                          helperText: errors?.start_date?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              <Controller
                name="expiration_date"
                control={control}
                rules={{
                  required: "Campo requerido *",
                  validate: (expirationDate) =>
                    expirationDate.isAfter(startDate) ||
                    "La fecha de caducidad debe ser mayor a la fecha de inicio",
                }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      {...field}
                      disablePast
                      sx={{ width: "100%" }}
                      label={"Fecha de caducidad (Finaliza a las 23:59)"}
                      onChange={(date) => {
                        const normalizedDate = dayjs(date).endOf("day");
                        setValue("expiration_date", normalizedDate, {
                          shouldValidate: true,
                        });
                      }}
                      slotProps={{
                        textField: {
                          error: !!errors?.expiration_date,
                          helperText: errors?.expiration_date?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid2>
            <Grid2 size={2.8} display={"flex"} flexDirection={"column"}>
              <Controller
                name="maxUses"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!unlimited) {
                      // Solo validar si no está marcado el checkbox
                      if (value === undefined || value === null)
                        return "Campo requerido*";
                      if (value < 0) return "El valor no puede ser negativo";
                    }
                    return true;
                  },
                  valueAsNumber: true,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cantidad de usos*"
                    type="number"
                    size="small"
                    disabled={unlimited}
                    value={unlimited ? "" : field.value}
                    slotProps={{
                      htmlInput: {
                        min: 0,
                        step: 1,
                      },
                    }}
                    error={!!errors?.maxUses}
                    helperText={errors?.maxUses?.message}
                  />
                )}
              />
              <Controller
                name="unlimited"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        color="secondary"
                        inputProps={{ "aria-label": "Usos ilimitados" }}
                        size="small"
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          // Resetear el valor y validación cuando se marca
                          if (e.target.checked) {
                            setValue("maxUses", null);
                          }
                        }}
                      />
                    }
                    label="Usos ilimitados*"
                    sx={{
                      "& .MuiFormControlLabel-label": { fontSize: "12px" },
                    }}
                  />
                )}
              />
            </Grid2>
          </Grid2>

          <FormControl fullWidth>
            <InputLabel id="select-label-products">
              Seleccione la cantidad de productos*
            </InputLabel>
            <Select
              value={forProducts.type}
              disabled={typeDiscountRender === 'free_shipping'}
              labelId="select-label-products"
              label="Seleccione la cantidad de productos*"
              required={true}
              onChange={handleChangeSelectProducts}
            >
              <MenuItem value={"all-products"}>Todos los productos</MenuItem>
              <MenuItem value={"products"}>Solo algunos productos</MenuItem>
            </Select>
          </FormControl>
          {renderProductsFilter(forProducts.type)}
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            size="small"
            onClick={() =>
              navigate("/promociones/descuentos", { replace: true })
            }
          >
            cancelar
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="success"
            size="small"
            type="submit"
          >
            Guardar
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default CreateDiscount;
