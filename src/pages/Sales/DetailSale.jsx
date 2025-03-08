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
  Grid,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Close,
  CreditCard,
  FileDownload,
  FormatListBulleted,
  OpenInFull,
  PriceCheck,
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
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import TableDetail from "./TablesDetail/TableDetail";
import TableProductList from "./TablesDetail/TableProductList";
import { grey } from "@mui/material/colors";
import { grid, height, width } from "@mui/system";

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
  width:'800px',
  height:'800px',
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
    selected: {},
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
  const handleCloseImageTicket = () =>
    setOpenImageTicket({ value: false, item: {} });

  const printPDF = (id) => {
    loadPrintPDFOrder(id);
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }
  const paths = [
    { path: `/contaduria/verificar-ventas`, name: "Verificar ventas" },
    { path: `/contaduria/venta-detalle/${id}`, name: "Verificar venta" },
  ];
  return (
    <Grid2 container paddingX={10} >
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h4">
          <strong>Autorizar venta</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      <Grid2 size={12} display={"flex"} justifyContent={"space-around"}>
        {productOrder?.payment?.payment_status === "approved" ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownload />}
            onClick={() => printPDF(id)}
          >
            Descargar pdf
          </Button>
        ) : (
          ""
        )}

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
        sx={{
          display: "grid",
          gridTemplateColumns: {sm:"1fr",lg:"repeat(5, 1fr)"},
          gridTemplateRows:{sm:" repeat(3, 1fr)" ,lg:"repeat(4, 1fr)"} ,
          gridColumnGap: {sm:"10px", lg:"20px"} ,
          gridRowGap:{sm:"10px",lg:"0px"} ,
        }}
      >
         <Grid2 sx={{gridArea:{ sm:" 1 / 1 / 2 / 2", lg:"1 / 1 / 3 / 4"}}}>
        <Card variant="outlined" sx={{ borderRadius: "25px" }}>
          <CardHeader
            avatar={
              <CreditCard
                sx={{
                  width: "50px",
                  height: "50px",
                  bgcolor: grey[100],
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
            }
            title={
              <Typography>
                <strong>Información</strong>
              </Typography>
            }
          />

          <CardContent>
            <TableDetail
              date={productOrder?.createdAt}
              location={productOrder?.deliveryLocation}
              user={productOrder?.user_id}
              status={productOrder?.payment_status}
              typeDelivery={productOrder?.typeDelivery}
            />
          </CardContent>
        </Card>
      </Grid2>

      <Grid2 sx={{ gridArea: {sm:"2 / 1 / 3 / 2", lg:"3 / 1 / 5 / 4"}}}>
        <Card variant="elevation" sx={{ borderRadius: "25px" }}>
          <CardHeader
            avatar={
              <FormatListBulleted
                sx={{
                  width: "50px",
                  height: "50px",
                  bgcolor: grey[100],
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
            }
            title={
              <Typography>
                <strong>Lista de productos</strong>
              </Typography>
            }
          />
          <CardContent>
            <TableProductList
              products={productOrder.products}
              discount={productOrder.dicount}
              shippingCost={productOrder.shipping_cost}
              handleOpen={handleOpen}
            />
          </CardContent>
        </Card>
      </Grid2>

      <Grid2 sx={{gridArea: { sm:"3 / 1 / 4 / 2", lg: "1 / 4 / 5 / 6"}}} 
      justifyContent={"center"} display={"flex"} gap={1}>
        {productOrder?.payment?.verification?.payment_vouchers
          ? productOrder?.payment.verification.payment_vouchers.map(
              (item, index) => {
                return (
                  <Grid2 key={index} width={'100%'} height={'100%'}>
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
                          return theme.palette.primary.contrastText; // Use theme's GrayText equivalent
                        },
                        color: (theme) => {
                          if (item.status === "approved")
                            return theme.palette.success.contrastText;
                          if (item.status === "rejected")
                            return theme.palette.warning.contrastText;
                          return theme.palette.text.primary; // Use theme's GrayText equivalent
                        },
                        borderRadius: "25px",
                      }}
                    >
                      <CardHeader
                        avatar={
                          <PriceCheck
                            sx={{
                              width: "50px",
                              height: "50px",
                              bgcolor: grey[100],
                              borderRadius: "50%",
                              padding: "10px",
                            }}
                          />
                        }
                        title={
                          <Typography>
                            <strong>Revisión de pago</strong>
                          </Typography>
                        }
                        action={
                          <Tooltip title={'Ver'}>

                          <IconButton
                            color="primary"
                            sx={{ bgcolor: "#fff" , width:'50px', height:'50px'}}
                            size="small"
                            aria-label="Open-Modal-Image-Ticket"
                            onClick={() => handleOpenImageTicket(item)}
                          >
                            <OpenInFull />
                          </IconButton>
                          </Tooltip>
                        }
                      />
                      <Typography
                        variant="body1"
                        fontSize={"25px"}
                        textAlign={"center"}
                        fontWeight={"Bold"}
                      >
                        Monto:{`$ ${productOrder.total.toFixed(2)}`}
                      </Typography>
                      <CardContent
                        sx={{
                          display: "flex",
                          position: "relative",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item.url}
                          width={"250px"}
                          height={"250px"}
                          style={{ objectFit: "contain", borderRadius: "10px" }}
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
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={openImageTicket?.selected?.url}
          ></img>
          <Typography variant="h6"  color="initial">
            <strong>Monto: </strong> $ {openImageTicket?.selected?.amount}{" "}
            <br />
            <strong>Referencia: </strong> {openImageTicket?.selected?.reference}
          </Typography>
        </Box>
      </Modal>
    </Grid2>
  );
};

export default DetailSale;
