import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useStoreHouse } from "../../hooks/useStoreHouse";
import PercentIcon from "@mui/icons-material/Percent";
import { AttachMoney } from "@mui/icons-material";
import { useAuthStore } from "../../hooks";
import { useUsers } from "../../hooks/useUsers";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { green, lightGreen } from "@mui/material/colors";

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
    addCarrier(values);
  };

  const watchField = watch("employee_detail.store_house", false);
  useEffect(() => {
    loadStoreHouse();
  }, [user]);

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Alta transportista
        </Typography>
      </Grid>
      <Grid
        onSubmit={handleSubmit(createCarrier)}
        component={"form"}
        container
        padding={2}
        gap={2}
      >
        <Grid item xs={12} sm={6}>
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
                fullWidth
                label="Nombre completo"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                inputProps={{ ...field }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={5.7} >
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
                fullWidth
                label="Correo"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                inputProps={{ ...field }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
                fullWidth
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                inputProps={{ ...field }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={5.7} >
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ validate: matchIsValidTel, required: true }}
            render={({ field, fieldState }) => (
              <MuiTelInput
                {...field}
                onlyCountries={["MX"]}
                fullWidth
                forceCallingCode
                disableDropdown
                defaultCountry="MX"
                helperText={fieldState.invalid ? "Telefono es invalido" : ""}
                error={fieldState.invalid}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} >
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
                fullWidth
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
        </Grid>

        <Grid item xs={12} sm={5.7} >
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
                fullWidth
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
        </Grid>

        <Grid item xs={12} sm={7}>
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
                fullWidth
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
          {watchField.name ? (
            <Card sx={{bgcolor:lightGreen[200], marginTop:2}} variant="elevation">
              <CardContent>
                <Typography
                  variant="h1"
                  fontSize={{ xs: "20px" }}
                >
                  Almacen Seleccionado: {watchField.name}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            ""
          )}
        </Grid>
<Grid item xs={4}>
  <Button variant="contained" fullWidth type="submit" color="primary">
          Crear
        </Button>
</Grid>
        
      </Grid>
    </Grid>
  );
};

export default CreateCarrier;
