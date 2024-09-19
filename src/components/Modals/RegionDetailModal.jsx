import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { cloneElement, forwardRef, Fragment } from "react";
import {
  GoogleMap,
  OverlayView,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import { CardContent, Typography } from "@mui/material";

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  height:'90%',
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const RegionDetailModal = ({ region, open, handleClose }) => {
  const __mapMandatoryStyles = { width: "100%", height: "700px" };
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;

  const calculateCenter = (path) => {
    const latLngs = path.map(
      (point) => new window.google.maps.LatLng(point.lat, point.lng)
    );
    const bounds = new window.google.maps.LatLngBounds();
    latLngs.forEach((latLng) => bounds.extend(latLng));
    return bounds.getCenter().toJSON();
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  // Calcula el centro de la región solo una vez
  const regionWithCenter = {
    ...region,
    center: calculateCenter(region.path),
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Card sx={style} variant="outlined">
            <CardHeader
              action={
                <IconButton onClick={() => handleClose()} aria-label="Cerrar">
                  <Close />
                </IconButton>
              }
              title={`Nombre: ${region.name}`}
              subheader={`Código: ${region.regionCode}`}
            />
            <CardContent>
              <GoogleMap
                zoom={13}
                center={regionWithCenter.center} // Usa el centro calculado dinámicamente
                mapContainerStyle={__mapMandatoryStyles}
              >
                <Fragment key={region._id}>
                  <Polygon
                    path={region.path.map((point) => ({
                      lat: point.lat,
                      lng: point.lng,
                    }))}
                    options={{
                      fillColor: "orange",
                      fillOpacity: 0.3,
                      strokeColor: "orange",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                    }}
                  />
                  <OverlayView
                    position={regionWithCenter.center} // Usa el centro pre-calculado
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  >
                    <Typography variant="body1" color="red">
                      {region.name}
                    </Typography>
                  </OverlayView>
                </Fragment>
              </GoogleMap>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

RegionDetailModal.propTypes = {
  region: PropTypes.shape({
    name: PropTypes.string.isRequired,
    regionCode: PropTypes.string.isRequired,
    path: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RegionDetailModal;
