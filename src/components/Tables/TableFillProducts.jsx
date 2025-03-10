import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Card,
  CardContent,
  Grid2,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import noImage from "../../assets/Images/CHMX/Imagotipo Cuadrado CHMX.png";
import { Close, Search } from "@mui/icons-material";
import { useStockStorehouse } from "../../hooks/useStockStorehouse";
import { useWarehouse } from "../../hooks";
import QRScannerV2 from "../QR/QRScannerV2";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 15,
  gap: 1,
  p: 5,
  zIndex: 0,
};

const TableFillProducts = ({ products, handleOpen }) => {
  if (!products) return null; // Evita errores si no hay usuario
  const [validation, setValidation] = useState(false);
  const [valuate, setValuate] = useState(null);
  const [openModal, setOpenModal] = useState({
    value: false,
    data: {},
    section: {},
  });

  useEffect(() => {
    if (valuate) {
      if (openModal.section._id === valuate) {
        setValidation(true);
      } else {
        Swal.fire({ title: "No coincide con sección", icon: "error" });
      }
    }
  }, [valuate, openModal.section]);

 console.log(openModal,'data del modal');
 
  

  const handleSave = () => {
    const {
      product_detail: product,
      quantity_received: quantity,
      _id: inputId,
    } = openModal.data;
    const data = {
      product: {
        _id: product._id,
        product_id: product.product_id || null,
        type: product.product_id ? "variant_product" : "unique_product",
      },
      quantity,
      section: openModal.section._id,
      input: inputId,
    };
    console.log(data);
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
          <Typography fontSize={14}>
            <strong>Cantidad de producto: {product.quantity_received}</strong>
            <br />
          </Typography>
          <Typography>
            <strong>Nombre del Producto:</strong>
            <br />
            {product.product_detail.name} <br />
            <strong>Código:</strong>
            <br />
            {product.product_detail.tag} <br />
          </Typography>
        </>
      );
    }
    return "";
  };

  const { searchProductFill } = useWarehouse();

  const handleSearch = (product) => {
    const product_id = product.variant ? product.variant._id : product.item._id
    searchProductFill({id: product_id, handleOpen: setOpenModal, product:product});
 
};

  const handleClose = () => {
    setOpenModal({ data: {}, section: {}, value: false });
  };
  return (
    <TableContainer
      variant="outlined"
      sx={{ borderRadius: "20px" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 500 }} aria-label="User Table">
        {/* Encabezado de la tabla */}
        <TableHead sx={{ bgcolor: "rgba(224, 224, 224, 0.21)" }}>
          <TableRow>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Producto
            </TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Cantidad
            </TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>P.U.</TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Monto
            </TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Cuerpo de la tabla */}
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product._id || index}>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "250px",
                }}
              >
                <img
                  src={
                    product.variant
                      ? product.variant.images[0]?.url
                      : product.item.images[0]?.url
                        ? product.item.images[0]?.url
                        : noImage
                  }
                  alt={index}
                  style={{
                    cursor: "pointer",
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  onClick={() =>
                    handleOpen(
                      product.variant
                        ? product.variant.images
                        : product.item.images
                    )
                  }
                />
                <Typography
                  sx={{
                    p: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {`${product.item.name} - ${
                    product.variant ? product.variant.attributes.color : ""
                  } - ${
                    product.variant ? product.variant.attributes.size : ""
                  }`}
                </Typography>
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                $
                {product.variant?.price
                  ? product.variant.price.toFixed(2)
                  : product.item?.price?.toFixed(2) || "0.00"}
              </TableCell>
              <TableCell>
                $
                {product.variant?.price
                  ? (product.variant.price * product.quantity).toFixed(2)
                  : (product.item?.price * product.quantity).toFixed(2) ||
                    "0.00"}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleSearch(product)
                  }
                  startIcon={<Search />}
                >
                  Buscar
                </Button>
              </TableCell>
            </TableRow>
          ))}

          <Modal open={openModal.value} onClose={handleClose}>
            <Grid2 container sx={style}>
              <IconButton
                disableRipple
                aria-label="Cerrar"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  transform: "translate(790%, -90%)",
                }}
              >
                <Close />
              </IconButton>
              <QRScannerV2
                label="Escanear QR de sección"
                setValueQR={setValuate}
              />
              <Card variant="outlined">
                <CardContent>{renderProduct(openModal.data)}</CardContent>
              </Card>
              <Card variant="outlined">
                <CardContent>{renderSection(openModal.section)}</CardContent>
              </Card>
              {RenderButtonAsign(validation)}
            </Grid2>
          </Modal>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableFillProducts;
