import {
  Grid,
  Button,
  Typography,
  Box,
  Modal,
  Fab,
  Grid2,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { localDate } from "../../Utils/ConvertIsoDate";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { Close } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import TableDetail from "../Sales/TablesDetail/TableDetail";
import TableFillProducts from "../../components/Tables/TableFillProducts";
import { useWarehouse } from "../../hooks";
import QRScannerV2 from "../../components/QR/QRScannerV2";
import Swal from "sweetalert2";
import TableDetailSupply from "../../components/Tables/TableDetailSupply";
import { FilePdfFilled } from "@ant-design/icons";
import { spacing } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  boxShadow: 24,
  maxWidth: "90%",
  maxHeigth: "90%",
  rowGap:1,
  p: 6,
};

const FillOrder = () => {
  const { id } = useParams();
  const {
    loadProductOrder,
    productOrder,
    loadPrintPDFOrder,
    loading,
    completeProductOrder,
  } = useProductOrder();
  const { searchProductFill, supplyProduct } = useWarehouse();

  const [open, setOpen] = useState({ images: [], value: false });
  const [validation, setValidation] = useState(false);
  const [valuate, setValuate] = useState(null);
  const [openModal, setOpenModal] = useState({
    value: false,
    data: {},
    section: {},
  });

  useEffect(() => {
    loadProductOrder(id);
  }, [id]);
  

  useEffect(() => {
    if (valuate) {
      if (openModal.section && openModal.section._id === valuate) {
        setValidation(true);
      } else {
        Swal.fire({ title: "No coincide con sección", icon: "error" });
      }
    }
  }, [valuate, openModal.section]);

  const handleSave = () => {
    const product = openModal.data;
    const data = {
      product_id: product.variant ? product.variant._id : product.item._id,
      productStock: product.variant ? product.variant.product_id : null,
      status: true,
      section: openModal.section._id,
      quantity: product.quantity,
      type: product.variant ? "variant_product" : "unique_product",
    };
    supplyProduct(id, data, handleCloseModal);
  };
  const completeSupply = () => {
    completeProductOrder(id);
  };

  const printPDF = (id) => {
    loadPrintPDFOrder(id);
  };

  const handleOpen = (images) => {
    let UrlImages = images?.map((i) => i.url);
    setOpen({ value: true, images: UrlImages });
  };
  const handleClose = () => setOpen({ value: false, images: [] });

  const handleSearch = (product) => {
    const product_id = product.variant ? product.variant._id : product.item._id;
    searchProductFill({ id: product_id, product: product, setOpenModal });
  };

  const handleCloseModal = () => {
    setOpenModal({ data: {}, section: {}, value: false });
    setValidation(false);
    setValuate(null);
  };

  const RenderButtonAsign = (disabled) => (
    <Button
      variant="contained"
      onClick={handleSave}
      fullWidth
      color="success"
      disabled={!disabled}
    >
      Completar surtido
    </Button>
  );
  
  const RenderButtonAsignTotal = (disabled) => {
    if (productOrder.storeHouseStatus) {
      return null
    }return(

    <Button
      variant="contained"
      onClick={completeSupply}
      fullWidth
      color="success"
      disabled={!disabled}
    >
      Terminar surtido
    </Button>
    )
}
  const renderSection = (sectionData) => {
    if (Array.isArray(sectionData) && sectionData.length > 0) {
      const sec = sectionData[0];
      return (
        <Typography>
          <strong>Sección:</strong>
          <br />
          {sec?.name || "N/A"} <br />
          <strong>Pasillo:</strong>
          <br />
          {sec?.aisle?.name || "N/A"} <br />
          <strong>Zona:</strong>
          <br />
          {sec?.zone?.name || "N/A"} <br />
        </Typography>
      );
    } else if (sectionData && typeof sectionData === "object") {
      return (
        <Typography>
          <strong>Sección:</strong>
          <br />
          {sectionData?.name || "N/A"} <br />
          <strong>Pasillo:</strong>
          <br />
          {sectionData?.aisle?.name || "N/A"} <br />
        </Typography>
      );
    }
    return null;
  };
  const renderProduct = (product) => {
    if (Object.keys(product).length > 0) {
      return (
        <>
          <Typography fontSize={25}>
           Cantidad de producto:  <strong>{product.quantity} </strong>
            <br />
          </Typography>
          <Typography>
            <strong>Nombre del Producto:</strong>
            <br />
            {`${product.item.name} - ${
              product.variant ? product.variant.attributes.color : ""
            } - ${product.variant ? product.variant.attributes.size : ""}`}{" "}
            <br />
            <strong>Código:</strong>
            <br />
            {product.variant ? product.variant.tag : product.item.tag} <br />
          </Typography>
        </>
      );
    }
    return "";
  };

  const lp = productOrder.products;
  const values = productOrder.supply_detail?.map((i) => i.status);
  const isValid = () => lp?.length === values?.length && values?.every(Boolean);

  const paths = [
    { path: `/almacenista/mis-ventas`, name: "Pedidos" },
    { path: `/almacenista/surtir-venta`, name: "Surtir pedido" },
  ];

  if (loading) {
    return <LoadingScreenBlue />;
  }
  

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2}>
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{fontSize:{xs:"16px", lg:"25px"}}}>
          <strong>Surtir pedido</strong>
          <br />
          {productOrder.order_id ? productOrder.order_id : ""}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <Grid2
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(5, 1fr)" },
          gridTemplateRows: { xs: "auto, auto, auto", lg: "repeat(6, 1fr)" },
          gridColumnGap: "10px",
          gridRowGap: "10px",
        }}
      >
        <Grid2
        size={{xs:12}}
        gridArea={{ xs: "3 / 1 / 4 / 6", lg: "1 / 4 / 7 / 6" }}>
          <Typography
            paddingY={{ xs: 0, lg: 2 }}
            paddingX={{ xs: 0, lg: 2 }}
            variant="body1"
            color="initial"
          >
            <strong>Información general</strong>
          </Typography>
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
          <Button
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<FilePdfFilled />}
            onClick={() => printPDF(id)}
            color="success"
            sx={{ marginY: 2 }}
          >
            Imprimir PDF
          </Button>
          {RenderButtonAsignTotal(isValid())}
        </Grid2>

        <Grid2 gridArea={{ xs: "2 / 1 / 3 / 6", lg: "1 / 1 / 4 / 4" }}>
          <Typography paddingY={2} paddingX={2} variant="body1" color="initial">
            <strong>Lista de productos</strong>
          </Typography>
          <TableFillProducts
            products={productOrder?.products}
            handleOpen={handleOpen}
            handleSearch={handleSearch}
          />
        </Grid2>

        <Grid2 gridArea={{ xs: "1 / 1 / 2 / 6", lg: "4 / 1 / 7 / 4" }}>
          <Typography
            paddingY={{ xs: 0, lg: 2 }}
            paddingX={2}
            variant="body1"
            color="initial"
          >
            <strong>Detalle de surtido</strong>
          </Typography>
          <TableDetailSupply
            supply_detail={productOrder.supply_detail}
            products={productOrder.products}
          />
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

      <Modal open={openModal.value} onClose={handleClose}>
        <Grid2 container sx={style}>
          <IconButton
            aria-label="Cerrar"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right:'10px',
              top:'10px',
              color:'red'
            }}
          >
            <Close />
          </IconButton>
          <Card variant="outlined">
            <CardContent>{renderProduct(openModal.data)}</CardContent>
          </Card>
          <Card variant="outlined" sx={{width:'100%'}}>
            <CardContent>{renderSection(openModal.section)}</CardContent>
          </Card>
          <QRScannerV2 title="Escanea el Qr de la sección" label="Escanear QR de sección" setValueQR={setValuate} />
          {RenderButtonAsign(validation)}
        </Grid2>
      </Modal>
    </Grid2>
  );
};

export default FillOrder;
