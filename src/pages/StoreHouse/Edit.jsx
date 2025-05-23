import { useEffect, useState, useCallback } from "react";
import { MarkerF } from "@react-google-maps/api";
import { Typography, Grid2, CircularProgress, Button, Stack, Link, Box, InputAdornment, IconButton, FormHelperText, FormControl, Chip, Modal, Fab } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useLoadScript } from "@react-google-maps/api";
import { useAuthStore, useUI } from "../../hooks";
import useGeocode from "../../hooks/useGeocode";
import { useDebouncedCallback } from "use-debounce";
import MapGoogle from "../../components/Google/MapGoogle";
import { redirectTo } from "../../helpers/redirectLink";
import { HtmlTooltip } from "../../components/Tooltips/HtmlTooltip";
import InputControl from "../../components/ui/InputControl";
import StyledDropzone from "../../components/DropZone/StyledDropZone";
import useImagesV2 from "../../hooks/useImagesV2";
import { useStoreHouse } from "../../hooks/useStoreHouse";
import { useParams } from "react-router-dom";
import { Close, Delete, NavigateBefore, NavigateNext, OpenInFull, UploadFile, UploadFileRounded } from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #bbdefb",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  boxShadow: 24,
  p: 4,
};

const styleContainer = {
  width: "100%",
  height: "600px",
};

// Componente separado para el tooltip
const MapTooltip = ({ open, onClose, children }) => (
  <HtmlTooltip
    open={open}
    onClose={onClose}
    placement="top-end"
    title={
      <Typography color="success">
        <strong>Seleccione la ubicación exacta</strong> <br />
        Mueva el puntero a la ubicacion del punto de entrega
      </Typography>
    }
    sx={{ fontSize: "60px", zIndex: 2 }}
  >
    {children}
  </HtmlTooltip>
);

