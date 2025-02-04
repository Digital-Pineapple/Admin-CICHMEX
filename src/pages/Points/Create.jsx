import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MarkerF } from "@react-google-maps/api";
import { Typography, Grid, CircularProgress, Button, Stack, Link, Container, InputAdornment, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLoadScript } from "@react-google-maps/api";
import { useAuthStore } from "../../hooks";
import { loadSucursalRegister } from "../../store/actions/deliveryPoints";
import useGeocode from "../../hooks/useGeocode";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDebouncedCallback } from "use-debounce";
import SchedulesPicker from "../../components/Pickers/SchedulesPicker";
import MapGoogle from "../../components/Google/MapGoogle";
import { redirectTo } from "../../helpers/redirectLink";
import { HtmlTooltip } from "../../components/Tooltips/HtmlTooltip";
import useSchedules from "../../hooks/useSchedules";
import InputControl from "../../components/ui/InputControl";
import InputControlTimePicker from "../../components/ui/InputControlTimePicker";
import StyledDropzone from "../../components/DropZone/StyledDropZone";
import useImagesV2 from "../../hooks/useImagesV2";
import useDeliveryPoints from "../../hooks/useDeliveryPoints";
const styleContainer = {
  width: "100%",
  height: "600px",
};

function CreateDeliveryPoint() {
  const [openTooltip, setOpenTooltip] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { addImage, deleteImage, images, imagesFiles } = useImagesV2();
  const {
    schedules,
    handleSelectedSchedules,
    handleAssignSchedule,
    isADaySelected,
    handleCleanSchedule,
    handleSelectAll,
    schedules_f,
    isAScheduleAssigned,
  } = useSchedules();

  const {
    center,
    marker,
    getCenterFromZipCode,
    getAddressFromCoords,
    handleSetMarker,
    handleSetCenter,
  } = useGeocode();
  const { onRegisterDeliveryPoint } = useDeliveryPoints();

  const handleTooltipClose = () => setOpenTooltip(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const { navigate } = useAuthStore();
  const [loading, setLoading] = useState(false);  
  const { formState: { errors }, handleSubmit, control, watch, setValue, setError, clearErrors } = useForm();

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY,
  });

  const registerBranchOffice = (data) => {    
    if (!marker.lat && !marker.lng) {
      return;
    } else {
      onRegisterDeliveryPoint(data, marker, schedules_f, imagesFiles());
    }
  };

  function clearAddressInputs() {
    setValue("municipality", "");
    setValue("state", "");
    setValue("neighborhood", "");
  }

  function handleAddressFromCoords(lat, lng) {
    getAddressFromCoords(lat, lng, (data) =>  {
      if (data === undefined || data === null) {
        setLoading(false);
        return;
      }
      clearAddressInputs();
      const detalles = data?.results;
      // console.log(detalles);
      for (let i = 0; i < detalles.length; i++) {
        var d = detalles[i];
        switch (d.types[0]) {
          case "neighborhood":
            const neighborhood = d.address_components[0].long_name;
            setValue("neighborhood", neighborhood);
            break;
          case "locality":
            if (!watch("neighborhood")) {
              const locality = d.address_components[0].long_name;
              setValue("neighborhood", locality);
            }
            break;
          case "administrative_area_level_3":
            const municipio = d.address_components[0].long_name;
            setValue("municipality", municipio);
            break;
          case "administrative_area_level_2":
            const municipality = d.address_components[0].long_name;
            setValue("municipality", municipality);
            break;
          case "administrative_area_level_1":
            const state = d.address_components[0].long_name;
            setValue("state", state);
            break;
          case "postal_code":
            const cp = d.address_components[0].long_name;
            setValue("zipcode", cp);
            break;
          case "country":
            break;
        }
      }
      setLoading(false);
    })       
  }

  const debouncedInputsByCoords = useDebouncedCallback((latitud, longitud) => handleAddressFromCoords(latitud, longitud), 1000);

  function setInputsByMarker(event) {
    setLoading(true);
    const latitud = event.latLng.lat();
    const longitud = event.latLng.lng();
    handleSetMarker(latitud, longitud);
    handleSetCenter(latitud, longitud);
    debouncedInputsByCoords(latitud, longitud);
  }

  function setInputsByZipcode(zipcode) {
    if (!zipcode && typeof zipcode !== string && zipcode.length !== 5) {
      return;
    }
    setLoading(true);
    getCenterFromZipCode(zipcode, (data) => {
      const { lat, lng } = data;    
      console.log(data, "xdxd");      
      if (lat && lng) {
        handleSetMarker(lat, lng);
        handleSetCenter(lat, lng);
        debouncedInputsByCoords(lat, lng);
      }else{
        setLoading(false)
      }
    }, (error) => setLoading(false) );
    
  }

  const schedule = {
    open: watch("opening_time"),
    close: watch("closing_time"),
  };

  const validateSchedules = () => {
    if (!isAScheduleAssigned()) {
      setError("schedule", { type: "manual", message: "Asigne al menos un horario de atención" });
    } else {
      clearErrors("schedule");
    }   
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(registerBranchOffice)}>
        <Typography
          textAlign="center"
          marginY="1rem"
          color="primary"
          variant={isSmallScreen ? "h6" : "h4"}
          fontWeight={"900"}
        >
          Registrar Punto de entrega
        </Typography>
        <Grid container spacing={2} sx={{ backgroundColor: "" }}>
          <Grid item xs={4}>
            <InputControl
              name={"name"}
              label={"Nombre de la sucursal"}
              rules={{ required: "El nombre es obligatorio" }}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={4}>
            <InputControl
              name={"phone"}
              label={"Teléfono de la sucursal"}
              control={control}
              errors={errors}
              type={"tel"}
              rules={{
                required: "El teléfono es obligatorio",
              }}
              startAdornment={
                <InputAdornment position="start">+52</InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={4}>
            <InputControl
              name={"description"}
              label={"Descripción de la sucursal"}
              control={control}
              errors={errors}
              multiline
              // rows={2}
            />
          </Grid>
          <Grid item xs={6}>
            <Box flexGrow={1} bgcolor={""}>
              <Typography variant="body2">
                Agrega imagenes de tu sucursal
              </Typography>
              <StyledDropzone
                files={images}
                callback={addImage}
                onDelete={deleteImage}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box flexGrow={1}>
              <Typography variant="body2" mb={1}>
                Selecciona los dias de atención y asigne un horario
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction={"row"} spacing={0} mb={3}>
                  <InputControlTimePicker
                    control={control}
                    name={"opening_time"}
                    label="Hora Apertura"
                  />
                  <InputControlTimePicker
                    control={control}
                    name={"closing_time"}
                    label="Hora Cierre"
                  />
                  <Button
                    variant="contained"
                    size="small"
                    disabled={ !isADaySelected() || !schedule.open || !schedule.close}
                    onClick={() => {
                      handleAssignSchedule(schedule);
                      clearErrors("schedule");
                    }}
                  >
                    Asignar horario
                  </Button>
                </Stack>
                <Typography textAlign={"start"} variant="body2" color="error">
                  {errors.schedule && errors.schedule.message}
                </Typography>
              </LocalizationProvider>
              <SchedulesPicker
                items={schedules}
                onSelectSchedule={handleSelectedSchedules}
                onCleanSchedule={handleCleanSchedule}
                onSelectAll={handleSelectAll}
              />
            </Box>
          </Grid>
          <Grid item xs={6} container rowGap={2}>
            <Typography variant="body1">Ingresa la dirección</Typography>
            <Typography variant="body2" color={"text.secondary"}>
              Al ingresar el código postal se rellenaran los campos de tu
              dirección (cambialos de ser necesario)
            </Typography>
            <Stack direction={"row"} columnGap={2} alignItems={"center"}>
              <InputControl
                name={"zipcode"}
                label={"Código Postal"}
                rules={{
                  required: "El código postal es obligatorio",
                }}
                errors={errors}
                loading={loading}
                disabled={loading}
                control={control}
                fullWidth={false}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length === 5 && !isNaN(value)) {
                    setInputsByZipcode(value);
                  }
                }}
              />
              <Link
                sx={{ cursor: "pointer", ml: 2, fontSize: "12px" }}
                onClick={() => redirectTo("https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx")}
              >
                No sé mi código postal
              </Link>
            </Stack>
            <InputControl
              name="state"
              control={control}
              label="Estado"
              errors={errors}
              rules={{ required: "Se requiere un estado" }}
            />
            <InputControl
              name="municipality"
              control={control}
              label="Municipio"
              errors={errors}
              rules={{ required: "Se requiere un municipio" }}
            />
            <InputControl
              name="neighborhood"
              control={control}
              label="Colonia"
              errors={errors}
              rules={{ required: "Se requiere la colonia" }}
            />
            <InputControl
              name="direction"
              control={control}
              label="Dirección"
              errors={errors}
              placeholder="Calle  Número"
              rules={{
                required: "La dirección es obligatoria",
                minLength: {
                  value: 8,
                  message: "La dirección debe ser mayor a 10 caractéres",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {isLoaded ? (
              center.lat &&
              center.lng && (
                <HtmlTooltip
                  open={openTooltip}
                  onClose={handleTooltipClose}
                  placement="top-end"
                  title={
                    <Typography color="success">
                      <strong>Seleccione la ubicación exacta</strong> <br />
                      Mueva el puntero a la ubicacion del punto de entrega
                    </Typography>
                  }
                  sx={{ fontSize: "60px", zIndex: 2 }}
                >
                  <Box sx={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? "none" : "auto" }}>
                    <MapGoogle
                      center={center}
                      styles={styleContainer}
                      zoom={16}
                      onGetPosition={(e) => {
                        setInputsByMarker(e);
                      }}
                      typeCursor="pointer"
                      scrollable={false}
                    >
                      {marker.lat && marker.lng && (
                        <MarkerF
                          position={marker}
                          animation={google.maps.Animation.DROP}
                        />
                      )}
                    </MapGoogle>
                  </Box>
                </HtmlTooltip>
              )
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"} display={"flex"} columnGap={2}>
              <Button variant="contained" fullWidth type="submit" onClick={validateSchedules} size="large">
                Crear
              </Button>
              <Button size="large" variant="contained" onClick={() => navigate("/puntos-entrega/todos")} fullWidth color="error">
                Cancelar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default CreateDeliveryPoint;