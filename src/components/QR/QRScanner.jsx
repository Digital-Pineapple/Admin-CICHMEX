import { Scanner } from "@yudiel/react-qr-scanner"; // Importa el componente Scanner para escanear códigos QR
import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado
import Button from "@mui/material/Button"; // Importa el componente Button de Material-UI
import Grid from '@mui/material/Grid'; // Importa el componente Grid de Material-UI
import Swal from "sweetalert2"; // Importa SweetAlert2 para mostrar alertas
import Card from '@mui/material/Card'; // Importa el componente Card de Material-UI
import CardContent from '@mui/material/CardContent'; // Importa el componente CardContent de Material-UI
import CardActions from '@mui/material/CardActions'; // Importa el componente CardActions de Material-UI

const QRScanner = ( {setValueQR} ) => {
  
  // Estado para controlar si el escáner está activo o no
  const [loadQR, setLoadQR] = useState(true);

  // Función para procesar el resultado del escaneo
  const valuate = (result) => {
  let parsedResult;
  try {
    // Intenta parsear el resultado del QR como JSON
    parsedResult = JSON.parse(result[0].rawValue);
  } catch (error) {
    // Muestra una alerta si el código QR no es válido
    Swal.fire('Error', 'El código escaneado no es válido', 'error');
    return;
  }
  
  // Reactiva el estado del escáner
  setLoadQR(true);

  // Envía el valor parseado al componente padre
  setValueQR(parsedResult);
  };
  

  return (
  <>
    <Card variant="elevation">
    <CardContent>
      {/* Contenedor para el escáner QR, se oculta si loadQR es true */}
      <Grid container display={loadQR ? 'none':'flex'}>
      <Scanner
        paused={loadQR} // Pausa o activa el escáner según el estado
        components={{ finder: true }} // Activa el componente de búsqueda
        allowMultiple={false} // Permite escanear solo un código a la vez
        scanDelay={200} // Retraso entre escaneos
        styles={{
        container: {
          width: "400px", // Define el ancho del contenedor del escáner
        },
        }}
        // Llama a la función valuate cuando se escanea un código
        onScan={(result) => {valuate(result)}}
      />
      </Grid>
    </CardContent>
    <CardActions>
      {/* Botón para activar o desactivar el escáner */}
      {
      loadQR ? (
        <Button
        variant="contained"
        onClick={() => setLoadQR(!loadQR)} // Cambia el estado para activar el escáner
        color="primary"
        >
        Scanear QR
        </Button>
      ) : (
        <Button
        variant="contained"
        onClick={() => setLoadQR(!loadQR)} // Cambia el estado para desactivar el escáner
        color='error'
        sx={{margin:2}}
        >
        Cerrar
        </Button>
      )
      }
    </CardActions>
    </Card>
  </>
  );
};

export default QRScanner; // Exporta el componente QRScanner para su uso en otros archivos
