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
  const { StoreHouses, loadStoreHouse } = useStoreHouse();
  const { CarrierDriver, loadOneCarrieDriver, loading, updateCarrier, navigate } =
    useUsers();
  const { loadAllRegions, regions } = useRegions();
  const [watchRegions, setWatchRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const { id } = useParams();

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

  useEffect(() => {
    if (!StoreHouses.length) {
      loadStoreHouse();
    }
    loadOneCarrieDriver(id);
    loadAllRegions();
  }, [id]);

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
      setWatchRegions(CarrierDriver.employee_detail?.operationRegions);
    }
  }, [CarrierDriver, reset]);

  const handleRegionChange = (e) => {
    const regionIds = e.target.value; // Obtén un array de IDs seleccionados
    setSelectedRegions(regionIds);
    setWatchRegions(regionIds.map((id) => regions.find((r) => r._id === id)));
    setValue("employee_detail.operationRegions", regionIds, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

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

  const onSubmit = (data) => {
    updateCarrier(id, data);
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  const watchField = watch("employee_detail.store_house", false);

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
          Editar transportista
        </Typography>
      </Grid>
      <Grid
        component={"form"}
        container
        padding={2}
        gap={2}
        display={"flex"}
        textAlign={"center"}
        onSubmit={handleSubmit(onSubmit)}
      >
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
