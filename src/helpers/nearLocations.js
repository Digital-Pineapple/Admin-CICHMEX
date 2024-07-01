const filterLocation=(center,direction) => {  
    // Filtrar marcadores cercanos basados en las coordenadas seleccionadas
    const distance = calculateDistance(
      center.lat,
      center.lng,
      direction.location.lat,
      direction.location.lgt
    );
    return distance <= 60; // Ajusta el rango según tus necesidades
    
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Fórmula haversine para calcular la distancia entre dos puntos en la Tierra
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
};


const toRadians = (degree) => {
    return degree * (Math.PI / 180);
};

export {filterLocation};