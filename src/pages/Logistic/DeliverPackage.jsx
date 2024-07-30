
import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useParams } from "react-router-dom";
import QRLoader from "../../components/QR/QRLoader";

const DeliverPackage = () => {
  const { loadProductOrder, productOrder, loadVerifyQR, navigate, loadVerifyQRtoPoint } = useProductOrder();
  const [valuesQr, setvaluesQr] = useState(null)

  const { id } = useParams()
  useEffect(() => {
    loadProductOrder(id)
  }, [id]);
useEffect(() => {
  if (valuesQr && productOrder.branch) {
  
   loadVerifyQRtoPoint(valuesQr)
    setvaluesQr(null)
  }
  if (valuesQr && productOrder.deliveryLocation) {
   
     loadVerifyQR(valuesQr)
    setvaluesQr(null)
  }
}, [valuesQr, productOrder])


  return (
    <Grid container gap={2}>
      <Grid item marginTop={{ xs: "-30px" }} xs={12} minHeight={"100px"} className="Titles">
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Entregar paquete:{productOrder?.order_id}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h5" color="initial">Detalle de entrega:</Typography>
        {
            productOrder.branch ? (
                <Typography variant="body1" color="initial">
                    Sucursal:{productOrder.branch?.name},<br />
                    Estado:{productOrder.branch.location?.state},<br />
                    Municipio:{productOrder.branch.location?.municipality},<br />
                    Dirección;{productOrder.branch.location?.direction},<br />
                    Codigo Postal:{productOrder.branch.location?.cp}<br />
                </Typography>
            ):(
                
          
                <Typography variant="body1" color="initial">
                Estado:{productOrder.deliveryLocation?.state},
                Municipio:{productOrder.deliveryLocation?.municipality},
                Dirección;{productOrder.deliveryLocation?.direction},
                Codigo Postal:{productOrder.deliveryLocation?.cp}
            </Typography>
            )
        }

      </Grid>
      <Grid item xs={12} md={5}>
        <Typography variant="h5" color="initial">Destinatario</Typography>
        <Typography variant="body1" color="initial">Cliente:{productOrder?.user_id?.fullname}</Typography>
        
      </Grid>
      <Grid item xs={12}>
        <QRLoader setValueQR={setvaluesQr} orderID={productOrder.order_id} />
      </Grid>

    </Grid>
  );
};

export default DeliverPackage