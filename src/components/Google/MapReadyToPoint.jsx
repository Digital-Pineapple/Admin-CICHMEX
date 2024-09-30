import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import imageCM from "./../../assets/Images/CHMX/Imagotipo Cuadrado CHMX.png";
import { orange } from "@mui/material/colors";

const MapReadyToPoint = ({ readyToPoint }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY,
  });
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = useMemo(
    () => ({
      lat: 19.2866552, // Latitud inicial
      lng: -99.5110379, // Longitud inicial
    }),
    []
  );

  const pointsGrouped = readyToPoint.reduce((acc, point) => {

    // Priorizar `deliveryLocation`, si no está, usar `branchLocation`
    const location = point.deliveryLocation || point.branchLocation;

    if (location && !isNaN(location.lat) && !isNaN(location.lgt)) {
      const { lat, lgt } = location;
      const key = `${lat}-${lgt}`; // Creamos la clave en función de lat y lgt

      if (!acc[key]) {
        acc[key] = { ...point, count: 1 }; // Si el punto aún no existe, lo agregamos
      } else {
        acc[key].count += 1; // Si ya existe, incrementamos el contador
      }
    } else {
      console.warn("Invalid or undefined lat/lng", point);
      // Manejar el caso en que `lat` o `lng` no sean válidos
    }

    return acc; // Retornamos el acumulador
  }, {});


  if (!isLoaded) return <div>Loading...</div>;

  

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {Object.values(pointsGrouped).map((point, index) => (
        <Marker
          key={index}
          position={{
            lat: point.deliveryLocation?.lat,
            lng: point.deliveryLocation?.lgt,
          }}
          icon={{
            url: imageCM, // URL de la imagen del icono
            scaledSize: new google.maps.Size(30, 30), // Tamaño del icono
            anchor: new google.maps.Point(25, 50), // Punto de anclaje del icono
          }}
          label={{
            text: point.count > 1 ? `${point.count}` : null,  // Si el count es mayor que 1, lo muestra
            color: orange[700], // Cambia a azul
            fontSize: "16px", // Cambia el tamaño de la fuente
            fontWeight: "Bold", // Aplica peso de texto semi-negrita
          }}
        ></Marker>
      ))}
    </GoogleMap>
  );
};

export default MapReadyToPoint;
