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
  Stack, CardMedia,
  Skeleton, Avatar, IconButton, ButtonGroup, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell,
} from "@mui/material";
import Image from "mui-image";
import { ThumbUp, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import SuccessButton from "../../components/Buttons/SuccessButton";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import ZoomImage from "../../components/cards/ZoomImage";
import RejectedButton from "../../components/Buttons/RejectedButton";

const DetailSale = () => {
  const { id } = useParams();
  const { loadProductOrder, productOrder, navigate, rowsProducts, loading, validateSale, rejectTicket } = useProductOrder();

  useEffect(() => {
    loadProductOrder(id);
  }, [id]);

  function statusPayment (status){
    const availableStatus ={
      'pending': 'pendiente',
      'pending_to_verify':'pendiente por verificar',
      'approved':'pago liquidado'
    }
    const defaultValue = 'Sin estado de pago'
    const value = availableStatus[status] || defaultValue
    return value
  }


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

      <Grid item xs={6}>
        <Card variant="elevation">
          <CardHeader title="Información de la venta" subheader="Cliente" />
          <CardContent>
            <Typography variant="body1" color="initial">
              Nombre: {productOrder?.user_id?.fullname}
            </Typography>
            <Typography variant="body1" color="initial">
              Correo: {productOrder?.user_id?.email}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={5}>
        <Card variant="elevation">
          <CardHeader title="Estatus venta" />
          <CardContent>
            <Typography variant="body1" color="initial">
              {statusPayment(productOrder.payment_status)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Card variant="elevation">
          <CardHeader title="Datos de envio" />
          <CardContent>
            {productOrder.branch ? (
              <Typography variant="body1" color="initial">
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
                Localidad:{productOrder.deliveryLocation?.neighborhood}, <br />
                Calle: {productOrder.deliveryLocation?.street},<br />
                Numero Ext:{productOrder.deliveryLocation?.numExt}, <br />
                Codigo Postal:{productOrder.deliveryLocation?.zipcode}, <br />
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
          {productOrder ? (
            <Grid container display={"flex"} flexDirection={"column"} width={'400px'}>
              <Typography variant="body1" textAlign={"center"} color="inherit">
                Lista de productos
              </Typography>
              <DataGrid
                hideFooterSelectedRowCount={true}
                columns={[
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
                ]}
                rows={rowsProducts()? rowsProducts():''}
              />
            </Grid>
          ) : (
            <Skeleton variant="rectangular" />
          )}

        
      </Grid>
      <Grid item xs={6} >
        {productOrder?.payment_status === "pending_to_verify" &&
        productOrder?.payment.verification.payment_vouchers ? (
          productOrder?.payment.verification.payment_vouchers.map((item, index)=>{
            return(
                <Card key={index} variant="outlined"
                sx={{
                  bgcolor: (theme) => {
                    if (item.status === 'approved') return theme.palette.success.main;
                    if (item.status === 'rejected') return theme.palette.warning.main;
                    return theme.palette.primary.main;  // Use theme's GrayText equivalent
                  }
                }}
                >
                  <CardHeader
                    title={`Referencia: No.${item.reference}`}
                    subheader={`Monto: $ ${item.amount}`}
                  />
                  <CardContent>
                    <ZoomImage
                    src={item.url}
                    alt="Imagen de la referencia"
                    />
                  </CardContent>
                  <CardActions>
                    {
                      item.status === 'pending'? (
                    <ButtonGroup variant="contained" aria-label="Verification Button">
                      <SuccessButton 
                      title={'Autorizar pago'} 
                      text={`Esta seguro de autorizar el ticket con referencia : ${item.reference}`}
                      callbackAction={()=>validateSale({id:productOrder.payment._id, createdAt:item.createdAt}) }
                      textButton={'Autorizar'}
                      />
                      <RejectedButton
                       title={'Rechazar pago'} 
                       text={`Esta seguro de rechazar el ticket con referencia : ${item.reference}`}
                       callbackAction={rejectTicket}
                       values={{id:productOrder.payment._id, createdAt:item.createdAt}}
                       textButton={'Rechazar'}
                       inputLabel={'Motivo de rechazo:'}
                       inputText={'Proporcione los motivos de rechazo'}
                      />
                      
                    </ButtonGroup>

                      ):''
                    }
                  </CardActions>
                </Card>


            )
          })
        ) : (
          "no"
        )}
      </Grid>
    </Grid>
  );
};

export default DetailSale;
