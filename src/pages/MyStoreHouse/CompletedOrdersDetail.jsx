import { Grid, Skeleton, Button, Typography, Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { DataGrid } from "@mui/x-data-grid";
import { replace } from "formik";
import { QRCodeSVG } from "qrcode.react";
import { localDate } from "../../Utils/ConvertIsoDate";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import Image from "mui-image";
import { ArrowBack } from "@mui/icons-material";

const CompletedOrdersDetail = () => {
  const { id } = useParams();
  const {
    loadProductOrder,
    productOrder,
    rowsProducts,
    completeProductOrder,
    loadPrintPDFOrder,
    loading,
    navigate
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
    loadPrintPDFOrder(id)
  };
  const status = (value) => {
    if (value === "approved") {
      return "Aprobado";
    } else if (value === "pending") {
      return "Pendiente";
    } else if (value === "rejected") {
      return "Rechazado";
    }
    return "Desconocido"; // Valor por defecto
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
        `Referencia: ${
          data.deliveryLocation?.reference
            ? data.deliveryLocation.reference
            : "Sin información"
        }`,
        `Destinatario: ${
          data.deliveryLocation?.receiver
            ? data.deliveryLocation.receiver
            : "Sin información"
        }`,
      ];
    } else {
      return [
        `Código Postal: ${data.branch?.location?.cp}`,
        `Estado: ${data.branch?.location?.state}`,
        `Municipio: ${data.branch?.location?.municipality}`,
        `Dirección: ${data.branch?.location?.direction}`,
      ];
    }
  };
  const supplyInfo = {
    responsible : productOrder?.supply_detail?.user?.fullname ,
    email:productOrder?.supply_detail?.user?.email,
    date : localDate( productOrder?.supply_detail?.date)
  }
  if (loading) {
    return <LoadingScreenBlue />;
  }
  return (
    <Grid container>
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
          Detalle de surtido: {productOrder?.order_id}
        </Typography>
      </Grid>
      <Grid container  alignContent={"center"}>
        <Grid item display={'flex'} justifyContent={'space-between'} padding={2} xs={12}>
        <Button
            variant="contained"
            size="small"
            startIcon={<ArrowBack/>}
            onClick={() => navigate(`/almacenista/mis-ventas`)}
            color="primary"
          >
            Regresar
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => printPDF(id)}
            color="secondary"
          >
            Imprimir PDF
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          alignContent={"center"}
          justifyContent={"center"}
          display={'flex'}
          padding={2}
        >
          <QRCodeSVG
            width={"200px"}
            height={"200px"}
            value={productOrder?.order_id}
          />
        </Grid>
        <Grid item xs={12} lg={4} padding={2}>
          <Typography variant="body1" color="inherit">
            <strong>Cliente:</strong> {productOrder.user_id?.fullname} <br />
            <strong>Fecha de compra:</strong>
            {localDate(productOrder.createdAt)} <br />
            <strong>Estado de pago:</strong>
            {status(productOrder.payment_status)} <br />
            <strong>Tipo de envio:</strong>
            {typeDelivery(productOrder)} <br />
            <strong> Dirección:</strong>
            <br />
            {deliveryLocation(productOrder).map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={5} padding={2}>
          <Typography variant="body1" color="inherit">
            <strong>Responsable de surtido:</strong> {supplyInfo.responsible} <br />
            <strong>Email:</strong>
            {supplyInfo.email} <br />
            <strong>Fecha de surtido:{supplyInfo.date}</strong>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {rows ? (
            <Grid container display={"flex"} flexDirection={"column"}>
              <Typography variant="body1" textAlign={"center"} color="inherit">
                <strong><i>Lista de productos</i> </strong>
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
                    field: "image",
                    headerName: "Imagen",
                    flex: 1,
                    align: "center",
                    headerAlign:'center',
                    renderCell : (params)=>(
                      <Box width={'100%'} height={'100%'} display={'flex'} padding={0.5} justifyContent={'center'}>
                      <Avatar src={params.row.image}  alt={params.row.name} >
                      </Avatar>
                      </Box>
                    )
                  },
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

        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompletedOrdersDetail;
