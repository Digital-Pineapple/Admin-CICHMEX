import {
  Grid2,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
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
  Checkbox,
  IconButton,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ProductsFilter from "../../components/Filters/ProductsFilter";
import Swal from "sweetalert2";
import { useDiscounts } from "../../hooks/useDiscounts";
import { useParams } from "react-router-dom";
import { Refresh } from "@mui/icons-material";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore } from "../../hooks";

const UpdateDiscount = () => {
  const { id } = useParams();
 const {navigate}= useAuthStore()
  const { loadDiscountDetail, discount, updateDiscount, loadingDiscount, } =
    useDiscounts();
  const [valuePromotion, setvaluePromotion] = useState({
    type: "percentage",
    key: Date.now(),
  });

  const [forProducts, setForProducts] = useState({
    type: "all-products",
    key: Date.now(),
  });
  useEffect(() => {
    const fetchData = () => {
      loadDiscountDetail(id);
    };
    fetchData();
  }, [id]);

  const getDefaultValues = (data) => {
   
    if (!data) {
      return {
        name: "",
        description: "",
        code: "",
        percent: null,
        fixed_amount: null,
        type_discount: null,
        unlimited: false,
        start_date: dayjs(), // Usar dayjs para las fechas
        expiration_date: dayjs().add(1, "month"),
        min_cart_amount: 0,
        max_cart_amount: 0,
        for_all_products: true,
        products: [],
        is_active: "not-active",
        maxUses: null,
      };
    }

    return {
      name: data.name || "",
      description: data.description || "",
      code: data.code || "",
      percent: data.percent ?? null,
      fixed_amount: data.fixed_amount ?? null,
      type_discount: data.type_discount ?? null,
      unlimited: data.unlimited ?? false,
      start_date: data.start_date ? dayjs(data.start_date) : dayjs(),
      expiration_date: data.expiration_date
        ? dayjs(data.expiration_date)
        : dayjs().add(1, "month"),
      min_cart_amount: Number(data.min_cart_amount) || 0,
      max_cart_amount: Number(data.max_cart_amount) || 0,
      for_all_products: data.for_all_products ?? true,
      products:  data.products ?? [],
      is_active: data.is_active === true ? "active" : "not-active",
      maxUses: data.maxUses ?? null,
    };
  };


  // En tu componente
  const {
    control,
    formState: { errors },
    watch,
    reset,
    getValues,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: getDefaultValues(), // Valores iniciales vacíos
  });

  // Cuando cargan los datos del descuento
  useEffect(() => {
    if (discount) {
      reset(getDefaultValues(discount));
    }
  }, [discount, reset]);

  const startDate = watch("start_date");
  const typeDiscountRender = watch("type_discount");
  const unlimited = watch("unlimited");

  const DISCOUNT_TYPES = [
    { value: "free_shipping", label: "Envío gratis" },
    { value: "first_buy", label: "Primera compra" },
    { value: "for_creators", label: "Creadores" },
    { value: "is_amount", label: "Monto de descuento" },
    { value: "is_percent", label: "Porcentaje" },
  ];

  useEffect(() => {
    if (typeDiscountRender === "is_amount") {
      setvaluePromotion({ type: "fixed_amount", key: "fixed_amount" });
    } else if (typeDiscountRender === "is_percent") {
      setvaluePromotion({ type: "percentage", key: "percentage" });
    }
    setForProducts({ 
      type: getValues('for_all_products') ? 'all-products' : 'products', 
      key: Date.now()
    });
  }, [typeDiscountRender]);

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
    const isAllProducts = newType === "all-products";
    
    // Actualizar el valor en el formulario
    setValue("for_all_products", isAllProducts);
    
    // Forzar la actualización del estado forProducts
    setForProducts({
      type: isAllProducts ? "all-products" : "products",
      key: Date.now(),
    });
  };

  const renderProductsFilter = (data) => {
    
    if (data === "all-products") {
      return null;
    }

    if (data === "products") {
      return <ProductsFilter setSelectedProducts={setValue} defaultProducts={getValues('products')} active={true} />;
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
        updateDiscount(id,data);
    }
  };
  const rechargeDiscount =()=>{
    loadDiscountDetail(id)
  }

  if (loadingDiscount) return <LoadingScreenBlue/>
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
          Editar descuento <br />
        </Typography>
      </Grid2>
      <Card variant="elevation">
        <CardHeader
        action={
            <Button onClick={rechargeDiscount} aria-label="settings">
              <Refresh /> Recargar
            </Button>
          }
          title={`Código: ${discount.code}`}
          subheader={`Tipo de descuento: ${
            DISCOUNT_TYPES.find(
              (item) => item.value === discount?.type_discount
            )?.label || "Desconocido"
          }`}
        />
        <CardContent>
          <Grid2 container gap={2}>
            <Grid2
              size={9}
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                  validate: (value) => {
                    const minAmount = getValues("min_cart_amount");
                    return (
                      value > minAmount ||
                      "El monto máximo no puede ser menor o igual al mínimo de compra"
                    );
                  },
                  valueAsNumber: true,
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={!!errors?.max_cart_amount}
                    helperText={errors?.max_cart_amount?.message}
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
              value={forProducts.type || ''}
              labelId="select-label-products"
              label="Seleccione la cantidad de productos*"
              required={true}
              onChange={handleChangeSelectProducts}
            >
              <MenuItem   value={"all-products"}>Todos los productos</MenuItem>
              <MenuItem  value={"products"}>Solo algunos productos</MenuItem>
            </Select>
          </FormControl>
          <Grid2 size ={12} padding={1}>
          {renderProductsFilter(forProducts.type)}
          </Grid2>
        </CardContent>
        <CardActions>
        <Button fullWidth variant="contained" color="warning" size="small" onClick={()=>navigate('/promociones/descuentos', {replace:true})}  >
            cancelar
          </Button>
          <Button fullWidth variant="contained" color="success" size="small" type="submit">
            Guardar
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default UpdateDiscount;
