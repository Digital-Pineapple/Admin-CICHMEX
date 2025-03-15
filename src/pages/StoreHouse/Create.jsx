import { useEffect, useState } from "react";
import { MarkerF } from "@react-google-maps/api";
import { Typography, Grid2, CircularProgress, Button, Stack, Link, Container, InputAdornment, Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLoadScript } from "@react-google-maps/api";
import { useAuthStore } from "../../hooks";
import useGeocode from "../../hooks/useGeocode";
import { useDebouncedCallback } from "use-debounce";
import MapGoogle from "../../components/Google/MapGoogle";
import { redirectTo } from "../../helpers/redirectLink";
import { HtmlTooltip } from "../../components/Tooltips/HtmlTooltip";
import InputControl from "../../components/ui/InputControl";
import { useStoreHouse } from "../../hooks/useStoreHouse";
const styleContainer = {
  width: "100%",
  height: "600px",
};

function Create() {
  const [openTooltip, setOpenTooltip] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    center,
    marker,
    getCenterFromZipCode,
    getAddressFromCoords,
    handleSetMarker,
    handleSetCenter,
  } = useGeocode();
  const { loadCreateStoreHouse } = useStoreHouse();

  const handleTooltipClose = () => setOpenTooltip(false);
  const { navigate } = useAuthStore();
  const [loading, setLoading] = useState(false);  
  const { formState: { errors }, handleSubmit, control, watch, setValue } = useForm();

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY,
  });


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
      if (lat && lng) {
        handleSetMarker(lat, lng);
        handleSetCenter(lat, lng);
        debouncedInputsByCoords(lat, lng);
      }else{
        setLoading(false)
      }
    }, (error) => setLoading(false) );
    
  }

 

  const onSubmit = (data)=>{
     loadCreateStoreHouse(data, marker) 
  }

  return (
    <Grid2 container width={'100%'}  gap={2} component={'form'}onSubmit={handleSubmit(onSubmit)} >
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
          Crear CEDIS
        </Typography>
      </Grid2>
       
          <Grid2 size={4}>
            <InputControl
              name={"name"}
              label={"Nombre del cedis"}
              rules={{ required: "El nombre es obligatorio" }}
              control={control}
              errors={errors}
            />
          </Grid2>
          <Grid2 size={3.7}>
            <InputControl
              name={"phone"}
              label={"Teléfono del cedis"}
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
          </Grid2>
          <Grid2 size={4}>
            <InputControl
              name={"description"}
              label={"Descripción del cedis"}
              control={control}
              errors={errors}
              multiline
              // rows={2}
            />
          </Grid2>

          <Grid2 size={12} display={'flex'} gap={1} >
            <Grid2 size={6} display={'flex'} gap={1} flexDirection={'column'}>
            <Typography  variant="body1">Ingresa la dirección</Typography>
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
          </Grid2>
          <Grid2 size={5.7}>
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
          </Grid2>
          </Grid2>
          

          <Grid2 size={12}>
            <Stack direction={"row"} display={"flex"} columnGap={2}>
              <Button size="small" variant="contained" onClick={() => navigate("/CEDIS/todos", {replace:true})} fullWidth color="error">
                Cancelar
              </Button>
              <Button variant="contained" color="success" fullWidth type="submit" size="small">
                Crear
              </Button>
            </Stack>
          </Grid2>
    </Grid2>
  );
}

export default Create;