import React, { useState } from "react";
import {
  GoogleMap,
  Polyline,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Button, Grid, ButtonGroup } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 19.2866552, // Centro inicial
  lng: -99.5110379,
};

const API_KEY = import.meta.env.VITE_REACT_APP_MAP_KEY;

const MapRouteOptimized = ({ optimizedRoutes }) => {
  const [selectedMarker, setSelectedMarker] = useState(null); // Controlar el marcador seleccionado

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  // Decodificar polyline para obtener la ruta
  const decodePolyline = (polyline) => {
    let points = [];
    let index = 0;
    const len = polyline?.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return points;
  };

  const routePolyline = decodePolyline(optimizedRoutes.overviewPolyline);

  // Colores predefinidos o puedes generarlos aleatoriamente
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFA500", "#800080"];

  // Función para obtener colores rotativos
  const getColor = (index) => colors[index % colors.length];

  // Función para simular la distancia y tiempo
  const getDistanceAndTime = (item) => ({
    distance: item?.distance?.text,
    time: item?.duration?.text,
    direction_start: item?.start_address,
    direction_end: item?.end_address,
  });

  const points = optimizedRoutes?.points || [];

  const openInWaze = (item) => {
    const wazeUrl = `https://waze.com/ul?ll=${item.end_location.lat},${item.end_location.lng}&from=${item.start_location.lat},${item.start_location.lng}&navigate=yes`;
    window.open(wazeUrl, "_blank");
  };

  const openInGoogleMaps = (item) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${item.end_location.lat},${item.end_location.lng}&destination=${item.start_location.lat},${item.start_location.lng}&travelmode=driving`;
    window.open(googleMapsUrl, "_blank");
  };

  const mapOptions = {
    zoomControl: true, // Control de zoom habilitado
    mapTypeId: "roadmap", // Tipo de mapa (puede ser 'roadmap', 'satellite', 'hybrid', o 'terrain')
    disableDefaultUI: true, // Mostrar controles predeterminados
    fullscreenControl: true, // Botón de pantalla completa habilitado
    streetViewControl: true, // Street View habilitado
    gestureHandling: "cooperative", // Gestos permitidos (auto, cooperative, none, greedy)
    zoom: 12, // Nivel de zoom inicial
  };
  

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={mapOptions}
      center={center}
      zoom={12}
    >
      {/* Polyline de la ruta */}
      <Polyline
        path={routePolyline}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 5,
        }}
      />

      {/* Marcadores */}
      {points.map((item, index) => (
        <Marker
          key={index}
          position={item.start_location}
          label={{
            text: (index + 1).toString(),
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: getColor(index),
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#000000",
          }}
          onClick={() => setSelectedMarker(item)} // Asegurarse de que pasamos las coordenadas correctas
        />
      ))}

      {/* InfoWindow */}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.start_location} // Asegurarse de que pasamos un objeto { lat, lng }
          onCloseClick={() => setSelectedMarker(null)}
          options={{
            pixelOffset: new window.google.maps.Size(0, -30), // Ajustar la posición del InfoWindow
            disableAutoPan: false, // Permitir que la cámara se ajuste automáticamente
          }}
        >
          <Grid sx={{ fontSize: "10px" }}>
            <strong>Detalles</strong>
            <p>
              Direccionde salida:{" "}
              <strong>
                {getDistanceAndTime(selectedMarker).direction_start}
              </strong>{" "}
            </p>
            <p>
              Direccionde llegada:{" "}
              <strong>
                {getDistanceAndTime(selectedMarker).direction_end}
              </strong>
            </p>
            <p>
              Distancia:{" "}
              <strong>{getDistanceAndTime(selectedMarker).distance}</strong>
            </p>
            <p>
              Tiempo estimado:
              <strong>{getDistanceAndTime(selectedMarker).time}</strong>
            </p>
            <ButtonGroup fullWidth variant="contained" color="inherit" aria-label="">
              <Button
                size="small"
                color="primary"
                onClick={() => openInWaze(selectedMarker)}
                sx={{fontWeight:'light', textTransform:'capitalize', fontSize:'10px'}}
              >
                Abrir en Waze
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => openInGoogleMaps(selectedMarker)}
                sx={{fontWeight:'light', textTransform:'capitalize', fontSize:'10px'}}
              >
                Abrir en Google Maps
              </Button>
            </ButtonGroup>
          </Grid>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapRouteOptimized;
