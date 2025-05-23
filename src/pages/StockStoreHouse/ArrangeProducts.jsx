import React, { useEffect, useState } from "react";
import { useStockStorehouse } from "../../hooks/useStockStorehouse";
import { useParams } from "react-router-dom";
import {
  Grid2,
  Typography,
  Button,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Modal,
  Tooltip,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { AddLocation, Check, Close, QrCode, Search } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { localDate } from "../../Utils/ConvertIsoDate";
import { useWarehouse } from "../../hooks";
import QRScannerV2 from "../../components/QR/QRScannerV2";
import Swal from "sweetalert2";
import { set } from "react-hook-form";

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

const ArrangeProducts = () => {
  const { loadEntryReport, EntryReport, loading } = useStockStorehouse();
  const {
    getSection,
    section,
    addProductToSection,
    updateStock,
    navigate,
  } = useWarehouse();
  const { folio } = useParams();
  const [section1, setSection] = useState(null);
  const [validation, setValidation] = useState(false);
  const [valuate, setValuate] = useState(null);
  const [active, setActive] = useState(false);
  const [openModal, setopenModal] = useState({
    value: false,
    data: {},
    index: null,
    section: {},
  });
  const [openModalSection, setopenModalSection] = useState({
    value: false,
    data: {},
    index: null,
  });

  // Valida el QR escaneado comparándolo con la sección del modal
  useEffect(() => {
    if (valuate) {
      if (openModal.section._id === valuate) {
        setValidation(true);
      } else {
        Swal.fire({ title: "No coincide con ubicación", icon: "error" });
      }
    }
  }, [valuate, openModal.section]);

  // Carga el reporte de entrada según el folio
  useEffect(() => {
    loadEntryReport(folio);
  }, [folio]);

  // Obtiene la sección si se escanea el QR
  useEffect(() => {
    if (section1) {
      getSection(section1);
    }
  }, [section1]);

  // Verifica si todos los productos están asignados a sección
  useEffect(() => {
    if (EntryReport?.inputs) {
      const allTrue = EntryReport.inputs.every((i) => i.in_section);
      if (allTrue) {
        setActive(true);
      }
    }
  }, [EntryReport]);

  // Función auxiliar para resetear estados comunes al cerrar modales
  const resetModalStates = () => {
    setSection(null);
    setValidation(false);
    setValuate(null);
  };

  const handleClose = () => {
    setopenModal({ value: false, data: {} });
    resetModalStates();
  };

  const handleCloseSection = () => {
    setopenModalSection({ value: false, data: {} });
    resetModalStates();
  };

  const handleSaveProductToSection = () => {
    const {
      product_detail: product,
      quantity_received: quantity,
      _id: inputId,
    } = openModalSection.data;
    const data = {
      product: { _id: product._id, product_id: product.product_id || null },
      quantity,
      section: section1,
      input: inputId,
      folio,
    };
    addProductToSection(data, setopenModalSection, setSection, setValuate);
  };

  const handleSaveStockProduct = (product) => {
    const {
      product_detail,
      quantity_received,
      _id,
    } = product;
    const data = {
      product: {
        _id: product_detail._id,
        product_id: product_detail.product_id || null,
        type: product.product_id ? "variant_product" : "unique_product",
      },
      quantity : quantity_received,
      location: product.location_id,
      input: _id,
    };
     updateStock(data, setSection);
  };

  const paths = [
    { path: "/almacenista/entradas_de_producto", name: "Entradas de producto" },
    {
      path: "/almacenista/entradas_de_producto/acomodar_producto",
      name: "Acomodar producto",
    },
  ];

  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Obtiene datos del responsable de la entrada y del encargado en almacén
  const responsible = EntryReport.responsible || {};
  const { fullname, email, type_user } = responsible;
  const userReceived = EntryReport.user_received || {};

  const TYPE_USERS = {
    "SUPER-ADMIN": "Super Administrador",
    ADMIN: "Administrador",
    "WAREHOUSE-MANAGER": "Encargado de almacén",
    WAREHOUSEMAN: "Almacenista",
    no_data: "Sin información",
  };

  const defaultTypeUser = "no_data";
  const RenderName = TYPE_USERS[type_user?.role?.[0]] || defaultTypeUser;
  const RenderName_r =
    TYPE_USERS[userReceived?.type_user?.role?.[0]] || defaultTypeUser;

  const ValuesLocation = (data) => {
    if (data) {
      const dataarray = data.name.split("_");
      return (
        <Typography>
          <strong>Pasillo:</strong> {dataarray[0]} <br />
          <strong>Sección:</strong> {dataarray[1]} <br />
          <strong>Ubicación:</strong> {dataarray[2]} <br />
        </Typography>
      );
    }
    return <Typography>Sin ubicación</Typography>;
  };

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
    } else if (sectionData?.name !== undefined) {
      const data = sectionData.name.split("_");
      return (
        <Typography>
         <strong>Pasillo:</strong> {data[0]}<br /> 
          <strong>Sección:</strong>{data[1]} <br />
          <strong>Ubicación:</strong> {data[2]} <br />
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

  const RenderButtonAsign = (disabled) => (
    <Button
      variant="contained"
      onClick={handleSaveStockProduct}
      fullWidth
      color="success"
      disabled={!disabled}
    >
      Asignar ubicación
    </Button>
  );

  const RenderButtonSubmit = () =>
    active && (
      <Button
        variant="contained"
        onClick={() =>
          navigate(`/almacen/autorizar_acomodar`, { replace: true })
        }
        size="small"
        sx={{ m: 1, width: "200px" }}
        color="success"
      >
        Terminar
      </Button>
    );

  const renderButtonActions = (product) => {
    if (product.in_section === true) {
      return (
        <Tooltip title="Producto acomodado">
          <IconButton disabled>
            <QrCode />
          </IconButton>
        </Tooltip>
      );
    }
    if (product.in_section === false && product.location === undefined ) {
      return (
        <Tooltip title="Asignar ubicación">
          <IconButton
            color="primary"
            onClick={() => {
              setopenModalSection({ value: true, data: product });
              setSection(null);
              setValuate(null);
              setValidation(false);
            }}
          >
            <AddLocation />
          </IconButton>
        </Tooltip>
      );
    }
    if (product.in_section === false && !!product.location) {
      return (
        <Tooltip title="Terminar acomodado">
          <IconButton
            onClick={() =>
              handleSaveStockProduct(product)
            }
          >
            <Check/>
          </IconButton>
        </Tooltip>
      );
    }
  };
  return (
    <Grid2 container paddingX={{ lg: 20 }} display="flex" gap={2}>
      {/* Encabezado con título y folio */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">
          <strong>Acomodo de producto</strong>
        </Typography>
        <Typography variant="h5">
          <strong>Folio:</strong> {EntryReport._id} <br />
        </Typography>
      </Grid2>

      {/* Breadcrumb para navegación */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Información del responsable de entrada */}
      <Grid2
        bgcolor="#fff"
        sx={{ boxShadow: "0px 0px 4px -1px #7a7a7a" }}
        padding={2}
        borderRadius="15px"
        size={{ xs: 12, lg: 6 }}
      >
        <Typography variant="body2" color="initial">
          <strong>Responsable de entrada</strong>
          <br />
          <strong>Nombre:</strong> {fullname} <br />
          <strong>Correo:</strong> {email} <br />
          <strong>Tipo de usuario:</strong> {RenderName}
          <br />
          <strong>Fecha de creación:</strong>{" "}
          {localDate(EntryReport?.createdAt?.[0])}
        </Typography>
      </Grid2>

      {/* Información del responsable en almacén */}
      <Grid2
        bgcolor="#fff"
        sx={{ boxShadow: "0px 0px 4px -1px #7a7a7a" }}
        padding={2}
        size={{ xs: 12, lg: 5.7 }}
        borderRadius="15px"
      >
        <Typography variant="body2" color="initial">
          <strong>Responsable de entrada en almacén</strong>
          <br />
          <strong>Nombre:</strong> {userReceived?.fullname} <br />
          <strong>Correo:</strong> {userReceived?.email} <br />
          <strong>Tipo de usuario:</strong> {RenderName_r} <br />
          <strong>Fecha de recepción:</strong>{" "}
          {localDate(EntryReport?.date_received?.[0])}
        </Typography>
      </Grid2>

      {/* Tabla con productos y opciones */}
      <Grid2 size={12}>
        <TableContainer component={Paper} sx={{ borderRadius: "20px" }}>
          <Table>
            <TableHead sx={{ bgcolor: teal[800] }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Código</TableCell>
                <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                <TableCell sx={{ color: "white" }}>Cantidad</TableCell>
                <TableCell sx={{ color: "white" }}>Cantidad recibida</TableCell>
                <TableCell sx={{ color: "white" }}>Ubicación</TableCell>
                <TableCell sx={{ color: "white" }}>Estado</TableCell>
                <TableCell sx={{ color: "white" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {EntryReport?.inputs?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.product_detail?.tag}</TableCell>
                  <TableCell>{product.product_detail?.name}</TableCell>
                  <TableCell>{product.product_detail?.quantity}</TableCell>
                  <TableCell>{product.quantity_received}</TableCell>
                  <TableCell>
                    {product.location !== null ? (
                      <Typography>
                        {ValuesLocation(product.location)}
                      </Typography>
                    ) : (
                      <Chip label="Sin ubicación" color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    {product.in_section ? (
                      <Chip label="Acomodado" color="success" />
                    ) : (
                      <Chip label="Sin acomodar" color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    {renderButtonActions(product)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Botón para finalizar si todos los productos están asignados */}
        {RenderButtonSubmit()}
      </Grid2>

      {/* Modal para asignar producto a una sección */}
      <Modal open={openModal.value} onClose={handleClose}>
        <Grid2 container sx={style}>
          {/* Botón para cerrar el modal */}
          <IconButton
            disableRipple
            aria-label="Cerrar"
            onClick={handleClose}
            sx={{ position: "absolute", transform: "translate(790%, -90%)" }}
          >
            <Close />
          </IconButton>
          {/* Escáner QR para validar la sección */}
          <QRScannerV2
            label="Escanear QR de la ubicación"
            title="Escanea el QR de la ubicación"
            setValueQR={setValuate}
          />
          {/* Información del producto */}
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>{renderProduct(openModal.data)}</CardContent>
          </Card>
          {/* Información de la sección */}
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>{renderSection(openModal.section)}</CardContent>
          </Card>
          {/* Botón para asignar ubicación */}
          {RenderButtonAsign(validation)}
        </Grid2>
      </Modal>

      {/* Modal para buscar y asignar sección */}
      <Modal open={openModalSection.value} onClose={handleCloseSection}>
        <Grid2 container sx={style}>
          {/* Botón para cerrar el modal */}
          <IconButton
            disableRipple
            aria-label="Cerrar"
            onClick={handleCloseSection}
            sx={{ position: "absolute", transform: "translate(790%, -90%)" }}
          >
            <Close />
          </IconButton>
          {/* Escáner QR para buscar sección */}
          <QRScannerV2
            setValueQR={setSection}
            title="Escanea el QR de la sección"
          />
          {/* Información del producto */}
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>{renderProduct(openModalSection.data)}</CardContent>
          </Card>
          {/* Información de la sección */}
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>{renderSection(section)}</CardContent>
          </Card>
          {/* Botón para asignar ubicación */}
          <Button
            variant="contained"
            onClick={handleSaveProductToSection}
            fullWidth
            color="success"
          >
            Asignar ubicación
          </Button>
        </Grid2>
      </Modal>
    </Grid2>
  );
};

export default ArrangeProducts;
