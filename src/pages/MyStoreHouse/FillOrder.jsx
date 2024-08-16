import { Grid, Skeleton, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { DataGrid } from "@mui/x-data-grid";
import { replace } from "formik";
import { QRCodeSVG } from "qrcode.react";
import { localDate } from "../../Utils/ConvertIsoDate";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";

const FillOrder = () => {
  const { id } = useParams();
  const {
    loadProductOrder,
    productOrder,
    rowsProducts,
    completeProductOrder,
    loadPrintPDFOrder,
    loading
  } = useProductOrder();
  const [rowSelection, setRowSelection] = useState([]);
  const [activeButton1, setActiveButton] = useState(false);
  useEffect(() => {
    loadProductOrder(id);
  }, [id]);
  const rows = rowsProducts();
  function activeButton(i) {
    const a1 = rows.length;
    if (a1 === i) {
      setActiveButton(true);
    }
    if (a1 !== i) {
      setActiveButton(false);
    }
  }

  const completeOrder = () => {
    completeProductOrder(id);
  };
  const printPDF = (id) => {
    loadPrintPDFOrder(id);
  };
  const status = (value) => {
    if (value === "approved") {
      return "aprobado";
    } else if (value === "pending") {
      return "pendiente";
    } else if (value === "rejected") {
      return "rechazado";
    }
    return "desconocido"; // Valor por defecto
  };

  const typeDelivery = (value) => {
    return value.deliveryLocation ? "Entrega a domicilio" : "Punto de entrega";
  };
  const deliveryLocation = (data) => {
    if (data.deliveryLocation) {
        return [
            `Código Postal: ${data.deliveryLocation?.cp}`,
            `Estado: ${data.deliveryLocation?.state}`,
            `Municipio: ${data.deliveryLocation?.municipality}`,
            `Dirección: ${data.deliveryLocation?.direction}`,
            `Referencia: ${data.deliveryLocation?.reference ? data.deliveryLocation.reference : 'Sin información'}`,
            `Destinatario: ${data.deliveryLocation?.receiver ? data.deliveryLocation.receiver : 'Sin información' }`
        ];
    } else {
        return [
            `Código Postal: ${data.branch?.location?.cp}`,
            `Estado: ${data.branch?.location?.state}`,
            `Municipio: ${data.branch?.location?.municipality}`,
            `Dirección: ${data.branch?.location?.direction}`
        ];
    }
};
if (loading) {
  return(<LoadingScreenBlue/>)
}
  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h2"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Surtir orden: {productOrder?.order_id}
        </Typography>
      </Grid>
      <Grid container padding={2} alignContent={"center"}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => printPDF(id)}
            color="secondary"
          >
            imprimir PDF
          </Button>
        </Grid>
        <Grid item xs={6}>
          <QRCodeSVG value={productOrder?.order_id} />
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" color="inherit">
            Cliente:{productOrder.user_id?.fullname}
          </Typography>
          <Typography variant="h6" color="inherit">
            Fecha de compra:{localDate(productOrder.createdAt)}
          </Typography>
        <Typography variant="h6" color="inherit">
            Estado de pago:{status(productOrder.payment_status)}
          </Typography>
          <Typography variant="h6" color="inherit">
            tipo de envio: {typeDelivery(productOrder)}
          </Typography>
          <Typography variant="body1" color="inherit">
            Dirección:
            <br />
            {deliveryLocation(productOrder).map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </Typography>
         
        </Grid>

        <Grid item xs={12}>
          {rows ? (
            <Grid container display={"flex"} flexDirection={"column"}>
              <Typography variant="body1" textAlign={"center"} color="inherit">
                Lista de productos
              </Typography>
              <DataGrid
                onRowSelectionModelChange={(value) => {
                  setRowSelection(value);
                  activeButton(value.length);
                }}
                rowSelectionModel={rowSelection}
                hideFooterSelectedRowCount={true}
                columns={[
                  {
                    field: "name",
                    headerName: "Nombre del producto",
                    flex: 1,
                    align: "center",
                  },
                  {
                    field: "quantity",
                    headerName: "Cantidad de producto",
                    flex: 1,
                    align: "center",
                  },
                ]}
                rows={rows}
              />
            </Grid>
          ) : (
            <Skeleton variant="rectangular" />
          )}

          <Button
            style={{ marginTop: 10 }}
            variant="contained"
            fullWidth
            onClick={() => completeOrder()}
            color="primary"
          >
            Completar surtido
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FillOrder;
