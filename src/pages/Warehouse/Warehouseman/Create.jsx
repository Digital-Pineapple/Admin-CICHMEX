import { Controller, useForm } from "react-hook-form";
import { useStoreHouse } from "../../../hooks/useStoreHouse";
import { useAuthStore, useRegions } from "../../../hooks";
import { useUsers } from "../../../hooks/useUsers";
import { Fragment, useEffect, useState } from "react";
import LoadingScreenBlue from "../../../components/ui/LoadingScreenBlue";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid2,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BreadcrumbCustom from "../../../components/ui/BreadCrumbCustom";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { AttachMoney, Percent } from "@mui/icons-material";
import { lightGreen } from "@mui/material/colors";

const CreateWarehouseman = () => {
  // Configuración inicial del formulario con valores predeterminados
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
      type: "",
      employee_detail: {
        salary: "",
        sales_commission_porcent: "",
        store_house: [],
      },
    },
  });

  // Hooks personalizados para obtener almacenes y manejar usuarios
  const { StoreHouses, loadStoreHouse } = useStoreHouse();
  const { user, navigate } = useAuthStore();
  const { createWarehouseman, loading } = useUsers();

  // Función para crear un nuevo almacenista
  const createOneCarrier = (values) => {
    createWarehouseman(values);
  };

  // Observa el campo de almacén seleccionado
  const watchField = watch("employee_detail.store_house", false);

  // Carga los almacenes al montar el componente
  useEffect(() => {
    loadStoreHouse();
  }, [user]);

  // Muestra una pantalla de carga si está en proceso
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Tipos de usuario disponibles
  const TypesUser = [
    { value: "WAREHOUSE-MANAGER", name: "Encargado de almacén" },
    { value: "WAREHOUSEMAN", name: "Almacenista" },
  ];

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: `/usuarios`, name: "Todos los usuarios" },
    { path: `/usuarios/almacenistas`, name: "Mis almacenistas" },
    { path: `/usuarios/almacenistas/crear`, name: "Crear almacenista" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 10 }}>
      {/* Título de la página */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4">
          <strong>Crear almacenista</strong>
        </Typography>
      </Grid2>

      {/* Componente de breadcrumb */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Formulario para crear almacenista */}
      <Grid2
        onSubmit={handleSubmit(createOneCarrier)}
        component={"form"}
        container
        padding={4}
        gap={2}
        display={"flex"}
        textAlign={"center"}
        sx={{
          bgcolor: "#fff",
          borderRadius: "20px",
        }}
      >
        {/* Campo para el nombre completo */}
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="fullname"
            control={control}
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
                autoComplete="off"
                size="small"
                label="Nombre completo"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
              />
            )}
          />
        </Grid2>

        {/* Campo para el correo electrónico */}
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="email"
            control={control}
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
                size="small"
                autoComplete="off"
                label="Correo"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
              />
            )}
          />
        </Grid2>

        {/* Campo para la contraseña */}
        <Grid2 size={{ xs: 12, sm: 3.5 }}>
          <Controller
            name="password"
            control={control}
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
                autoComplete="off"
                fullWidth
                size="small"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
              />
            )}
          />
        </Grid2>

        {/* Campo para el teléfono */}
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: matchIsValidTel,
              required: { value: true, message: "Teléfono requerido" },
            }}
            render={({ field, fieldState }) => (
              <MuiTelInput
                {...field}
                onlyCountries={["MX"]}
                defaultCountry="MX"
                size="small"
                fullWidth
                forceCallingCode
                autoComplete="off"
                disableDropdown
                helperText={
                  fieldState.invalid
                    ? "Telefono inválido"
                    : fieldState.error?.message
                }
                error={fieldState.invalid}
                onChange={field.onChange}
              />
            )}
          />
        </Grid2>

        {/* Campo para el salario */}
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="employee_detail.salary"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Solo números" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                fullWidth
                label="Salario"
                type="number"
                size="small"
                autoComplete="off"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
                InputProps={{
                  startAdornment: <AttachMoney />,
                }}
              />
            )}
          />
        </Grid2>

        {/* Campo para las comisiones */}
        <Grid2 size={{ xs: 12, sm: 3.5 }}>
          <Controller
            name="employee_detail.sales_commission_porcent"
            control={control}
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
                label="Comisiones"
                fullWidth
                type="number"
                size="small"
                autoComplete="off"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
                InputProps={{
                  endAdornment: <Percent />,
                }}
              />
            )}
          />
        </Grid2>

        {/* Campo para seleccionar el almacén */}
        <Grid2 size={{ xs: 12, sm: 12 }}>
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
                size="small"
                autoComplete="off"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
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
          {/* Muestra el almacén seleccionado */}
          {watchField?.name && (
            <Card
              sx={{ bgcolor: lightGreen[200], marginTop: 2 }}
              variant="elevation"
            >
              <CardContent>
                <Typography variant="h1" fontSize={{ xs: "20px" }}>
                  Almacen Seleccionado: {watchField.name}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid2>

        {/* Campo para seleccionar el tipo de usuario */}
        <Grid2 size={12} gap={1}>
          <Controller
            name="type"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
            }}
            render={({ field, fieldState }) => (
              <FormControl
                error={fieldState.invalid}
                size="small"
                sx={{ width: "100%" }}
              >
                <Select {...field} variant="outlined">
                  {TypesUser?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {fieldState.error ? <b>{fieldState.error.message}</b> : ""}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid2>

        {/* Botones para cancelar o crear */}
        <Grid2 gap={2} container size={{ xs: 12 }}>
          <Grid2 size={{ xs: 12, md: 5.8 }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/usuarios/almacenistas", { replace: true });
              }}
              color="error"
              fullWidth
            >
              Cancelar
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 5.9 }}>
            <Button fullWidth variant="contained" type="submit" color="success">
              Crear
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default CreateWarehouseman;
