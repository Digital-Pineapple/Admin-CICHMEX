import { Scanner } from "@yudiel/react-qr-scanner"; // Componente para escanear códigos QR
import React, { useState } from "react";
import Button from "@mui/material/Button"; // Botón de Material-UI
import Grid from '@mui/material/Grid'; // Contenedor de cuadrícula de Material-UI
import Swal from "sweetalert2"; // Biblioteca para mostrar alertas personalizadas

const QRLoader = ({ setValueQR, orderID }) => {
  
  // Estado para controlar si el escáner está activo o no
  const [loadQR, setLoadQR] = useState(true);

  // Función para procesar el resultado del escaneo
  const valuate = (result) => {
  let parsedResult;
  try {
    // Intenta parsear el resultado del código QR como JSON
    parsedResult = JSON.parse(result[0].rawValue);
  } catch (error) {
    // Muestra una alerta si el código QR no es válido
    Swal.fire('Error', 'El código escaneado no es válido', 'error');
    return;
  }
  
  // Verifica si el código QR coincide con el ID de la orden
  if (orderID !== parsedResult.order) {
    Swal.fire('Código no coincide con orden', '', 'error');
    setLoadQR(true); // Reactiva el botón de escaneo
    return;
  }
  
  setLoadQR(true); // Reactiva el botón de escaneo
  setValueQR(parsedResult); // Actualiza el valor del QR escaneado
  };
  

  return (
  <>
    {
    loadQR ? (
      // Botón para iniciar el escaneo del código QR
      <Button
      fullWidth
      variant="contained"
      onClick={() => setLoadQR(!loadQR)}
      color="primary"
      >
      Scanear QR
      </Button>
    ) : (
      // Botón para cerrar el escáner
      <Button
      variant="contained"
      onClick={() => setLoadQR(!loadQR)}
      color='error'
      fullWidth
      >
      Cerrar
      </Button>
    )
    }
   
    {/* Contenedor para el escáner QR, visible solo cuando loadQR es false */}
    <Grid container display={loadQR ? 'none':'flex'}>
    <Scanner
      paused={loadQR} // Pausa el escáner si loadQR es true
      components={{ finder: true }} // Activa el componente de localización del QR
      allowMultiple={false} // No permite escanear múltiples códigos QR
      scanDelay={200} // Intervalo entre escaneos
      styles={{
      container: {
        maxWidth: "400px", // Ancho máximo del contenedor
        margin:'10px' // Espaciado alrededor del contenedor
      },
      }}
      // Llama a la función valuate cuando se escanea un código QR
      onScan={(result) => {valuate(result)}}
    />
    </Grid>
  </>
  );
};

export default QRLoader;
