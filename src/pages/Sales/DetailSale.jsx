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
  useTheme,
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
import { EyeFilled } from "@ant-design/icons";

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
  width: '800px',
  height: '800px',
  p: 4,
};

const DetailSale = () => {
  const { id } = useParams(); // Obtiene el parámetro `id` de la URL
  const {
    loadProductOrder, // Carga la información de la orden de productos
    productOrder, // Información de la orden de productos
    navigate, // Navegación entre rutas
    loadPrintPDFOrder, // Función para cargar el PDF de la orden
    rowsProducts, // Productos en la orden
    loading, // Estado de carga
    validateSale, // Función para validar la venta
    rejectTicket, // Función para rechazar un ticket
  } = useProductOrder();

  const [open, setOpen] = useState({ images: [], value: false }); // Estado para manejar el modal de imágenes
  const [openImageTicket, setOpenImageTicket] = useState({
    selected: {},
    value: false,
  }); // Estado para manejar el modal de tickets

  // Callback para cargar la orden de productos
  const callBackPO = useCallback(() => loadProductOrder(id), [id]);

  // Efecto para cargar la orden al montar el componente
  useEffect(() => {
    callBackPO();
  }, [callBackPO]);

  // Función para obtener el estado del pago en texto
  function statusPayment(status) {
    const availableStatus = {
      pending: "Pendiente",
      pending_to_verify: "Pendiente por verificar",
      approved: "Pago liquidado",
      rejected: "Pago rechazado",
      cancelled: "Pago cancelado o expirado",
    };
    const defaultValue = "Sin estado de pago";
    const value = availableStatus[status] || defaultValue;
    return value;
  }

  // Abre un enlace en una nueva pestaña
  const handleButtonClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Maneja la apertura del modal de imágenes
  const handleOpen = (images) => {
    let UrlImages = images?.map((i) => i.url);
    setOpen({ value: true, images: UrlImages });
  };

  // Maneja la apertura del modal de tickets
  const handleOpenImageTicket = (item) => {
    setOpenImageTicket({ value: true, selected: item });
  };

  // Cierra el modal de imágenes
  const handleClose = () => setOpen({ value: false, images: [] });

  // Cierra el modal de tickets
  const handleCloseImageTicket = () =>
    setOpenImageTicket({ value: false, item: {} });

  // Imprime el PDF de la orden
  const printPDF = (id) => {
    loadPrintPDFOrder(id);
  };
  const paymentVouchers = productOrder?.payment?.verification?.payment_vouchers || [];

  const theme = useTheme();

  if (loading) {
    return <LoadingScreenBlue />; // Muestra una pantalla de carga si está cargando
  }

  const paths = [
    { path: `/contaduria/verificar-ventas`, name: "Verificar ventas" },
    { path: `/contaduria/venta-detalle/${id}`, name: "Verificar venta" },
  ]; // Rutas para el breadcrumb

  return (
    <Grid2 container paddingX={10}>
      {/* Encabezado */}
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

      {/* Breadcrumb */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Botones de descarga */}
      <Grid2 size={12} display={"flex"} justifyContent={"space-around"}>
        {/* {productOrder?.payment?.payment_status === "approved" ? (
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
        )} */}

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

      {/* Contenido principal */}
      <Grid2
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", lg: "repeat(5, 1fr)" },
          gridTemplateRows: { sm: " repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
          gridColumnGap: { sm: "10px", lg: "20px" },
          gridRowGap: { sm: "10px", lg: "0px" },
        }}
      >
        {/* Información de la venta */}
        <Grid2 sx={{ gridArea: { sm: " 1 / 1 / 2 / 2", lg: "1 / 1 / 3 / 4" } }}>
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
                location={
                  productOrder?.branch
                    ? productOrder.branch.location
                    : productOrder?.deliveryLocation
                }
                user={productOrder?.user_id}
                status={productOrder?.payment_status}
                typeDelivery={productOrder?.typeDelivery}
                order_status={productOrder?.order_status}
              />
            </CardContent>
          </Card>
        </Grid2>

        {/* Lista de productos */}
        <Grid2 sx={{ gridArea: { sm: "2 / 1 / 3 / 2", lg: "3 / 1 / 5 / 4" } }}>
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

        {/* Revisión de pagos */}
        <Grid2
          sx={{ gridArea: { sm: "3 / 1 / 4 / 2", lg: "1 / 4 / 5 / 6" } }}

        >
         {paymentVouchers.length > 0 ? (
        // Invertir el orden y mapear las tarjetas
        [...paymentVouchers]
          .reverse()
          .map((item) => (
            <Card
              key={item.id} // Mejor usar item.id en lugar del índice
              variant="outlined"
              sx={{
                margin: "10px",
                bgcolor:
                  item.status === "approved"
                    ? theme.palette.success.main
                    : item.status === "rejected"
                    ? theme.palette.warning.main
                    : theme.palette.background.paper,
                color:
                  item.status === "approved"
                    ? theme.palette.success.contrastText
                    : item.status === "rejected"
                    ? theme.palette.warning.contrastText
                    : theme.palette.text.primary,
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
                  <Tooltip title="Ver">
                    <IconButton
                      color="error"
                      sx={{
                        bgcolor: "#fff",
                        width: "50px",
                        height: "50px",
                      }}
                      size="small"
                      aria-label="Open-Modal-Image-Ticket"
                      onClick={() => handleOpenImageTicket(item)}
                    >
                      <EyeFilled />
                    </IconButton>
                  </Tooltip>
                }
              />

              <Typography
                variant="body1"
                fontSize="25px"
                textAlign="center"
                fontWeight="bold"
              >
                Monto: $ {productOrder.total.toFixed(2)}
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
                  width="250px"
                  height="250px"
                  style={{
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                  alt="Imagen de la referencia"
                />
              </CardContent>

              {item.notes && (
                <Typography variant="body1" color="#fff" textAlign="center">
                  Motivo del rechazo: {item.notes}
                </Typography>
              )}

              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                {item.status === "pending" && (
                  <>
                    <RejectedButton
                      title="Rechazar pago"
                      text={`¿Está seguro de rechazar el ticket con referencia: ${item.reference}?`}
                      callbackAction={rejectTicket}
                      values={{
                        id: productOrder.payment._id,
                        createdAt: item.createdAt,
                      }}
                      textButton="Rechazar"
                      inputLabel="Motivo de rechazo"
                      inputText="Proporcione los motivos de rechazo"
                    />
                    <SuccessButton
                      title="Autorizar pago"
                      text={`¿Está seguro de autorizar el ticket con referencia: ${item.reference}?`}
                      callbackAction={() =>
                        validateSale({
                          id: productOrder.payment._id,
                          createdAt: item.createdAt,
                        })
                      }
                      textButton="Autorizar"
                    />
                  </>
                )}
              </CardActions>
            </Card>
          ))
      ) : (
        <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
          No hay comprobantes de pago registrados.
        </Typography>
      )}

        </Grid2>
      </Grid2>

      {/* Modal de imágenes */}
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
                  <img
                    key={image}
                    src={image}
                    style={{ objectFit: "cover" }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Modal>

      {/* Modal de tickets */}
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
          <Typography variant="h6" color="initial">
            <strong>Monto: </strong> $ {openImageTicket?.selected?.amount} <br />
            <strong>Referencia: </strong> {openImageTicket?.selected?.reference}
          </Typography>
        </Box>
      </Modal>
    </Grid2>
  );
};

export default DetailSale;
