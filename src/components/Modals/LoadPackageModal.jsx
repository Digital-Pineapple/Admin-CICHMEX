import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Grid, ButtonGroup, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { localDate } from "../../Utils/ConvertIsoDate";
import { startLoadVerifyStartRoute } from "../../store/actions/productOrderActions";
import QRScanner from "../QR/QRScanner";
import { enqueueSnackbar } from "notistack";
import { useProductOrder } from "../../hooks/useProductOrder";

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
  const [enabledButton, setEnabledButton] = useState(true)
  const [sCard, setSCard] = useState({});
  const {loadVerifyPackage} = useProductOrder()

  const verifyPackage = (id) => {
    loadVerifyPackage(id)
    setValueQr(null);
    setSCard(null);
    setEnabledButton(true)
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
      setEnabledButton(false)
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
      setEnabledButton(true)
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
          <Box sx={{...style, ...sCard}}>
            <Grid
              container
              padding={{ xs: 2, md: 5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Grid
                item
                marginTop={{ xs: "-30px" }}
                xs={12}
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
              </Grid>
              <Grid item xs={12} m={2}>
                <Typography variant="h3" textAlign={"center"}>
                  Id de orden: {productOrder?.order_id}
                </Typography>
              </Grid>

              <Grid item xs={12} md={5}>
                <h2>Almacén:</h2>

                <Typography>
                  Responsable de empaque:{" "}
                  {productOrder?.supply_detail?.user?.fullname}
                </Typography>
                <Typography>Fecha de empaque: {date}</Typography>

                {productOrder?.branch ? (
                  <>
                    <h2>Sucursal de Entrega:</h2>

                    <Typography>
                      Nombre de la sucursal: {productOrder?.branch?.name}
                    </Typography>
                    <Typography>
                      Estado: {productOrder?.branch?.location?.state}
                    </Typography>
                    <Typography>
                      Municipio: {productOrder?.branch?.location?.municipality}
                    </Typography>
                    <Typography>
                      Localidad: {productOrder?.branch?.location?.neighborhood}
                    </Typography>
                    <Typography>
                      Dirección: {productOrder?.branch?.location?.direction}
                    </Typography>
                    <Typography>CP: {productOrder?.branch?.location?.cp}</Typography>
                  </>
                ) : (
                  <>
                    <h2>Direccion de envío:</h2>
                    <Typography>
                      Estado: {productOrder?.deliveryLocation?.state}
                    </Typography>
                    <Typography>
                      Municipio: {productOrder?.deliveryLocation?.municipality}
                    </Typography>
                    <Typography>
                      Calle: {productOrder?.deliveryLocation?.direction}
                    </Typography>
                    <Typography>Código postal: {productOrder?.deliveryLocation?.cp}</Typography>
                    <Typography>Referencias: {productOrder?.deliveryLocation?.references}</Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                <QRScanner setValueQR={setValueQr} />
              </Grid>

              <Grid mt={2} item xs={12}>
                <ButtonGroup fullWidth variant="contained" color="inherit">
                  <Button color="success" disabled={enabledButton} onClick={() => verifyPackage(productOrder._id)}>
                    Verificar y cargar paquete
                  </Button>
                  <Button color="error" onClick={() => { handleClose(); setValueQr(null); setSCard(null); setEnabledButton(true) }}>
                    Cancelar
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default LoadPackageModal;
