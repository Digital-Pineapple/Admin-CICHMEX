import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Grid, Modal, Box } from "@mui/material";
import Swal from "sweetalert2";
import QrCodeIcon from "@mui/icons-material/QrCode";

const QRScannerV2 = ({ setValueQR, label = "Escanear QR" }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleScan = (result) => {
    if (!result?.[0]?.rawValue) return;
  
    try {
      const parsedResult = JSON.parse(result[0].rawValue);
      console.log("QR escaneado:", parsedResult); // 🔍 Verificar el valor recibido
      setValueQR(parsedResult); // Enviar el valor al padre
      setIsOpen(false); // Cerrar modal
    } catch (error) {
      Swal.fire("Error", "El código escaneado no es válido", "error");
    }
  };
  

  return (
    <>
    <Button
      startIcon={<QrCodeIcon />}
      variant="contained"
      onClick={() => setIsOpen(true)} // Abrir el modal y forzar actualización
      color="primary"
      size="large"
    >
      {label}
    </Button>

    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="qr-scanner-modal"
    >
      <Box   sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 500,
            height: 560,
          }}>
        <Button
          variant="contained"
          onClick={() => setIsOpen(false)}
          color="error"
          sx={{ mb: 2 }}
        >
          Cerrar
        </Button>
        <Grid container>
          <Scanner
            paused={!isOpen} // Se asegura de que el escáner se reinicie cada vez que se abre
            components={{ finder: true }}
            allowMultiple={false}
            scanDelay={200}
            styles={{ container: { width: "100%" } }}
            onScan={handleScan}
          />
        </Grid>
      </Box>
    </Modal>
  </>
  );
};

export default QRScannerV2;
