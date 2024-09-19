import React from 'react';
import { GoogleMap, useLoadScript, Polygon, OverlayView } from '@react-google-maps/api';
import Typography from '@mui/material/Typography'

const __mapMandatoryStyles = { width: '100%', height: '500px' };
const googleMapsApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;

// Función para calcular el centroide de un polígono
const calculateCenter = (path) => {
  const latLngs = path.map((point) => new window.google.maps.LatLng(point.lat, point.lng));
  const bounds = new window.google.maps.LatLngBounds();
  latLngs.forEach((latLng) => bounds.extend(latLng));
  return bounds.getCenter().toJSON();
};

const MultiRegionMap = ({ regions }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey, // Usa tu clave de API
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  // Agrega los centros a cada región antes de renderizar el componente
  const regionsWithCenters = regions.map((region) => ({
    ...region,
    center: calculateCenter(region.path), // Calcula el centro y lo agrega a la región
  }));

  return (
    <GoogleMap
      zoom={11}
      center={{ lat: 19.432604958299997, lng: -99.13322417271692 }} 
      mapContainerStyle={__mapMandatoryStyles}
    >
      {regionsWithCenters.map((region) => (
        <React.Fragment key={region._id}>
          <Polygon
            path={region.path.map((point) => ({ lat: point.lat, lng: point.lng }))}
            options={{
              fillColor: 'orange',
              fillOpacity: 0.3,
              strokeColor: 'orange',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
          <OverlayView
            position={region.center} // Usa el centro pre-calculado
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
           <Typography variant="body1" color="red"> 
              {region.name}
            </Typography>
          </OverlayView>
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};

export default MultiRegionMap;
