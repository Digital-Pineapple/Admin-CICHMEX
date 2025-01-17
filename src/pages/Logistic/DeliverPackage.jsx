import { useEffect, useState } from "react";
import {
  Grid2,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useParams } from "react-router-dom";
import QRLoader from "../../components/QR/QRLoader";

const DeliverPackage = () => {
  const {
    loadProductOrder,
    productOrder,
    loadVerifyQR,
    navigate,
    loadVerifyQRtoPoint,
  } = useProductOrder();
  const [valuesQr, setvaluesQr] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    loadProductOrder(id);
  }, [id]);
  useEffect(() => {
    if (valuesQr && productOrder.branch) {
      loadVerifyQRtoPoint(valuesQr);
      setvaluesQr(null);
    }
    if (valuesQr && productOrder.deliveryLocation) {
      loadVerifyQR(valuesQr);
      setvaluesQr(null);
    }
  }, [valuesQr, productOrder]);

  return (
    <Grid2
      container
      width={"100%"}
      gap={2}
      display={"flex"}
      justifyContent={"center"}
    >
      <Grid2
        marginTop={{ xs: "-30px" }}
        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Entregar paquete:{productOrder?.order_id}
        </Typography>
      </Grid2>
      <Grid2
        boxSizing={"content-box"}
        minHeight={"60vh"}
        display={"flex"}
        gap={2}
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Grid2 size={{ xs: 12 }} maxWidth={"400px"}>
          <Card variant="elevation">
            <CardContent>
              <Typography variant="h5" color="initial">
                Detalle de entrega:
              </Typography>
              {productOrder.branch ? (
                <Typography variant="body1" color="initial">
                  Sucursal:{productOrder.branch?.name},<br />
                  Estado:{productOrder.branch.location?.state},<br />
                  Municipio:{productOrder.branch.location?.municipality},<br />
                  Dirección;{productOrder.branch.location?.direction},<br />
                  Codigo Postal:{productOrder.branch.location?.cp}
                  <br />
                </Typography>
              ) : (
                <Typography variant="body1" color="initial">
                  Estado:{" "}
                  <strong> {productOrder.deliveryLocation?.state}</strong>
                  <br />
                  Municipio:{" "}
                  <strong>
                    {productOrder.deliveryLocation?.municipality}
                  </strong>{" "}
                  <br />
                  Calle:{" "}
                  <strong>{productOrder.deliveryLocation?.street}</strong>
                  <br />
                  Numero ext:{" "}
                  <strong>{productOrder.deliveryLocation?.numext}</strong>{" "}
                  <br />
                  Codigo Postal:{" "}
                  <strong>{productOrder.deliveryLocation?.zipcode}</strong>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} maxWidth={"400px"}>
          <Card variant="elevation">
            <CardContent>
              <Typography variant="h5" color="initial">
                Destinatario
              </Typography>
              <Typography variant="body1" color="initial">
                Cliente: <strong>{productOrder?.user_id?.fullname}</strong>{" "}
                <br />
                Correo: <strong>{productOrder?.user_id?.email}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12} maxWidth={"400px"}>
          <QRLoader setValueQR={setvaluesQr} orderID={productOrder.order_id} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default DeliverPackage;
