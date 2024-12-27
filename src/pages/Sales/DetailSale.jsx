import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import {
  Grid2,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Box,
  Skeleton,
  ButtonGroup,
  Modal,
  Fab,
  IconButton,
} from "@mui/material";
import {
  Close,
  FileDownload,
  OpenInFull,
  Refresh,
  Search,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import SuccessButton from "../../components/Buttons/SuccessButton";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import ZoomImage from "../../components/cards/ZoomImage";
import RejectedButton from "../../components/Buttons/RejectedButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #bbdefb",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  boxShadow: 24,
  maxWidth: "700px",
  maxHeigth: "700px",
  p: 4,
};

const DetailSale = () => {
  const { id } = useParams();
  const {
    loadProductOrder,
    productOrder,
    navigate,
    loadPrintPDFOrder,
    rowsProducts,
    loading,
    validateSale,
    rejectTicket,
  } = useProductOrder();
  const [open, setOpen] = useState({ images: [], value: false });
  const [openImageTicket, setOpenImageTicket] = useState({
    selected:{},
    value: false,
  });
  
  const callBackPO = useCallback(() => loadProductOrder(id), [id]);
  useEffect(() => {
    callBackPO();
  }, [callBackPO]);

  function statusPayment(status) {
    const availableStatus = {
      pending: "Pendiente",
      pending_to_verify: "Pendiente por verificar",
      approved: "Pago liquidado",
      rejected: "Pago rechazado",
      cancelled: "Pado cancelado o expirado",
    };
    const defaultValue = "Sin estado de pago";
    const value = availableStatus[status] || defaultValue;
    return value;
  }

  const handleButtonClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleOpen = (images) => {
    let UrlImages = images?.map((i) => i.url);
    setOpen({ value: true, images: UrlImages });
  };
  const handleOpenImageTicket = (item) => {
    setOpenImageTicket({ value: true, selected: item });
  };
  const handleClose = () => setOpen({ value: false, images: [] });
  const handleCloseImageTicket = () => setOpenImageTicket({ value: false, item: {} });

  const printPDF = (id) => {
    loadPrintPDFOrder(id);
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container gap={2}>
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
          Venta:{productOrder?.order_id}
        </Typography>
      </Grid2>

      <Grid2 size={12} display={"flex"} justifyContent={"space-around"}>
        {productOrder?.payment?.payment_status === "approved" ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownload />}
            onClick={()=>printPDF(id)}
          >
            Descargar pdf
          </Button>
        ) : (
          ""
        )}
        <Button
          endIcon={<Refresh />}
          onClick={() => loadProductOrder(id)}
          variant="contained"
          color="primary"
        >
          Recarga
        </Button>

        {productOrder.download_ticket ? (
          <Button
            sx={{ marginX: 2 }}
            variant="contained"
            color="primary"
            startIcon={<FileDownload />}
            onClick={() => handleButtonClick(productOrder.download_ticket)}
          >
            Descargar ticket
          </Button>
        ) : null}
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 5 }}
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
          borderRadius: "10px",
        }}
        padding={2}
      >
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
                Localidad:{productOrder.deliveryLocation?.neighborhood}, <br />
                Calle: {productOrder.deliveryLocation?.street},<br />
                Numero Ext:{productOrder.deliveryLocation?.numExt}, <br />
                Codigo Postal:{productOrder.deliveryLocation?.zipcode}, <br />
              </Typography>
            )}
          </CardContent>
        </Card>
        <CardContent>
          <Typography variant="body1" fontWeight={"Bold"} color="inherit">
            {statusPayment(productOrder.payment_status)}
          </Typography>
          <Typography variant="body1">
            <strong>Descuento:</strong>
            {productOrder?.discount}% <br />
            <strong>Costo de envio:</strong>${productOrder?.shipping_cost}{" "}
            <br />
            <strong>Subtotal:</strong>${productOrder?.subTotal} <br />
            <strong>Total:</strong>${productOrder?.total} <br />
          </Typography>
        </CardContent>
      </Grid2>

      <Grid2 height={"100%"} size={{ xs: 12, md: 6 }}>
        {productOrder ? (
          <>
            <Typography
              variant="h3"
              fontSize={"18px"}
              textAlign={"center"}
              color="inherit"
            >
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
                  renderCell: (params) => (
                    <Box
                      component={"span"}
                      alignContent={"center"}
                      onClick={() => handleOpen(params.row.images)}
                      width={"100%"}
                      height={"100%"}
                      display={"flex"}
                      padding={0.5}
                      justifyContent={"center"}
                    >
                      <img
                        src={params.row.image}
                        alt={params.row.name}
                        style={{ objectFit: "contain" }}
                      />
                      <Search />
                    </Box>
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
          </>
        ) : (
          <Skeleton variant="rectangular" />
        )}
      </Grid2>

      <Grid2 size={12} justifyContent={"center"} display={'flex'} gap={1}>
        {productOrder?.payment?.verification?.payment_vouchers
          ? productOrder?.payment.verification.payment_vouchers.map(
              (item, index) => {
                return (
                  <Grid2 key={index} size={{ xs: 12, lg: 2.9 }}>
                    <Card
                      key={index}
                      variant="outlined"
                      sx={{
                        // maxHeight: "300px",
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
                          return theme.palette.text.primary; // Use theme's GrayText equivalent
                        },
                        height: "100%",
                      }}
                    >
                      <CardHeader subheader={`Referencia: No.${item.reference}`} action={
                         <IconButton
                        color="primary"
                        sx={{bgcolor:'#fff'}}
                         size="small"
                         aria-label="Open-Modal-Image-Ticket"
                         onClick={() => handleOpenImageTicket(item)}
                       >
                         <OpenInFull fontSize="15px" />
                       </IconButton>
                      } />
                      <Typography
                        variant="body1"
                        fontSize={"18px"}
                        textAlign={"center"}
                      >
                        {" "}
                        Monto: ${item?.amount}
                      </Typography>
                      <CardContent
                        sx={{ display: "flex", position:'relative', justifyContent: "center" }}
                      >
                        <img
                          src={item.url}
                          width={"150px"}
                          height={"100px"}
                          style={{ objectFit: "cover", borderRadius:'10px' }}
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
                          <>
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
                          </>
                        ) : (
                          ""
                        )}
                      </CardActions>
                    </Card>
                  </Grid2>
                );
              }
            )
          : ""}
      </Grid2>
      <Modal
        open={open.value}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Fab
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "red",
              bgcolor: "#fff",
            }}
            onClick={handleClose}
          >
            <Close />
          </Fab>
          <Swiper pagination={true} modules={[Pagination]}>
            {open.images?.map((image) => {
              return (
                <SwiperSlide>
                  <img key={image} src={image} style={{ objectFit: "cover" }} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Modal>

      <Modal
        open={openImageTicket.value}
        onClose={handleCloseImageTicket}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Fab
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "red",
              bgcolor: "#fff",
            }}
            onClick={handleCloseImageTicket}
          >
            <Close />
          </Fab>
          <img style={{width:'100%', height:'100%', objectFit:'cover' }} src={openImageTicket?.selected?.url}></img>
          <Typography variant="body1" color="initial">
            <strong>Monto: </strong> $ {openImageTicket?.selected?.amount} <br />
            <strong>Referencia: </strong> {openImageTicket?.selected?.reference}

          </Typography>
        </Box>
      </Modal>
    </Grid2>
  );
};

export default DetailSale;
