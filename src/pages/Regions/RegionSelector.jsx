import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Polygon, GoogleMap, useLoadScript, DrawingManagerF } from '@react-google-maps/api';
import { Button } from '@mui/material';

const mapStyles =  [{ featureType: "all", elementType:"labels.icon", stylers:[{visibility:"off"}]}] 
const mainStyles={height:'600px', width:'100%'} 
const googleMapsApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;
const libraries = ['drawing'];

const RegionSelector = ({ lat = 19.432604958299997, lng = -99.13322417271692, isStatic= false, zoom = 15, isDrawable = true, coordinates =[], setCoordinates, }) => {
  
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey,
    libraries,
  });

  const [mapKey, setMapKey] = useState(0); // Estado para forzar la recarga del mapa
  const mapRef = useRef(null);
  const drawingManagerRef = useRef(null);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleDraw = useCallback(
    (shape) => {
      setCoordinates([...coordinates, shape]);
    },
    [coordinates, setCoordinates]
  );

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

  const renderShapes = useCallback(
    () =>
      coordinates.map((shape, idx) =>
        shape.type === 'polygon' ? (
          <Polygon key={idx} path={shape.path.map((latLng) => latLng)} />
        ) : null
      ),
    [coordinates]
  );
  

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
       <Button onClick={handleClearMap} variant='contained' size='small' style={{ margin: '10px' }}>
          Borrar Polígonos
        </Button>
        <GoogleMap
          key={mapKey} // Esta clave forzará la recarga del mapa cuando cambie
          zoom={zoom}
          center={{ lat, lng }}
          options={getMapOptions}
           mapContainerStyle={mainStyles}
          onLoad={handleMapLoad}
  

        >
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

          {renderShapes()}
        </GoogleMap>
       
      </>
    ) : null;
  }

  return isLoaded ? (
    <GoogleMap
      key={mapKey} // Esta clave forzará la recarga del mapa cuando cambie
      zoom={zoom}
      center={{ lat, lng }}
      options={getMapOptions}
      mapContainerStyle={__mapMandatoryStyles}
    />
  ) : null;
};

export default RegionSelector;
