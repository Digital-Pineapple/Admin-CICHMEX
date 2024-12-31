
const API_GOOGLE = import.meta.env.VITE_GOOGLE_MAP_KEY
 export function generateSrcGoogleMaps(latitud, longitud) {
    if (!latitud || !longitud) {
        throw new Error("Latitud y longitud son requeridas");
    }
    
    // Plantilla básica para un iframe de Google Maps
    const baseURL = "https://www.google.com/maps/embed/v1/view";
    const apiKey = API_GOOGLE; // Reemplaza con tu API key de Google Maps

    // Parámetros
    const zoom = 14; // Nivel de zoom inicial
    const queryParams = new URLSearchParams({
        key: apiKey,
        center: `${latitud},${longitud}`,
        zoom
    });

    return `${baseURL}?${queryParams.toString()}`;
}
