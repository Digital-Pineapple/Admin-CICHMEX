import React, { useState, useCallback } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Modal, Box, Typography } from "@mui/material";
import Swal from "sweetalert2";
import QrCodeIcon from "@mui/icons-material/QrCode";

// Componente principal QRScannerV2
// Props:
// - setValueQR: función para enviar el valor escaneado al componente padre
// - label: texto del botón para abrir el escáner (por defecto "Escanear QR")
// - title: título que se muestra en el modal
const QRScannerV2 = ({ setValueQR, label = "Escanear QR", title = "" }) => {
  // Estado para controlar si el modal está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar el resultado del escaneo
  const handleScan = useCallback(
    (result) => {
      // Verifica si el resultado contiene un valor válido
      if (!result?.[0]?.rawValue) return;

      try {
        // Intenta parsear el resultado como JSON
        const parsedResult = JSON.parse(result[0].rawValue);
        setValueQR(parsedResult); // Enviar el valor al componente padre
        setIsOpen(false); // Cerrar el modal
      } catch (error) {
        // Mostrar un mensaje de error si el código no es válido
        Swal.fire("Error", "El código escaneado no es válido", "error");
      }
    },
    [setValueQR]
  );

  return (
    <>
      {/* Botón para abrir el modal del escáner */}
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

      {/* Modal que contiene el escáner QR */}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)} // Cierra el modal al hacer clic fuera
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
          {/* Título del modal */}
          <Typography textAlign={"center"} variant="h5">
            {title}
          </Typography>

          {/* Botón para cerrar el modal */}
          <Button
            variant="contained"
            onClick={() => setIsOpen(false)}
            color="error"
            sx={{ mb: 2 }}
          >
            Cerrar
          </Button>

          {/* Contenedor del escáner QR */}
          <Box padding={4}>
            <Scanner
              paused={!isOpen} // Pausa el escáner si el modal está cerrado
              allowMultiple={false} // No permite escanear múltiples códigos
              components={{ finder: true }} // Muestra el componente de búsqueda
              scanDelay={200} // Tiempo de espera entre escaneos
              onScan={handleScan} // Llama a la función handleScan al escanear
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default QRScannerV2;
