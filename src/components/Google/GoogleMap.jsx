import GoogleMapReact from 'google-map-react';
import { Icon, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

const AnyReactComponent = ({ text }) => {
  return (
    <div >
        <LocationOnIcon color='primary'  />
    </div>
  );
};

export const GoogleMap = ({ location }) => {

  const defaultProps = {
    center: {
      lat: location?.lat,
      lng: location?.lgt
    },
    zoom: 18
  };

  return (
    <div style={{width:'500px', height:'500px'}} >
      <GoogleMapReact
         bootstrapURLKeys={{
          key: import.meta.env.VITE_REACT_APP_MAP_KEY,
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      
      //  yesIWantToUseGoogleMapApiInternals
      
      >
          <AnyReactComponent
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            draggable={false}
           
          />
      
      </GoogleMapReact>
    </div>
  );
};
