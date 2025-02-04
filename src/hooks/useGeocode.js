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
  setKey(import.meta.env.VITE_REACT_APP_MAP_KEY);
  setRegion("mx");
  const [center, setCenter] = useState({
    lat: null,
    lng: null,
  });
  const [marker, setMarker] = useState({
    lat: null,
    lng: null,
  });
  const [zoom, setZoom] = useState(13);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState(null);

  function getAddressCenterFromCoords(latitud, longitud) {
    let coords = latitud.toString() + "," + longitud.toString();
    geocode(RequestType.LATLNG, coords)
      .then(({ results }) => {
        const address = results[0].formatted_address;
        setAddress(address);
      })
      .catch(console.error);
  }

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

  function getCountry(item) {
    return item.types[0] === "country";
  }


  async function getCenterFromZipCode(value, callback = () => null, callbackError = () => null) {
    const zipcode = `${value} MX`
    return await geocode(RequestType.ADDRESS, zipcode ,{
      region: "mx",
      components:"geometry:location",      
    })
      .then(({results}) => {
        const data = results[0].geometry.location
        callback(data)
        // console.log(results);
        // return ;       
      })
      .catch((error)=> callbackError(error));
  } 
  async function getAddressFromCoords(latitud, longitud, callback, errorCallback) {
    let coords = latitud.toString() + "," + longitud.toString();
    return await geocode(RequestType.LATLNG,coords,{
      region: "mx",
      language:"es"      
    })
      .then((data) => {    
        callback(data)        
      })
      .catch((error)=>{
        errorCallback(error)
      });
  }

  const handleSetCenter=(lat,lng)=>{
    setCenter((prev) => ({
      ...prev,
      lat: lat,
      lng: lng,
    }))
  }

  const handleSetMarker=(lat,lng)=>{
    setMarker((prev) => ({
      ...prev,
      lat: lat,
      lng: lng,
    }))
  }


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
    handleSetMarker
  };
}
