import { Grid, Skeleton, Button, Typography, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { DataGrid } from "@mui/x-data-grid";
import { replace } from "formik";
import { QRCodeSVG } from "qrcode.react";
import { localDate } from "../../Utils/ConvertIsoDate";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";

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
  console.log(productOrder,'ds');
  
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
      <Grid container padding={2} gap={4} justifyContent={'center'} alignContent={"center"}>
        <Grid item xs={5} sx={{textAlign:'center', marginTop:2}} >
         <QRCodeSVG style={{maxWidth:'200px', maxHeight:'200px', width:'100%', height:'100%'}} value={productOrder?.order_id} />
       <br />
        <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => printPDF(id)}
            color="success"
          >
            imprimir PDF
          </Button>
        </Grid>

        <Grid item xs={12} sm={5}>
        <Card variant="outlined">
          <CardContent>
            {productOrder.branch ? (
              <>
                <Typography variant="h5">Sucursal de Entrega:</Typography>

                <Typography>
                  Nombre de la sucursal: {productOrder?.branch?.name}
                </Typography>
                <Typography>
                  Estado: {productOrder?.branch?.location?.state}
                </Typography>
                <Typography>
                  Municipio: {productOrder?.branch?.location?.municipality}
                </Typography>
                <Typography>
                  Dirección: {productOrder?.branch?.location?.direction}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h5">Dirección de entrega:</Typography>
                <Typography fontSize={"14px"}>
                  Código Postal:{" "}
                  <strong>{productOrder?.deliveryLocation?.zipcode}</strong>
                  <br />
                  Estado:{" "}
                  <strong>{productOrder?.deliveryLocation?.state}</strong>
                  <br />
                  Municipio:{" "}
                  <strong>
                    {productOrder?.deliveryLocation?.municipality}
                  </strong>
                  <br />
                  Localidad:{" "}
                  <strong>
                    {productOrder?.deliveryLocation?.neighborhood}
                  </strong>
                  <br />
                  Calle:{" "}
                  <strong>{productOrder?.deliveryLocation?.street}</strong>
                  <br />
                  No Ext: <strong>{productOrder?.deliveryLocation?.numext}</strong>
                  <br />
                  {productOrder?.deliveryLocation?.numint
                    ? `No Int: ${productOrder?.deliveryLocation?.numint}`
                    : ""}
                  <br />
                  {productOrder?.deliveryLocation?.reference
                    ? `Entre Calles: ${productOrder?.deliveryLocation?.reference}`
                    : ""}
                    <br />
                    {productOrder?.deliveryLocation?.btwstreet
                    ? `Referencia: ${productOrder?.deliveryLocation?.btwstreet}`
                    : ""}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

        <Grid item xs={12}>
          {rows ? (
            <Grid container display={"flex"} flexDirection={"column"}>
              <Typography variant="h4" textAlign={"center"} color="inherit">
                Lista de productos
              </Typography>
              <DataGrid
              sx={{'& .theme--hedaer': {
          backgroundColor: 'black',
          color:"white",
          textAlign:'center'
        },}}
                onRowSelectionModelChange={(value) => {
                  setRowSelection(value);
                  activeButton(value.length);
                }}
                rowSelectionModel={rowSelection}
                hideFooterSelectedRowCount={true}
                slots={{
                  noRowsOverlay: CustomNoRows
                }}
                autoHeight
                columns={[
                  {
                    field: "name",
                    headerName: "Nombre del producto",
                    headerClassName:'theme--hedaer',
                    flex: 1,
                    align: "center",
                  },
                  {
                    field: "quantity",
                    headerName: "Cantidad de producto",
                    headerClassName:'theme--hedaer',
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
            variant="outlined"
            fullWidth
            onClick={() => completeOrder()}
            color="success"
          >
            Completar surtido
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FillOrder;
