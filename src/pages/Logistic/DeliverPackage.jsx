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
  // Hook personalizado para manejar las órdenes de productos
  const {
    loadProductOrder, // Carga la información de una orden de producto específica
    productOrder, // Contiene los datos de la orden de producto actual
    loadVerifyQR, // Verifica el código QR para la ubicación de entrega
    navigate, // Navegación entre rutas
    loadVerifyQRtoPoint, // Verifica el código QR para la sucursal
  } = useProductOrder();

  // Estado para almacenar temporalmente el valor del código QR escaneado
  const [valuesQr, setvaluesQr] = useState(null);

  // Obtiene el parámetro `id` de la URL
  const { id } = useParams();

  // Efecto para cargar la información de la orden de producto al montar el componente
  useEffect(() => {
    loadProductOrder(id);
  }, [id]);

  // Efecto para manejar la verificación del código QR dependiendo de la ubicación de entrega
  useEffect(() => {
    if (valuesQr && productOrder.branch) {
      loadVerifyQRtoPoint(valuesQr); // Verifica el QR para la sucursal
      setvaluesQr(null); // Limpia el estado del QR
    }
    if (valuesQr && productOrder.deliveryLocation) {
      loadVerifyQR(valuesQr); // Verifica el QR para la ubicación de entrega
      setvaluesQr(null); // Limpia el estado del QR
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
      {/* Título principal del componente */}
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

      {/* Contenedor principal para mostrar la información */}
      <Grid2
        boxSizing={"content-box"}
        minHeight={"60vh"}
        display={"flex"}
        gap={2}
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        {/* Tarjeta con los detalles de la entrega */}
        <Grid2 size={{ xs: 12 }} maxWidth={"400px"}>
          <Card variant="elevation">
            <CardContent>
              <Typography variant="h5" color="initial">
                Detalle de entrega:
              </Typography>
              {productOrder.branch ? (
                // Información de la sucursal si aplica
                <Typography variant="body1" color="initial">
                  Sucursal:{productOrder.branch?.name},<br />
                  Estado:{productOrder.branch.location?.state},<br />
                  Municipio:{productOrder.branch.location?.municipality},<br />
                  Dirección;{productOrder.branch.location?.direction},<br />
                  Codigo Postal:{productOrder.branch.location?.cp}
                  <br />
                </Typography>
              ) : (
                // Información de la ubicación de entrega si aplica
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

        {/* Tarjeta con los datos del destinatario */}
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

        {/* Componente para cargar y escanear el código QR */}
        <Grid2 size={12} maxWidth={"400px"}>
          <QRLoader setValueQR={setvaluesQr} orderID={productOrder.order_id} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default DeliverPackage;
