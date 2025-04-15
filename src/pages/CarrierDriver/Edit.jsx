import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  FormHelperText,
  CardHeader, ButtonGroup,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useStoreHouse } from "../../hooks/useStoreHouse";
import PercentIcon from "@mui/icons-material/Percent";
import { AttachMoney } from "@mui/icons-material";
import { useUsers } from "../../hooks/useUsers";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { lightGreen } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useRegions } from "../../hooks/";
import {
  GoogleMap,
  OverlayView,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";

const EditCarrierDriver = () => {
  // Hooks personalizados para cargar datos de almacenes, transportistas y regiones
  const { StoreHouses, loadStoreHouse } = useStoreHouse();
  const { CarrierDriver, loadOneCarrieDriver, loading, updateCarrier, navigate } =
    useUsers();
  const { loadAllRegions, regions } = useRegions();

  // Estados locales para manejar regiones seleccionadas y observadas
  const [watchRegions, setWatchRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  // Obtener el ID del transportista desde los parámetros de la URL
  const { id } = useParams();

  // Configuración del formulario con valores predeterminados
  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      employee_detail: {
        salary: "",
        sales_commission_porcent: "",
        store_house: [],
      },
    },
  });

  // Cargar datos iniciales al montar el componente
  useEffect(() => {
    if (!StoreHouses.length) {
      loadStoreHouse(); // Cargar almacenes si no están cargados
    }
    loadOneCarrieDriver(id); // Cargar datos del transportista por ID
    loadAllRegions(); // Cargar todas las regiones
  }, [id]);

  // Actualizar el formulario con los datos del transportista cuando estén disponibles
  useEffect(() => {
    if (CarrierDriver) {
      reset({
        fullname: CarrierDriver.fullname || "",
        email: CarrierDriver.email || "",
        phone: CarrierDriver.phone || "",
        employee_detail: {
          salary: CarrierDriver.employee_detail?.salary || "",
          sales_commission_porcent:
            CarrierDriver.employee_detail?.sales_commission_porcent || "",
          store_house: CarrierDriver.employee_detail?.store_house || [],
        },
      });
      setWatchRegions(CarrierDriver.employee_detail?.operationRegions); // Configurar regiones observadas
    }
  }, [CarrierDriver, reset]);

  // Manejar cambios en las regiones seleccionadas
  const handleRegionChange = (e) => {
    const regionIds = e.target.value; // Obtener un array de IDs seleccionados
    setSelectedRegions(regionIds);
    setWatchRegions(regionIds.map((id) => regions.find((r) => r._id === id))); // Actualizar regiones observadas
    setValue("employee_detail.operationRegions", regionIds, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Estilo obligatorio para el mapa
  const __mapMandatoryStyles = { width: "100%", height: "700px" };
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;

  // Calcular el centro de una región a partir de su ruta
  const calculateCenter = (path) => {
    const latLngs = path.map(
      (point) => new window.google.maps.LatLng(point.lat, point.lng)
    );
    const bounds = new window.google.maps.LatLngBounds();
    latLngs.forEach((latLng) => bounds.extend(latLng));
    return bounds.getCenter().toJSON();
  };

  // Cargar el script de Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });

  if (!isLoaded) {
    return <div>Cargando mapa...</div>; // Mostrar mensaje mientras se carga el mapa
  }

  // Agregar el centro calculado dinámicamente a una región
  const regionWithCenter = (region) => {
    return {
      ...region,
      center: calculateCenter(region.path), // Calcula el centro dinámicamente
    };
  };

  // Manejar el envío del formulario
  const onSubmit = (data) => {
    updateCarrier(id, data); // Actualizar datos del transportista
  };

  if (loading) {
    return <LoadingScreenBlue />; // Mostrar pantalla de carga si está cargando
  }

  const watchField = watch("employee_detail.store_house", false); // Observar cambios en el almacén seleccionado

  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      {/* Título de la página */}
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
          Editar transportista
        </Typography>
      </Grid>

      {/* Formulario principal */}
      <Grid
        component={"form"}
        container
        padding={2}
        gap={2}
        display={"flex"}
        textAlign={"center"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Campo de nombre completo */}
        <Grid item xs={12} sm={6}>
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
        </Grid>

        {/* Campo de correo electrónico */}
        <Grid item xs={12} sm={5.5}>
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
                disabled
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
        </Grid>

        {/* Campo de salario */}
        <Grid item xs={12} sm={6}>
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Campo de porcentaje de comisión */}
        <Grid item xs={12} sm={5.5}>
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <PercentIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Campo de almacén */}
        <Grid item xs={12} sm={12}>
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
          {/* Mostrar almacén seleccionado */}
          {watchField.name ? (
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
          ) : (
            ""
          )}
        </Grid>

        {/* Mapa y regiones */}
        <Grid container display={"flex"} justifyContent={"center"}>
          {watchRegions?.map((item, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Card key={index} variant="outlined">
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
            </Grid>
          ))}

          {/* Selector de regiones */}
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
        </Grid>

        {/* Botones de acción */}
        <Grid item xs={12}>
          <ButtonGroup fullWidth variant="contained" color="inherit" aria-label="Actions">
          <Button variant="contained" onClick={()=>navigate('/usuarios/transportistas', {replace:true})} color="error">
            Cancelar
          </Button><Button variant="contained"  type="submit" color="primary">
            Editar
          </Button> 
            
          </ButtonGroup>
          
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditCarrierDriver;
