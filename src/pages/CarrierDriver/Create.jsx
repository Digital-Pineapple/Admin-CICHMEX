import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Select,
  FormHelperText,
  FormControl,
  CardHeader,
  Grid2,
} from "@mui/material";
import React, { Fragment, useEffect, useState, useMemo, useCallback } from "react";
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
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

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
  const [selectedRegions, setSelectedRegions] = useState([]);

  const createOneCarrier = useCallback((values) => {
     addCarrier(values); 
  }, [addCarrier]);

  const watchField = watch("employee_detail.store_house", false);

  useEffect(() => {
    loadStoreHouse();
    loadAllRegions();
  }, [user]);

  const handleRegionChange = useCallback((e) => {
    const regionIds = e.target.value;
    setSelectedRegions(regionIds);
    setWatchRegions(regionIds.map((id) => regions.find((r) => r._id === id)));
    setValue("employee_detail.operationRegions", regionIds, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [regions, setValue]);

  const __mapMandatoryStyles = useMemo(() => ({ width: "100%", height: "700px" }), []);
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;

  const calculateCenter = useCallback((path) => {
    const latLngs = path.map(
      (point) => new window.google.maps.LatLng(point.lat, point.lng)
    );
    const bounds = new window.google.maps.LatLngBounds();
    latLngs.forEach((latLng) => bounds.extend(latLng));
    return bounds.getCenter().toJSON();
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });

  const regionWithCenter = useCallback((region) => {
    return {
      ...region,
      center: calculateCenter(region.path),
    };
  }, [calculateCenter]);

  const paths = useMemo(() => [
    { path: `/usuarios/transportistas`, name: "Transportistas" },
    { path: `/usuarios/agregar-transportista`, name: "Crear transportista" },
  ], []);

  if (loading) {
    return <LoadingScreenBlue />;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }
  

  return (
    <Grid2 container paddingX={{ xs: 10 }}>
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
          <strong>Crear transportista</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <Grid2
        onSubmit={handleSubmit(createOneCarrier)}
        component={"form"}
        container
        padding={4}
        gap={2}
        display={"flex"}
        textAlign={"center"}
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px'
        }}
      >
        {renderTextField(control, errors, "fullname", "Nombre completo", /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)}
        {renderTextField(control, errors, "email", "Correo", /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)}
        {renderTextField(control, errors, "password", "Contraseña", /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)}
        {renderPhoneField(control, errors, "phone", setValue)}
        {renderTextField(control, errors, "employee_detail.salary", "Salario", /^\d+(\.\d{1,2})?$/, { startAdornment: <AttachMoney /> })}
        {renderTextField(control, errors, "employee_detail.sales_commission_porcent", "Comisiones", /^(\d|[1-9]\d)$/, { endAdornment: <PercentIcon /> })}
        {renderStoreHouseField(control, errors, "employee_detail.store_house", StoreHouses, watchField)}
        {renderRegionsField(control, errors, "employee_detail.operationRegions", regions, selectedRegions, handleRegionChange, watchRegions, regionWithCenter, __mapMandatoryStyles)}
        <Grid2 gap={2} container size={{ xs: 12 }}>
          <Grid2 size={{ xs: 12, md: 5.8 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/usuarios/transportistas", { replace: true })}
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

const renderTextField = (control, errors, name, label, pattern, InputProps) => (
  <Grid2 size={{ xs: 12, lg: 5.8 }}>
    <Controller
      name={name}
      control={control}
      rules={{
        required: { value: true, message: "Valor requerido" },
        pattern: { value: pattern, message: "Campo inválido" },
      }}
      render={({ field, fieldState }) => (
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          label={label}
          helperText={fieldState.error ? <b>{fieldState.error.message}</b> : ""}
          error={fieldState.invalid}
          {...field}
          InputProps={InputProps}
        />
      )}
    />
  </Grid2>
);

const renderPhoneField = (control, errors, name, setValue) => (
  <Grid2 size={{ xs: 12, lg: 5.8 }}>
    <Controller
      name={name}
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
          helperText={fieldState.invalid ? "Teléfono inválido" : fieldState.error?.message}
          error={fieldState.invalid}
          onChangeCapture={(e) => setValue(name, e.target.value)}
        />
      )}
    />
  </Grid2>
);

const renderStoreHouseField = (control, errors, name, StoreHouses, watchField) => (
  <Grid2 size={{ xs: 12, sm: 12 }}>
    <Controller
      name={name}
      control={control}
      rules={{
        required: { value: true, message: "Valor requerido" },
      }}
      render={({ field, fieldState }) => (
        <TextField
          select
          variant="outlined"
          label="Almacén"
          fullWidth
          size="small"
          helperText={fieldState.error ? <b>{fieldState.error.message}</b> : ""}
          error={fieldState.invalid}
          {...field}
          onChange={field.onChange}
        >
          {StoreHouses?.map((option, index) => (
            <MenuItem key={index} value={option}>{option?.name}</MenuItem>
          ))}
        </TextField>
      )}
    />
    {watchField?.name && (
      <Card sx={{ bgcolor: lightGreen[200], marginTop: 2 }} variant="elevation">
        <CardContent>
          <Typography variant="h1" fontSize={{ xs: "20px" }}>Almacén Seleccionado: {watchField.name}</Typography>
        </CardContent>
      </Card>
    )}
  </Grid2>
);

const renderRegionsField = (control, errors, name, regions, selectedRegions, handleRegionChange, watchRegions, regionWithCenter, __mapMandatoryStyles) => (
  <Grid2 container size={12} gap={1} display={"flex"} justifyContent={"center"}>
    <Controller
      name={name}
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
            value={selectedRegions}
            onChange={handleRegionChange}
          >
            {regions.map((item, index) => (
              <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{fieldState.error ? <b>{fieldState.error.message}</b> : ""}</FormHelperText>
        </FormControl>
      )}
    />
    {watchRegions.map((item, index) => (
      <Grid2 key={index} size={3.8}>
        <Card sx={{ maxHeight: "400px" }} variant="outlined">
          <CardHeader
            title={`Nombre: ${item.name}`}
            subheader={`Código: ${item.regionCode}`}
          />
          <CardContent>
            <GoogleMap
              zoom={13}
              center={regionWithCenter(item).center}
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
                  position={regionWithCenter(item).center}
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
);

export default CreateCarrier;