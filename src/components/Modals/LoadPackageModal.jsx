import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Grid2, ButtonGroup, Button, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { localDate } from "../../Utils/ConvertIsoDate";
import { startLoadVerifyStartRoute } from "../../store/actions/productOrderActions";
import QRScanner from "../QR/QRScanner";
import { enqueueSnackbar } from "notistack";
import { useProductOrder } from "../../hooks/useProductOrder";
import { generateSrcGoogleMaps } from "../../Utils/GoogleSources";
import { MarkerF, useLoadScript } from "@react-google-maps/api";
import MapGoogle from "../Google/MapGoogle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const LoadPackageModal = ({ openModal, handleClose, productOrder }) => {
  const date = localDate(productOrder?.supply_detail?.date);
  const [valueQr, setValueQr] = useState(null);
  const [enabledButton, setEnabledButton] = useState(true);
  const [sCard, setSCard] = useState({});
  const { loadVerifyPackage } = useProductOrder();

  const verifyPackage = (id) => {
    loadVerifyPackage(id);
    setValueQr(null);
    setSCard(null);
    setEnabledButton(true);
    handleClose();
  };

  useEffect(() => {
    if (valueQr !== null) {
      styleCard(valueQr.order_id);
    }
  }, [valueQr, productOrder]);

  const styleCard = (v) => {
    if (v === productOrder.order_id) {
      setSCard({ border: "10px solid", borderColor: "success.light" });
      setEnabledButton(false);
      enqueueSnackbar({
        message: "Codigo valido",
        variant: "success",
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
      });
    } else {
      setSCard({ border: "10px solid", borderColor: "error.main" });
      setEnabledButton(true);
      enqueueSnackbar({
        message: "Codigo invalido",
        variant: "error",
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
      });
    }
  };
  const coords = {
    lat: productOrder?.branch?.location?.lat ?productOrder.branch?.location?.lat : productOrder?.deliveryLocation?.lat,
    lng: productOrder?.branch?.location?.lgt ?productOrder.branch?.location?.lgt : productOrder?.deliveryLocation?.lgt,
  };
  
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY,
  });


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleClose();
          }
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={{ ...style, ...sCard }}>
            <Grid2
              container
              padding={{ xs: 2, md: 5 }}
              display={"flex"}
            >
              <Grid2
                marginTop={{ xs: "-30px" }}
                size={12}
                minHeight={"100px"}
                className="Titles"
              >
                <Typography
                  textAlign={"center"}
                  variant="h2"
                  fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
                >
                  Verificar y cargar paquete
                </Typography>
              </Grid2>
              <Grid2 size={12} m={2}>
                <Typography variant="h3" textAlign={"center"}>
                  Id de orden: {productOrder?.order_id}
                </Typography>
              </Grid2>

              <Grid2 size={{ xs: 6 }}>
                <h2>Almacén:</h2>

                <Typography>
                  Responsable de empaque:{" "}
                  {productOrder?.supply_detail?.user?.fullname}
                </Typography>
                <Typography>Fecha de empaque: {date}</Typography>

             
              </Grid2>

              <Grid2 size={6}>
                <QRScanner setValueQR={setValueQr} />
              </Grid2>

              <Grid2 size={6}>
              {productOrder?.branch ? (
                  <>
                    <h2>Sucursal de Entrega:</h2>

                    <Typography>
                      <strong> Nombre de la sucursal:</strong>{" "}
                      {productOrder?.branch?.name}
                      Estado: {productOrder?.branch?.location?.state}
                      Municipio: {productOrder?.branch?.location?.municipality}
                      Localidad: {productOrder?.branch?.location?.neighborhood}
                      Dirección: {productOrder?.branch?.location?.direction}
                      CP: {productOrder?.branch?.location?.cp}
                    </Typography>
                  </>
                ) : (
                  <>
                    <h2>Direccion de envío:</h2>
                    <Typography>
                      <strong>Estado:</strong>{" "}
                      {productOrder?.deliveryLocation?.state} <br />
                      <strong> Municipio: </strong>
                      {productOrder?.deliveryLocation?.municipality} <br />
                      <strong>Localidad: </strong>
                      {productOrder?.deliveryLocation?.neighborhood} <br />
                      <strong> Calle: </strong>
                      {productOrder?.deliveryLocation?.street} <br />
                      <strong>No. exterior: </strong>
                      {productOrder?.deliveryLocation?.numext} <br />
                      <strong>No. interior: </strong>
                      {productOrder?.deliveryLocation?.numint || "N/A"} <br />
                      <strong>Código postal: </strong>
                      {productOrder?.deliveryLocation?.zipcode} <br />
                      <strong>Referencias: </strong>{" "}
                      {productOrder?.deliveryLocation?.references ||
                        "Sin información"}
                      <br />
                    </Typography>
                  </>
                )}
              </Grid2>

             
              <Grid2 size={5.6}>
              {isLoaded ?  (
            <MapGoogle
              styles={{ width: "100%", height: "300px" }}
              zoom={18}
              center={coords}
              scrollable={false}
            >
              <MarkerF position={coords} />
            </MapGoogle>
          
        ) : (
          <Skeleton variant="rectangular" />
        )}
                
              </Grid2>

              <Grid2 mt={2} gap={2} display={"flex"} size={12}>
                <Button
                  fullWidth
                  color="error"
                  onClick={() => {
                    handleClose();
                    setValueQr(null);
                    setSCard(null);
                    setEnabledButton(true);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  fullWidth
                  color="success"
                  disabled={enabledButton}
                  onClick={() => verifyPackage(productOrder._id)}
                >
                  Verificar y cargar paquete
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default LoadPackageModal;
