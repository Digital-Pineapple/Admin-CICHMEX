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

const DetailSale = () => {
  const { id } = useParams();
  const { loadProductOrder, productOrder, navigate, rowsProducts, loading, validateSale } = useProductOrder();
  const [display, setDisplay] = useState("none");
  const divRef = useRef();
  useEffect(() => {
    loadProductOrder(id);
  }, [id]);
  const statusPayment = (value) => {
    if (value.payment_status === "pending" && value.verification) {
      return "Liquidado pendiente por validar";
    }
    if (value.payment_status === "pending") {
      return "No liquidado";
    } else {
      return "Pagado";
    }
  };
  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
  });
  const onMouseMove = (event) => {
    if (!divRef.current) return;
    const { offsetWidth, offsetHeight } = divRef.current;
    setDisplay("block");
    // Calcula la posición del cursor en porcentaje
    let pointer = {
      x: (event.nativeEvent.offsetX * 100) / offsetWidth,
      y: (event.nativeEvent.offsetY * 100) / offsetHeight,
    };
    setPointer(pointer);
  };
  

  const onMouseLeave = () => {
    setDisplay("none");
    setPointer({ x: 0, y: 0 });
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
              {statusPayment(productOrder)}
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
                // onRowSelectionModelChange={(value) => {
                //   setRowSelection(value);
                //   activeButton(value.length);
                // }}
                // rowSelectionModel={rowSelection}
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
        {productOrder?.payment_status === "pending" &&
        productOrder?.verification ? (
          <>
            <Card sx={{display:'flex', flexDirection:'column', alignItems:'center'}} >
           <CardHeader
             title="Detalle de de pago"
             subheader={`Pedido:${productOrder.order_id}`}
           />
            <div
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                ref={divRef}
                className="zoom"
                style={{
                  "--url": `url(${productOrder.verification?.photo_proof})`,
                  "--display": display,
                  "--zoom-x": `${pointer.x}%`,
                  "--zoom-y": `${pointer.y}%`,
                  maxWidth:'500px'
                }}
              >
                <CardMedia 
                component={'img'}
              src={productOrder.verification?.photo_proof}
                title="Imagen ticket" 
                />
                </div>
                <CardContent>
                <Typography variant="h6" color="inherit">
                Referencia: {productOrder.verification?.verification_reference}, <br />
                Total a pagar: ${productOrder.total}
              </Typography>
                </CardContent>
                <CardActions >
                    <ButtonGroup fullWidth  variant="contained" color="primary" aria-label="">
                    <Button
                variant="text"
                color="primary"
                size="small"
                onClick={() => navigate('/auth/validar-ventas',{replace:true})}
              >
                Regresar
              </Button>
              <SuccessButton
        text={'Autorizar'}
        title={`¿Desea autorizar la venta: ${productOrder.order_id}?`}
        titleConfirm={'Se esta a autorizando la venta'}
        callbackAction={()=>validateSale(productOrder.order_id)}
        />
                      
                    </ButtonGroup>
              
            </CardActions>
            </Card>
          </>
        ) : (
          "no"
        )}
      </Grid>
    </Grid>
  );
};

export default DetailSale;
