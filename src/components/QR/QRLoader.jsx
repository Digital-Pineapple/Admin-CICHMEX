import { Scanner } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import Swal from "sweetalert2";

const QRLoader = ({ setValueQR, orderID }) => {
  
  const [loadQR, setLoadQR] = useState(true);
  const valuate = (result) => {
   
    let parsedResult;
    try {
      parsedResult = JSON.parse(result[0].rawValue);
    } catch (error) {
      Swal.fire('Error', 'El código escaneado no es válido', 'error');
      return;
    }
    
    if (orderID !== parsedResult.order) {
      Swal.fire('Código no coincide con orden', '', 'error');
      setLoadQR(true)
      return;
    }
  
    setLoadQR(true);
    
    
    setValueQR(parsedResult);
  };
  

  return (
    <>
    {
      loadQR ? (
         <Button
         fullWidth
        variant="contained"
        onClick={() => setLoadQR(!loadQR)}
        color="primary"
     
      >
        Scanear QR
      </Button>
      ):
      (
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
     
     
      <Grid container display={loadQR ? 'none':'flex'}>
      <Scanner
        paused={loadQR}
        components={{ finder: true }}
        allowMultiple={false}
        scanDelay={200}
        styles={{
          container: {
            maxWidth: "400px",
            margin:'10px'
          },
        }}
        onScan={(result) => {valuate(result)
        }}
      />
        
      </Grid>
    </>
  );
};

export default QRLoader;
