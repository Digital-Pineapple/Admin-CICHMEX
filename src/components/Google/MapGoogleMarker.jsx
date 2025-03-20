import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Estilos personalizados del mapa (colores, etiquetas, etc.)
const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.text',
    stylers: [
      { visibility: 'on' } // Oculta las etiquetas de texto
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { color: '#ffffff' } // Color de los puntos de interés (POI)
    ]
  },
 
];

// Estilos del contenedor del mapa (tamaño)
const mapContainerStyle = {
  width: '100%', // Ancho del contenedor del mapa
  height: '450px', // Alto del contenedor del mapa
};

const API_KEY = import.meta.env.VITE_REACT_APP_MAP_KEY;

function MapGoogleMarker({ center, children, zoom = 12, scrollable = true }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}  // Tamaño del contenedor del mapa
      center={center}  // Centro del mapa
      zoom={zoom}  // Nivel de zoom
      options={{
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: false,
        fullscreenControl: true,
        clickableIcons: false,
        restriction: {
          latLngBounds: {
            north: 32.7167,  // Límite norte
            south: 14.5515,  // Límite sur
            west: -118.4049, // Límite oeste
            east: -86.7106,  // Límite este
          },
        },
        strictBounds: false,  // Permitir salir de los límites
        scrollwheel: scrollable,  // Controla si se puede hacer scroll con la rueda del ratón
        styles: mapStyles,  // Estilos del mapa
      }}
    >
      <Marker position={center} />  {/* Marcador en el centro del mapa */}
    </GoogleMap>
  );
}

export default MapGoogleMarker;
