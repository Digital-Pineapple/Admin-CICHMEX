import {
  Grid,
  Skeleton,
  Button,
  Typography,
  Avatar,
  Box,
  Modal,
  Fab,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { DataGrid } from "@mui/x-data-grid";
import { QRCodeSVG } from "qrcode.react";
import { localDate } from "../../Utils/ConvertIsoDate";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { ArrowBack, Close, Search } from "@mui/icons-material";
import CustomNoRows from "../../components/Tables/CustomNoRows";
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
  maxWidth: "90%",
  maxHeigth: "90%",
  p: 4,
};

const FillOrder = () => {
  const { id } = useParams();
  const {
    loadProductOrder,
    productOrder,
    rowsProducts,
    completeProductOrder,
    loadPrintPDFOrder,
    loading,
    navigate,
  } = useProductOrder();
  const [rowSelection, setRowSelection] = useState([]);
  const [activeButton1, setActiveButton] = useState(false);
  const [open, setOpen] = useState({ images: [], value: false });
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

  const handleOpen = (images) => {
    let UrlImages = images?.map((i) => i.url);
    setOpen({ value: true, images: UrlImages });
  };
  const handleClose = () => setOpen({ value: false, images: [] });

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
          Surtir orden: {productOrder?.order_id}
        </Typography>
      </Grid>
      <Grid container alignContent={"center"}>
        <Grid
          item
          gap={2}
          display={"flex"}
          justifyContent={"space-between"}
          padding={2}
          xs={12}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<ArrowBack />}
            onClick={() => navigate(`/almacenista/mis-ventas`)}
            color="primary"
          >
            Regresar
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => printPDF(id)}
            color="success"
          >
            Imprimir PDF
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          alignContent={"center"}
          justifyContent={"center"}
          display={"flex"}
          padding={2}
        >
          <QRCodeSVG
            width={"200px"}
            height={"200px"}
            value={productOrder?.order_id}
          />
        </Grid>
        <Grid item xs={12} lg={6} padding={2}>
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

        <Grid item xs={12}>
          {rows ? (
            <Grid container display={"flex"} flexDirection={"column"}>
              <Typography variant="body1" textAlign={"center"} color="inherit">
                <strong>
                  <i>Lista de productos</i>{" "}
                </strong>
              </Typography>
              <DataGrid
                sx={{
                  "& .theme--hedaer": {
                    backgroundColor: "black",
                    color: "white",
                    textAlign: "center",
                  },
                }}
                onRowSelectionModelChange={(value) => {
                  setRowSelection(value);
                  activeButton(value.length);
                }}
                rowSelectionModel={rowSelection}
                hideFooterSelectedRowCount={true}
                slots={{
                  noRowsOverlay: CustomNoRows,
                }}
                autoHeight
                columns={[
                  {
                    field: "image",
                    headerName: "Imagen",
                    headerClassName: "theme--hedaer",
                    flex: 1,
                    align: "center",
                    headerAlign: "center",
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
                    headerClassName: "theme--hedaer",
                    flex: 1,
                    align: "center",
                  },
                  {
                    field: "quantity",
                    headerName: "Cantidad de producto",
                    headerClassName: "theme--hedaer",
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
    </Grid>
  );
};

export default FillOrder;
