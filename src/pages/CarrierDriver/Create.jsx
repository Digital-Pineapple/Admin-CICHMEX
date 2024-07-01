import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTypeUser } from "../../hooks/useTypeUser";
import { useStoreHouse } from "../../hooks/useStoreHouse";
import PercentIcon from "@mui/icons-material/Percent";
import { AttachMoney } from "@mui/icons-material";
import { useAuth, useAuthStore } from "../../hooks";
import { useUsers } from "../../hooks/useUsers";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

const CreateCarrier = () => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
      employee_detail: {
        salary: "",
        sales_commission_porcent: "",
        store_house: [],
      },
    },
  });
  const { StoreHouses, loadStoreHouse } = useStoreHouse();
  const { user } = useAuthStore();
  const { addCarrier, loading } = useUsers();

  const createCarrier = (values) => {
    addCarrier(values)
  };

  const watchField = watch("employee_detail.store_house", false);
  useEffect(() => {
    loadStoreHouse();
  }, [user]);

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      spacing={2}
      padding={2}
      justifyContent={"center"}
      marginX={"10%"}
    >
      <h1>Crear transportista</h1>
      <Grid
        onSubmit={handleSubmit(createCarrier)}
        component={"form"}
        item
        display={"flex"}
        flexDirection={"column"}
        maxWidth={{ xs: "250px", md: "500px" }}
      >
        <Controller
          name="fullname"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Valor requerido" },
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
              message: "Campo inválido",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="outlined"
              label="Nombre completo"
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : ""
              }
              error={fieldState.invalid}
              inputProps={{ ...field }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Valor requerido" },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "Correo inválido",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="outlined"
              label="Correo"
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : ""
              }
              error={fieldState.invalid}
              inputProps={{ ...field }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Valor requerido" },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Debe contener: Letra mayuscula, minúscula, un numero, carácter especial, min 8 caracteres",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="outlined"
              label="Contraseña"
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : ""
              }
              error={fieldState.invalid}
              inputProps={{ ...field }}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ validate: matchIsValidTel, required:true }}
          render={({ field, fieldState }) => (
            <MuiTelInput
            {...field}
              onlyCountries={["MX"]}
              forceCallingCode
              disableDropdown
              defaultCountry="MX"
              helperText={
                fieldState.invalid ? "Telefono es invalido" : ""
              }
              error={fieldState.invalid}
            />
          )}
        />

        <Controller
          name="employee_detail.salary"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Valor requerido" },
            pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Solo numeros" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="outlined"
              label="Salario"
              type="number"
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : ""
              }
              error={fieldState.invalid}
              inputProps={{ ...field }}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="employee_detail.sales_commission_porcent"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Valor requerido" },
            pattern: {
              value: /^(\d|[1-9]\d)$/,
              message: "Valor solo menor de 100",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="outlined"
              label="Prcentaje de comisiones"
              type="number"
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : ""
              }
              error={fieldState.invalid}
              inputProps={{ ...field }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PercentIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="employee_detail.store_house"
          control={control}
          rules={{
            required: { value: true, message: "Valor requerido" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              select
              variant="outlined"
              label="Almacen"
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : ""
              }
              error={fieldState.invalid}
              inputProps={{ ...field }}
              onChange={(e) =>
                setValue("employee_detail.store_house", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            >
              {StoreHouses?.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option?.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {watchField ? (
          <Card variant="elevation">
            <CardContent>
              <Typography
                variant="h1"
                fontSize={{ xs: "20px" }}
                color="initial"
              >
                Almacen Seleccionado: {watchField.name}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          ""
        )}

        <br />
        <Button variant="contained" type="submit" color="primary">
          Crear
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateCarrier;
