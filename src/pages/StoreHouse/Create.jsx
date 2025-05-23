import { useEffect, useState } from "react";
import { MarkerF } from "@react-google-maps/api";
import {
  Typography,
  Grid2,
  CircularProgress,
  Button,
  Stack,
  Link,
  Container,
  InputAdornment,
  Box,
  Grid,
} from "@mui/material";
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
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

const styleContainer = {
  width: "100%",
  height: "600px",
};

function Create() {
  const [openTooltip, setOpenTooltip] = useState(true);

  // Desplazar la ventana al inicio al cargar el componente
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

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm();

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY,
  });

  // Limpiar los campos de dirección
  function clearAddressInputs() {
    setValue("municipality", "");
    setValue("state", "");
    setValue("neighborhood", "");
  }

  // Obtener dirección a partir de coordenadas
  function handleAddressFromCoords(lat, lng) {
    getAddressFromCoords(lat, lng, (data) => {
      if (data === undefined || data === null) {
        setLoading(false);
        return;
      }
      clearAddressInputs();
      const detalles = data?.results;
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
    });
  }

  // Debounce para evitar múltiples llamadas al obtener dirección por coordenadas
  const debouncedInputsByCoords = useDebouncedCallback(
    (latitud, longitud) => handleAddressFromCoords(latitud, longitud),
    1000
  );

  // Actualizar inputs al mover el marcador en el mapa
  function setInputsByMarker(event) {
    setLoading(true);
    const latitud = event.latLng.lat();
    const longitud = event.latLng.lng();
    handleSetMarker(latitud, longitud);
    handleSetCenter(latitud, longitud);
    debouncedInputsByCoords(latitud, longitud);
  }

  // Actualizar inputs al ingresar un código postal
  function setInputsByZipcode(zipcode) {
    if (!zipcode && typeof zipcode !== string && zipcode.length !== 5) {
      return;
    }
    setLoading(true);
    getCenterFromZipCode(
      zipcode,
      (data) => {
        const { lat, lng } = data;
        if (lat && lng) {
          handleSetMarker(lat, lng);
          handleSetCenter(lat, lng);
          debouncedInputsByCoords(lat, lng);
        } else {
          setLoading(false);
        }
      },
      (error) => setLoading(false)
    );
  }

  // Manejar el envío del formulario
  const onSubmit = (data) => {
    loadCreateStoreHouse(data, marker);
  };

  const paths = [
    { path: "/CEDIS/todos", name: "Centros de Distribución Logística" },
    { path: "/CEDIS/agregar", name: "Crear CEDIS" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 0, sm: 10 }} gap={1}>
      {/* Encabezado */}
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
          <strong>Centros de Distribución Logística</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb */}
      <Grid2
        size={12}
        display={"flex"}
        margin={2}
        justifyContent={"space-between"}
      >
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Formulario */}
      <Grid2
        container
        gap={1}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          bgcolor: "#fff",
          padding: 4,
          borderRadius: "20px",
        }}
      >
        {/* Campos del formulario */}
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
          />
        </Grid2>

        {/* Dirección y mapa */}
        <Grid2 size={12} display={"flex"} gap={1}>
          <Grid2 size={6} display={"flex"} gap={1} flexDirection={"column"}>
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
                onClick={() =>
                  redirectTo(
                    "https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx"
                  )
                }
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
            {/* Mapa de Google */}
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
                  <Box
                    sx={{
                      opacity: loading ? 0.5 : 1,
                      pointerEvents: loading ? "none" : "auto",
                    }}
                  >
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

        {/* Botones de acción */}
        <Grid2 size={12}>
          <Stack direction={"row"} display={"flex"} columnGap={2}>
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate("/CEDIS/todos", { replace: true })}
              fullWidth
              color="error"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              type="submit"
              size="small"
            >
              Crear
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default Create;
