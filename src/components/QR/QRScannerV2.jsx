import { Scanner } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import QrCodeIcon from '@mui/icons-material/QrCode';
import { height, width } from "@mui/system";

const QRScannerV2 = ({ setValueQR }) => {
  const [loadQR, setLoadQR] = useState(true);
  
  // Add modal style
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: 500,
    height: 560
  };

  const valuate = (result) => {
    let parsedResult;
    try {
      parsedResult = JSON.parse(result[0].rawValue);
    } catch (error) {
      Swal.fire("Error", "El código escaneado no es válido", "error");
      return;
    }   
    setLoadQR(true);
    setValueQR(parsedResult);
  };

  return (
    <>
      <Button
        startIcon={<QrCodeIcon />}
        variant="contained"
        onClick={() => setLoadQR(false)}
        color="primary"
        size="large"
      >
        Escanear QR de pedido
      </Button>

      <Modal
        open={!loadQR}
        onClose={() => setLoadQR(true)}
        aria-labelledby="qr-scanner-modal"
      >
        <Box sx={modalStyle}>
          <Button
            variant="contained"
            onClick={() => setLoadQR(true)}
            color="error"
            sx={{ mb: 2 }}
          >
            Cerrar
          </Button>          
          <Grid container>
            <Scanner
              paused={loadQR}
              components={{ finder: true }}
              allowMultiple={false}
              scanDelay={200}
              styles={{
                container: {
                  width: "100%",                  
                },
              }}
              onScan={(result) => valuate(result)}
            />
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default QRScannerV2;
