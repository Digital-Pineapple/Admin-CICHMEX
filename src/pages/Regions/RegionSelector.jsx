import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Polygon, GoogleMap, useLoadScript, DrawingManagerF } from '@react-google-maps/api';
import { Button } from '@mui/material';

// Estilos personalizados para el mapa
const mapStyles =  [{ featureType: "all", elementType:"labels.icon", stylers:[{visibility:"off"}]}] 
const mainStyles={height:'600px', width:'100%'} 

// Clave de la API de Google Maps
const googleMapsApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;

// Librerías necesarias para Google Maps
const libraries = ['drawing'];

const RegionSelector = ({ 
  lat = 19.432604958299997, // Latitud inicial del mapa
  lng = -99.13322417271692, // Longitud inicial del mapa
  isStatic= false, // Indica si el mapa es estático o interactivo
  zoom = 15, // Nivel de zoom inicial
  isDrawable = true, // Indica si se pueden dibujar polígonos en el mapa
  coordinates =[], // Coordenadas de las formas dibujadas
  setCoordinates, // Función para actualizar las coordenadas
}) => {
  
  // Carga del script de Google Maps
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey,
    libraries,
  });

  const [mapKey, setMapKey] = useState(0); // Estado para forzar la recarga del mapa
  const mapRef = useRef(null); // Referencia al mapa
  const drawingManagerRef = useRef(null); // Referencia al DrawingManager

  // Maneja la carga inicial del mapa
  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Maneja el dibujo de una nueva forma en el mapa
  const handleDraw = useCallback(
    (shape) => {
      setCoordinates([...coordinates, shape]);
    },
    [coordinates, setCoordinates]
  );

  // Maneja el evento cuando se completa un polígono
  const handleOnPolygonComplete = useCallback(
    (polygon) => {
      const polygonPathArray = polygon.getPath().getArray();
      const path = polygonPathArray.map((latLngLiteral) => ({
        lat: latLngLiteral.lat(),
        lng: latLngLiteral.lng(),
      }));
      handleDraw({ path, type: 'polygon' });
      polygon.setMap(null); // Quita el polígono del mapa al completarse
    },
    [handleDraw]
  );

  // Renderiza las formas dibujadas en el mapa
  const renderShapes = useCallback(
    () =>
      coordinates.map((shape, idx) =>
        shape.type === 'polygon' ? (
          <Polygon key={idx} path={shape.path.map((latLng) => latLng)} />
        ) : null
      ),
    [coordinates]
  );
  
  // Opciones de configuración del mapa
  const getMapOptions = useMemo(
    () => ({
      zoomControl: !isStatic,
      scrollwheel: !isStatic,
      rotateControl: !isStatic,
      clickableIcons: !isStatic,
      mapTypeControl: !isStatic,
      keyboardShortcuts: !isStatic,
      fullscreenControl: !isStatic,
      streetViewControl: !isStatic,
      disableDoubleClickZoom: isStatic,
      isFractionalZoomEnabled: !isStatic,
      gestureHandling: isStatic ? 'none' : 'auto',
      styles:mapStyles
    }),
    [isStatic]
  );

  // Función para limpiar el mapa y forzar la recarga
  const handleClearMap = useCallback(() => {
    setCoordinates([]);  // Limpiar las coordenadas
    setMapKey(prevKey => prevKey + 1); // Forzar recarga del mapa
  }, [setCoordinates]);

  if (isDrawable) {
    return isLoaded ? (
      <>
        {/* Botón para borrar los polígonos dibujados */}
        <Button onClick={handleClearMap} variant='contained' size='small' style={{ margin: '10px' }}>
          Borrar Polígonos
        </Button>
        {/* Componente principal del mapa */}
        <GoogleMap
          key={mapKey} // Esta clave forzará la recarga del mapa cuando cambie
          zoom={zoom}
          center={{ lat, lng }}
          options={getMapOptions}
          mapContainerStyle={mainStyles}
          onLoad={handleMapLoad}
        >
          {/* Herramienta para dibujar polígonos */}
          <DrawingManagerF
            ref={drawingManagerRef}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: window.google.maps.ControlPosition.INLINE_END_BLOCK_END,
                drawingModes: [window?.google?.maps?.drawing?.OverlayType.POLYGON,],
              },
            }}
            onPolygonComplete={handleOnPolygonComplete}
          />

          {/* Renderiza las formas dibujadas */}
          {renderShapes()}
        </GoogleMap>
      </>
    ) : null;
  }

  // Renderiza el mapa en modo estático
  return isLoaded ? (
    <GoogleMap
      key={mapKey} // Esta clave forzará la recarga del mapa cuando cambie
      zoom={zoom}
      center={{ lat, lng }}
      options={getMapOptions}
      mapContainerStyle={mainStyles}
    />
  ) : null;
};

export default RegionSelector;
