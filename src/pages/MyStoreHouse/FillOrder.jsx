import {
  Grid,
  Skeleton,
  Button,
  Typography,
  Avatar,
  Box,
  Modal,
  Fab,
  Grid2,
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
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import TableDetail from "../Sales/TablesDetail/TableDetail";
import TableProductList from "../Sales/TablesDetail/TableProductList";
import TableFillProducts from "../../components/Tables/TableFillProducts";

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
  const paths = [
    { path: `/almacenista/mis-ventas`, name: "Pedidos" },
    { path: `/almacenista/surtir-venta`, name: "Surtir pedido" },
  ];

  console.log(productOrder);

  return (
    <Grid2 container paddingX={10} display={"flex"} gap={2}>
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4">
          <strong>Surtir pedido</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <Grid2 container alignContent={"center"}>
        <Grid2 display={"flex"} size={12} justifyContent={"center"}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => printPDF(id)}
            color="success"
          >
            Imprimir PDF
          </Button>
        </Grid2>
        <Grid2 size={12}>
          <TableDetail
            user={productOrder?.user_id}
            typeDelivery={productOrder?.typeDelivery}
            status={productOrder?.payment_status}
            date={localDate(productOrder?.createdAt)}
            location={
              productOrder?.branch
                ? productOrder.branch.location
                : productOrder?.deliveryLocation
            }
          />
        </Grid2>
        <Grid2>
          <TableFillProducts
            products={productOrder?.products}
            shippingCost={productOrder?.shipping_cost}
            discount={productOrder?.discount}
          />
        </Grid2>

        <Grid item xs={12}>
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
    </Grid2>
  );
};

export default FillOrder;
