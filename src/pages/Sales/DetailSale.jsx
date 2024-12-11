import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Box,
  Stack,
  CardMedia,
  Skeleton,
  Avatar,
  IconButton,
  ButtonGroup,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import Image from "mui-image";
import { ArrowBack, FileDownload, Refresh, ThumbUp, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import SuccessButton from "../../components/Buttons/SuccessButton";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import ZoomImage from "../../components/cards/ZoomImage";
import RejectedButton from "../../components/Buttons/RejectedButton";

const DetailSale = () => {
  const { id } = useParams();
  const {
    loadProductOrder,
    productOrder,
    navigate,
    rowsProducts,
    loading,
    validateSale,
    rejectTicket,
  } = useProductOrder();

  useEffect(() => {
    loadProductOrder(id);
  }, [id]);


  function statusPayment(status) {;
    
    const availableStatus = {
      pending: "Pendiente",
      pending_to_verify: "Pendiente por verificar",
      approved: "Pago liquidado",
      rejected: 'Pago rechazado',
      cancelled :'Pado cancelado o expirado'
    };
    const defaultValue = "Sin estado de pago";
    const value = availableStatus[status] || defaultValue;
    return value;
  }

  const handleButtonClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid container gap={2}>
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Venta:{productOrder?.order_id}
        </Typography>
      </Grid>

      <Grid container spacing={1}>
      
          <Grid
            item
            xs={12}
            sx={{
              bgcolor: (theme) => {
                if (productOrder.payment_status === "approved")
                  return theme.palette.success.main;
                if (productOrder.payment_status === "rejected")
                  return theme.palette.warning.main;
                return theme.palette.text.disabled; // Use theme's GrayText equivalent
              },
              color: (theme) => {
                if (productOrder.payment_status === "approved")
                  return theme.palette.success.contrastText;
                if (productOrder.payment_status === "rejected")
                  return theme.palette.warning.contrastText;
                return theme.palette.primary.contrastText; // Use theme's GrayText equivalent
              },
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CardContent>
              <Typography variant="body1" fontWeight={'Bold'} color="inherit">
                {statusPayment(productOrder.payment_status)}
              </Typography>
              <Typography variant="body1" color="initial">
              <strong>Descuento:</strong>{productOrder?.discount} <br />
              <strong>Costo de envio:</strong>{productOrder?.shipping_cost} <br />
              <strong>Subtotal:</strong>{productOrder?.subTotal} <br />
              <strong>Total:</strong>{productOrder?.total} <br />

              </Typography>
             
            </CardContent>
          </Grid>
        <Grid item xs={12} display={'flex'}  justifyContent={'space-between'}>
        <Button
                title="Regresar"
                startIcon={<ArrowBack />}
                onClick={() => navigate(`/contaduria/Todas mis ventas`, {replace:true})}
                variant="contained"
                color="primary"
              >
                Regresar
              </Button> 
              <Button
                title="Recargar"
                endIcon={<Refresh />}
                onClick={() => loadProductOrder(id)}
                variant="contained"
                color="primary"
              >
                Recarga
              </Button> 
         {productOrder.download_ticket?(
          <Button
          sx={{marginX:2}}
            variant="contained"
            color="primary"
            startIcon={<FileDownload/>}
            onClick={()=>handleButtonClick(productOrder.download_ticket) }
          >
            Descargar ticket
          </Button>
         ):null}
        </Grid>

        <Grid item xs={12} md={6}>
          {productOrder ? (
            <Grid
              container
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              height={"100%"}
            >
              <Typography variant="body1" textAlign={"center"} color="inherit">
                Lista de productos
              </Typography>
              <DataGrid
                hideFooterSelectedRowCount={true}
                columns={[
                  {
                    field: "images",
                    headerName: "imagen",
                    flex: 1,
                    align: "center",
                    renderCell: (params) =>
                      params.row.images ? (
                        <Avatar src={params.row.images[0]?.url} />
                      ) : (
                        "No hay imagen"
                      ),
                  },
                  {
                    field: "name",
                    headerName: "Nombre del producto",
                    flex: 1,
                    align: "center",
                  },
                  {
                    field: "price",
                    headerName: "Precio",
                    flex: 1,
                    align: "center",
                  },
                  {
                    field: "quantity",
                    headerName: "Cantidad",
                    flex: 1,
                    align: "center",
                  },
                  {
                    field: "subTotal",
                    headerName: "SubTotal",
                    flex: 1,
                    align: "center",
                  },
                ]}
                rows={rowsProducts() ? rowsProducts() : ""}
              />
            </Grid>
          ) : (
            <Skeleton variant="rectangular" />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="elevation">
            <CardHeader title="Información" />
            <CardContent>
              <strong>Cliente: </strong> <br />
              <Typography variant="body1" fontSize={"12px"} color="initial">
                Nombre: {productOrder?.user_id?.fullname} <br />
                Correo: {productOrder?.user_id?.email}
              </Typography>
              <br />
              <strong>Direccion de envío:</strong>
              <br />
              {productOrder.branch ? (
                <Typography variant="body1" fontSize={"12px"} color="initial">
                  Sucursal:{productOrder.branch?.name},<br />
                  Estado:{productOrder.branch.location?.state},<br />
                  Municipio:{productOrder.branch.location?.municipality},<br />
                  Localidad:{productOrder.branch.location?.neighborhood}, <br />
                  Dirección:{productOrder.branch.location?.direction},<br />
                  Codigo Postal:{productOrder.branch.location?.cp}
                  <br />
                  Telefono : {productOrder.branch.phone_number}
                </Typography>
              ) : (
                <Typography variant="body1" color="initial">
                  Estado:{productOrder.deliveryLocation?.state},<br />
                  Municipio:{productOrder.deliveryLocation?.municipality},<br />
                  Localidad:{productOrder.deliveryLocation?.neighborhood},{" "}
                  <br />
                  Calle: {productOrder.deliveryLocation?.street},<br />
                  Numero Ext:{productOrder.deliveryLocation?.numExt}, <br />
                  Codigo Postal:{productOrder.deliveryLocation?.zipcode}, <br />
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"} gap={1}>
        {productOrder?.payment?.verification?.payment_vouchers
          ? productOrder?.payment.verification.payment_vouchers.map(
              (item, index) => {
                return (
                  <Grid key={index} item xs={12} lg={5.9} xl={3.9}>
                    <Card
                      key={index}
                      variant="outlined"
                      sx={{
                        bgcolor: (theme) => {
                          if (item.status === "approved")
                            return theme.palette.success.main;
                          if (item.status === "rejected")
                            return theme.palette.warning.main;
                          return theme.palette.text.disabled; // Use theme's GrayText equivalent
                        },
                        color: (theme) => {
                          if (item.status === "approved")
                            return theme.palette.success.contrastText;
                          if (item.status === "rejected")
                            return theme.palette.warning.contrastText;
                          return theme.palette.text.disabled; // Use theme's GrayText equivalent
                        },
                        height: "100%",
                      }}
                    >
                      <CardHeader title={`Referencia: No.${item.reference}`} />
                      <Typography
                        variant="body1"
                        textAlign={"center"}
                        color="inherit"
                      >
                        {" "}
                        Monto: ${item?.amount}
                      </Typography>
                      <CardContent>
                        <ZoomImage
                          src={item.url}
                          alt="Imagen de la referencia"
                        />
                      </CardContent>
                      <Typography
                        variant="body1"
                        color="#fff"
                        textAlign={"center"}
                      >
                        {item?.notes
                          ? `Motivo del rechazo:${item.notes}`
                          : null}
                      </Typography>
                      <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {item.status === "pending" ? (
                          <ButtonGroup
                            variant="contained"
                            aria-label="Verification Button"
                          >
                            <SuccessButton
                              title={"Autorizar pago"}
                              text={`Esta seguro de autorizar el ticket con referencia : ${item.reference}`}
                              callbackAction={() =>
                                validateSale({
                                  id: productOrder.payment._id,
                                  createdAt: item.createdAt,
                                })
                              }
                              textButton={"Autorizar"}
                            />
                            <RejectedButton
                              title={"Rechazar pago"}
                              text={`Esta seguro de rechazar el ticket con referencia : ${item.reference}`}
                              callbackAction={rejectTicket}
                              values={{
                                id: productOrder.payment._id,
                                createdAt: item.createdAt,
                              }}
                              textButton={"Rechazar"}
                              inputLabel={"Motivo de rechazo:"}
                              inputText={"Proporcione los motivos de rechazo"}
                            />
                          </ButtonGroup>
                        ) : (
                          ""
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              }
            )
          : ""}
      </Grid>
    </Grid>
  );
};

export default DetailSale;
