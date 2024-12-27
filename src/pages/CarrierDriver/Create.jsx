import {
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Select,
  FormHelperText,
  FormControl,
  CardActions,
  CardHeader,
  ButtonGroup,
  Grid2,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useStoreHouse } from "../../hooks/useStoreHouse";
import PercentIcon from "@mui/icons-material/Percent";
import { AttachMoney } from "@mui/icons-material";
import { useAuthStore, useRegions } from "../../hooks";
import { useUsers } from "../../hooks/useUsers";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { lightGreen } from "@mui/material/colors";
import {
  GoogleMap,
  OverlayView,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import { ref } from "yup";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { isValidPhoneNumber } from "libphonenumber-js";

const CreateCarrier = () => {
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
      employee_detail: {
        salary: "",
        sales_commission_porcent: "",
        store_house: [],
        operationRegions: [],
      },
    },
  });

  const { StoreHouses, loadStoreHouse } = useStoreHouse();
  const { user, navigate } = useAuthStore();
  const { addCarrier, loading } = useUsers();
  const { loadAllRegions, regions } = useRegions();
  const [watchRegions, setWatchRegions] = useState([]);

  const createOneCarrier = (values) => {
     addCarrier(values);
  };

  const watchField = watch("employee_detail.store_house", false);
  const [selectedRegions, setSelectedRegions] = useState([]);

  useEffect(() => {
    loadStoreHouse();
    loadAllRegions();
  }, [user]);

  const handleRegionChange = (e) => {
    const regionIds = e.target.value; // Obtén un array de IDs seleccionados
    setSelectedRegions(regionIds);
    setWatchRegions(regionIds.map((id) => regions.find((r) => r._id === id)));
    setValue("employee_detail.operationRegions", regionIds, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  const __mapMandatoryStyles = { width: "100%", height: "700px" };
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;

  const calculateCenter = (path) => {
    const latLngs = path.map(
      (point) => new window.google.maps.LatLng(point.lat, point.lng)
    );
    const bounds = new window.google.maps.LatLngBounds();
    latLngs.forEach((latLng) => bounds.extend(latLng));
    return bounds.getCenter().toJSON();
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  const regionWithCenter = (region) => {
    return {
      ...region,
      center: calculateCenter(region.path), // Calcula el centro dinámicamente
    };
  };

  return (
    <Grid2 container padding={2}>
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
          Alta transportista
        </Typography>
      </Grid2>
      <Grid2
        onSubmit={handleSubmit(createOneCarrier)}
        component={"form"}
        container
        padding={2}
        gap={2}
        display={"flex"}
        textAlign={"center"}
      >
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
                disableDropdown
                helperText={
                  fieldState.invalid
                    ? "Telefono inválido"
                    : fieldState.error?.message
                }
                error={fieldState.invalid}
                onChangeCapture={(e) => setPhone(e.target.value)}
              />
            )}
          />
        </Grid2>

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
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
                InputProps={{
                  endAdornment: <PercentIcon />,
                }}
              />
            )}
          />
        </Grid2>

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

        <Grid2
          container
          size={12}
          gap={1}
          display={"flex"}
          justifyContent={"center"}
        >
          <Controller
            name="employee_detail.operationRegions"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
            }}
            render={({ field, fieldState }) => (
              <FormControl error={fieldState.invalid} fullWidth size="small">
                <Select
                  variant="outlined"
                  {...field}
                  displayEmpty
                  multiple
                  value={selectedRegions} // Trabaja con IDs
                  onChange={handleRegionChange}
                >
                  {regions.map((item, index) => (
                    <MenuItem key={index} value={item._id}>
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
          {watchRegions.map((item, index) => (
            <Grid2 key={index} size={3.8}>
              <Card key={index} sx={{ maxHeight: "400px" }} variant="outlined">
                <CardHeader
                  title={`Nombre: ${item.name}`}
                  subheader={`Código: ${item.regionCode}`}
                />
                <CardContent>
                  <GoogleMap
                    zoom={13}
                    center={regionWithCenter(item).center} // Usa el centro calculado dinámicamente
                    mapContainerStyle={__mapMandatoryStyles}
                  >
                    <Fragment key={item._id}>
                      <Polygon
                        path={item.path.map((point) => ({
                          lat: point.lat,
                          lng: point.lng,
                        }))}
                        options={{
                          fillColor: "orange",
                          fillOpacity: 0.3,
                          strokeColor: "orange",
                          strokeOpacity: 0.8,
                          strokeWeight: 2,
                        }}
                      />
                      <OverlayView
                        position={regionWithCenter(item).center} // Usa el centro pre-calculado
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                      >
                        <Typography variant="body1" color="red">
                          {item.name}
                        </Typography>
                      </OverlayView>
                    </Fragment>
                  </GoogleMap>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        <Grid2 gap={2} container size={{ xs: 12 }}>
          <Grid2 size={{xs:12, md:5.8}}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/usuarios/transportistas", { replace: true });
              }}
              color="error"
              fullWidth
            >
              Cancelar
            </Button>
          </Grid2>
          <Grid2 size={{xs:12, md:5.9}}>
            <Button fullWidth variant="contained" type="submit" color="success">
              Crear
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default CreateCarrier;
