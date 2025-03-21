import React, { useState, useCallback } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Modal, Box, Typography } from "@mui/material";
import Swal from "sweetalert2";
import QrCodeIcon from "@mui/icons-material/QrCode";

const QRScannerV2 = ({ setValueQR, label = "Escanear QR", title = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScan = useCallback(
    (result) => {
      if (!result?.[0]?.rawValue) return;

      try {
        const parsedResult = JSON.parse(result[0].rawValue);
        setValueQR(parsedResult); // Enviar el valor al padre
        setIsOpen(false); // Cerrar modal
      } catch (error) {
        Swal.fire("Error", "El código escaneado no es válido", "error");
      }
    },
    [setValueQR]
  );

  return (
    <>
      <Button
        startIcon={<QrCodeIcon />}
        variant="contained"
        onClick={() => setIsOpen(true)}
        color="primary"
        size="large"
        fullWidth
      >
        {label}
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="qr-scanner-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 500,
            height: 560,
            borderRadius: "15px",
          }}
        >
          <Typography textAlign={"center"} variant="h5">
            {title}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsOpen(false)}
            color="error"
            sx={{ mb: 2 }}
          >
            Cerrar
          </Button>
          <Box padding={4}>
          <Scanner
            paused={!isOpen}
            allowMultiple={false}
            components={{finder:true}}
            scanDelay={200}
            onScan={handleScan}
          />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default QRScannerV2;
