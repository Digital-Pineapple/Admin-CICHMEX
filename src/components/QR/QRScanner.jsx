import { Scanner } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import Swal from "sweetalert2";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

const QRScanner = ( {setValueQR} ) => {
  
  const [loadQR, setLoadQR] = useState(true);
  const valuate = (result) => {
   
    let parsedResult;
    try {
      parsedResult = JSON.parse(result[0].rawValue);
    } catch (error) {
      Swal.fire('Error', 'El código escaneado no es válido', 'error');
      return;
    }
  
    setLoadQR(true);

    setValueQR(parsedResult);
  };
  

  return (
    <>
    <Card variant="elevation"  >
      <CardContent>
      <Grid container display={loadQR ? 'none':'flex'}>
      <Scanner
        paused={loadQR}
        components={{ finder: true }}
        allowMultiple={false}
        scanDelay={200}
        styles={{
          container: {
            width: "400px",

          },

        }}
        onScan={(result) => {valuate(result)
        }}
      />
      </Grid>
        
      
      </CardContent>
      <CardActions>
      {
      loadQR ? (
         <Button
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

export default QRScanner;