function Edit() {
  const { id } = useParams(); // Obtiene el ID de los parámetros de la URL
  const [openTooltip, setOpenTooltip] = useState(true); // Controla la visibilidad del tooltip
  const { navigate } = useAuthStore(); // Hook para manejar la navegación
  const [loading1, setLoading] = useState(false); // Estado de carga para ciertas operaciones
  const [open, setOpen] = useState({ image: null, value: false }); // Controla la apertura de un modal para imágenes

  const handleOpen = (image) => {
    setOpen({ image: image, value: true }); // Abre el modal con una imagen específica
  };

  const {
    center, // Centro del mapa
    marker, // Marcador en el mapa
    getCenterFromZipCode, // Obtiene coordenadas a partir de un código postal
    getAddressFromCoords, // Obtiene dirección a partir de coordenadas
    handleSetMarker, // Establece el marcador en el mapa
    handleSetCenter, // Establece el centro del mapa
    loadMarker, // Carga un marcador en el mapa
  } = useGeocode();

  const { loadUpdateStoreHouse, loadOneStoreHouse, StoreHouseDetail } = useStoreHouse(); // Funciones y datos relacionados con el almacén
  const { loading } = useUI(); // Estado de carga global
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY, // Clave de la API de Google Maps
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
  } = useForm(); // Hook para manejar formularios

  // Cargar datos iniciales del almacén
  useEffect(() => {
    const loadData = async () => {
      if (id) {
        await loadOneStoreHouse(id); // Carga los datos de un almacén específico
      }
    };
    loadData();
  }, [id]);

  // Actualizar el formulario cuando lleguen los datos del almacén
  useEffect(() => {
    if (StoreHouseDetail?._id) {
      reset({
        name: StoreHouseDetail.name || '',
        phone: StoreHouseDetail.phone_number || "",
        description: StoreHouseDetail.description || "",
        zipcode: StoreHouseDetail.location?.cp || "",
        direction: StoreHouseDetail.location?.direction || "",
        municipality: StoreHouseDetail.location?.municipality || "",
        neighborhood: StoreHouseDetail.location?.neighborhood || "",
        state: StoreHouseDetail.location?.state || "",
      });
      handleSetMarker(
        StoreHouseDetail.location?.lat,
        StoreHouseDetail.location?.lgt
      ); // Establece el marcador en el mapa
      loadMarker(StoreHouseDetail.location.lat, StoreHouseDetail.location.lgt); // Carga el marcador en el mapa
    }
  }, [StoreHouseDetail]);

  // Limpia los campos de dirección
  function clearAddressInputs() {
    setValue("municipality", "");
    setValue("state", "");
    setValue("neighborhood", "");
  }

  // Maneja la obtención de dirección a partir de coordenadas
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
    }, () => setLoading(false));
  }

  // Función para manejar la dirección con debounce
  const debouncedInputsByCoords = useDebouncedCallback((latitud, longitud) => handleAddressFromCoords(latitud, longitud), 1000);

  // Establece los inputs del formulario a partir del marcador en el mapa
  function setInputsByMarker(event) {
    setLoading(true);
    const latitud = event.latLng.lat();
    const longitud = event.latLng.lng();
    handleSetMarker(latitud, longitud);
    handleSetCenter(latitud, longitud);
    debouncedInputsByCoords(latitud, longitud);
  }

  // Establece los inputs del formulario a partir del código postal
  function setInputsByZipcode(zipcode) {
    if (!(zipcode.length === 5) && isNaN(zipcode)) {
      return;
    }
    setLoading(true);
    getCenterFromZipCode(zipcode, (data) => {
      const { lat, lng } = data;
      if (lat && lng) {
        handleSetMarker(lat, lng);
        handleSetCenter(lat, lng);
        debouncedInputsByCoords(lat, lng);
      }
    });
  }

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    await loadUpdateStoreHouse(id, data, marker); // Actualiza los datos del almacén
  };

  if (loading) {
    return <LoadingScreenBlue />; // Muestra una pantalla de carga si está cargando
  }

  return (
    <Grid2 container spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Título */}
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
          Editar CEDIS {StoreHouseDetail ? StoreHouseDetail.storehouse_key : ''}
        </Typography>
      </Grid2>

      {/* Campos del formulario */}
      <Grid2 size={{ sm: 12, md: 4 }}>
        <InputControl
          name="name"
          label="Nombre del CEDIS"
          rules={{ required: "El nombre es obligatorio" }}
          control={control}
          errors={errors}
        />
      </Grid2>

      <Grid2 size={{ sm: 12, md: 4 }}>
        <InputControl
          name="phone"
          label="Teléfono"
          control={control}
          errors={errors}
          type="tel"
          rules={{ required: "El teléfono es obligatorio" }}
          InputProps={{ startAdornment: <InputAdornment position="start">+52</InputAdornment> }}
        />
      </Grid2>

      <Grid2 size={{ sm: 12, md: 4 }}>
        <InputControl
          name="description"
          label="Descripción"
          control={control}
          errors={errors}
          multiline
        />
      </Grid2>

      {/* Dirección */}
      <Grid2 size={12} container spacing={3}>
        <Grid2 size={{ sm: 12, md: 6 }}>
          <Typography variant="h6">Dirección</Typography>

          <InputControl
            name={"zipcode"}
            label={"Código Postal"}
            rules={{
              required: "El código postal es obligatorio",
            }}
            errors={errors}
            loading={loading1}
            disabled={loading1}
            control={control}
            fullWidth={false}
            onChange={(e) => {
              const value = e.target.value;
              setInputsByZipcode(value);
            }}
          />

          <Link
            sx={{ cursor: "pointer", display: 'block', mb: 2 }}
            onClick={() => redirectTo("https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx")}
          >
            No sé mi código postal
          </Link>

          <Grid2 container spacing={2}>
            <Grid2 size={{ sm: 12, md: 6 }}>
              <InputControl
                name="state"
                label="Estado"
                control={control}
                errors={errors}
              />
            </Grid2>

            <Grid2 size={{ sm: 12, md: 6 }}>
              <InputControl
                name="municipality"
                label="Municipio"
                control={control}
                errors={errors}
              />
            </Grid2>

            <Grid2 size={{ sm: 12, md: 6 }}>
              <InputControl
                name="neighborhood"
                label="Colonia"
                control={control}
                errors={errors}
              />
            </Grid2>

            <Grid2 size={{ sm: 12, md: 6 }}>
              <InputControl
                name="direction"
                label="Dirección"
                control={control}
                errors={errors}
                rules={{
                  required: "La dirección es obligatoria",
                  minLength: {
                    value: 10,
                    message: "La dirección debe ser mayor a 10 caractéres",
                  },
                }}
              />
            </Grid2>
          </Grid2>
        </Grid2>

        {/* Mapa */}
        <Grid2 size={{ sm: 12, md: 6 }}>
          {!isLoaded ? (
            <CircularProgress />
          ) : (
            <MapTooltip open={openTooltip} onClose={() => setOpenTooltip(false)}>
              <Box sx={{ opacity: loading1 ? 0.5 : 1, pointerEvents: loading1 ? "none" : "auto" }}>
                <MapGoogle
                  center={center}
                  styles={styleContainer}
                  zoom={16}
                  onGetPosition={setInputsByMarker}
                  typeCursor="pointer"
                >
                  {marker.lat && marker.lng && (
                    <MarkerF
                      position={marker}
                      animation={google.maps.Animation.DROP}
                    />
                  )}
                </MapGoogle>
              </Box>
            </MapTooltip>
          )}
        </Grid2>
      </Grid2>

      {/* Botones */}
      <Grid2 size={{ sm: 12 }} display={'flex'} gap={1}>
        <Button fullWidth variant="contained" color="error" onClick={() => navigate("/CEDIS/todos")}>
          Cancelar
        </Button>
        <Button fullWidth type="submit" color='success' variant="contained">
          Actualizar
        </Button>
      </Grid2>
    </Grid2>
  );
}

export default Edit;