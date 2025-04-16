import React from 'react';
import { GoogleMap, useLoadScript, Polygon, OverlayView } from '@react-google-maps/api';
import Typography from '@mui/material/Typography'

// Estilos obligatorios para el contenedor del mapa
const __mapMandatoryStyles = { width: '100%', height: '500px' };

// Clave de la API de Google Maps obtenida de las variables de entorno
const googleMapsApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;

// Función para calcular el centroide de un polígono
const calculateCenter = (path) => {
  // Convierte los puntos del polígono en objetos LatLng de Google Maps
  const latLngs = path.map((point) => new window.google.maps.LatLng(point.lat, point.lng));
  const bounds = new window.google.maps.LatLngBounds();
  // Extiende los límites del mapa para incluir todos los puntos del polígono
  latLngs.forEach((latLng) => bounds.extend(latLng));
  // Devuelve el centro de los límites como un objeto JSON
  return bounds.getCenter().toJSON();
};

const MultiRegionMap = ({ regions }) => {
  // Carga el script de Google Maps con la clave de API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey, // Usa tu clave de API
  });

  // Muestra un mensaje de carga mientras el script de Google Maps no está listo
  if (!isLoaded) return <div>Cargando mapa...</div>;

  // Calcula el centro de cada región y lo agrega al objeto de la región
  const regionsWithCenters = regions.map((region) => ({
    ...region,
    center: calculateCenter(region.path), // Calcula el centro y lo agrega a la región
  }));

  return (
    <GoogleMap
      zoom={11} // Nivel de zoom inicial del mapa
      center={{ lat: 19.432604958299997, lng: -99.13322417271692 }} // Centro inicial del mapa
      mapContainerStyle={__mapMandatoryStyles} // Estilos del contenedor del mapa
    >
      {regionsWithCenters.map((region) => (
        <React.Fragment key={region._id}>
          {/* Dibuja un polígono para cada región */}
          <Polygon
            path={region.path.map((point) => ({ lat: point.lat, lng: point.lng }))}
            options={{
              fillColor: 'orange', // Color de relleno del polígono
              fillOpacity: 0.3, // Opacidad del relleno
              strokeColor: 'orange', // Color del borde del polígono
              strokeOpacity: 0.8, // Opacidad del borde
              strokeWeight: 2, // Grosor del borde
            }}
          />
          {/* Muestra un marcador con el nombre de la región en su centro */}
          <OverlayView
            position={region.center} // Usa el centro pre-calculado
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} // Define el nivel del overlay en el mapa
          >
            <Typography variant="body1" color="red"> 
              {region.name} {/* Nombre de la región */}
            </Typography>
          </OverlayView>
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};

export default MultiRegionMap;
