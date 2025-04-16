import { useState } from "react";
import {
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  setKey,
  geocode,
  RequestType,
} from "react-geocode";

export default function useGeocode() {
  // Configura la clave de la API y la región predeterminada
  setKey(import.meta.env.VITE_REACT_APP_MAP_KEY);
  setRegion("mx");

  // Estado para el centro del mapa
  const [center, setCenter] = useState({
    lat: null,
    lng: null,
  });

  // Estado para la posición del marcador
  const [marker, setMarker] = useState({
    lat: null,
    lng: null,
  });

  // Estado para el nivel de zoom del mapa
  const [zoom, setZoom] = useState(13);

  // Estado para la dirección obtenida
  const [address, setAddress] = useState("");

  // Estado para almacenar el país obtenido
  const [country, setCountry] = useState(null);

  // Obtiene la dirección a partir de coordenadas (latitud y longitud)
  function getAddressCenterFromCoords(latitud, longitud) {
    let coords = latitud.toString() + "," + longitud.toString();
    geocode(RequestType.LATLNG, coords)
      .then(({ results }) => {
        const address = results[0].formatted_address;
        setAddress(address);
      })
      .catch(console.error);
  }

  // Obtiene las coordenadas del centro a partir de una dirección
  function getCoordsCenterFromAddress(address) {
    geocode(RequestType.ADDRESS, address)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setCenter((prev) => ({
          ...prev,
          lat: lat,
          lng: lng,
        }));
      })
      .catch(console.error);
  }

  // Carga un marcador en el mapa basado en un evento de clic
  function loadMarkerByEvent(event) {
    const latitud = event.latLng.lat();
    const longitud = event.latLng.lng();
    setMarker((prev) => ({
      ...prev,
      lat: latitud,
      lng: longitud,
    }));
    setCenter((prev) => ({
      ...prev,
      lat: latitud,
      lng: longitud,
    }));
    setZoom(16);
  }

  // Carga un marcador en el mapa basado en coordenadas específicas
  function loadMarker(lat, lgt) {
    setMarker((prev) => ({
      ...prev,
      lat: lat,
      lng: lgt,
    }));
    setCenter((prev) => ({
      ...prev,
      lat: lat,
      lng: lgt,
    }));
    setZoom(16);
  }

  // Obtiene el objeto del país a partir de coordenadas
  function getObjectCountryFromCoords(latitud, longitud) {
    let coords = latitud.toString() + "," + longitud.toString();
    geocode(RequestType.LATLNG, coords)
      .then(({ results }) => {
        const address = results[0].address_components;
        const filteredCountry = address.filter((item) => getCountry(item));
        const [countryobject] = filteredCountry;
        setCountry(countryobject);
      })
      .catch(console.error);
  }

  // Filtra y devuelve el objeto del país
  function getCountry(item) {
    return item.types[0] === "country";
  }

  // Obtiene el centro del mapa a partir de un código postal
  async function getCenterFromZipCode(value, callback = () => null, callbackError = () => null) {
    const zipcode = `${value} MX`;
    return await geocode(RequestType.ADDRESS, zipcode, {
      region: "mx",
      components: "geometry:location",
    })
      .then(({ results }) => {
        const data = results[0].geometry.location;
        callback(data);
      })
      .catch((error) => callbackError(error));
  }

  // Obtiene la dirección a partir de coordenadas y ejecuta callbacks
  async function getAddressFromCoords(latitud, longitud, callback, errorCallback) {
    let coords = latitud.toString() + "," + longitud.toString();
    return await geocode(RequestType.LATLNG, coords, {
      region: "mx",
      language: "es",
    })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }

  // Actualiza el estado del centro del mapa
  const handleSetCenter = (lat, lng) => {
    setCenter((prev) => ({
      ...prev,
      lat: lat,
      lng: lng,
    }));
  };

  // Actualiza el estado del marcador
  const handleSetMarker = (lat, lng) => {
    setMarker((prev) => ({
      ...prev,
      lat: lat,
      lng: lng,
    }));
  };

  return {
    center,
    address,
    country,
    marker,
    zoom,
    loadMarker,
    loadMarkerByEvent,
    getAddressCenterFromCoords,
    getCoordsCenterFromAddress,
    getObjectCountryFromCoords,
    getCenterFromZipCode,
    getAddressFromCoords,
    handleSetCenter,
    handleSetMarker,
  };
}
