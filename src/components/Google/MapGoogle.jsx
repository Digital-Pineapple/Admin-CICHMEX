import { GoogleMap, useLoadScript } from "@react-google-maps/api";
const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.text',
    stylers: [
      { visibility: 'off' } // Oculta las etiquetas de texto
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      { color: '#f5f5f5' } // Color del paisaje
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { color: '#ffffff' } // Color de los puntos de interés (POI)
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      { color: '#d3d3d3' } // Color de las carreteras
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      { color: '#c8c8c8' } // Color del agua
    ]
  }
];

const handleDefault=()=>{
  return;
}



function MapGoogle({ center, styles, children, zoom=12,onGetPosition=handleDefault,typeCursor="", scrollable=true}) {
  return (
    <GoogleMap
      onClick={onGetPosition}
      mapContainerStyle={styles}
      center={center}
      zoom={zoom}
      options={
        {
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
          clickableIcons:false,
          restriction: {
            latLngBounds: {
              north: 32.7167,
              south: 14.5515,
              west: -118.4049,
              east: -86.7106,
            }},
            strictBounds: false,
            scrollwheel: scrollable,
            draggableCursor:typeCursor
          // styles:mapStyles
        }
      }
    >
      {children}
    </GoogleMap>


  );

}

export default MapGoogle;

