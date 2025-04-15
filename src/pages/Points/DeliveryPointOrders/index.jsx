import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid2,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { Check,HandshakeOutlined,QrCode } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import useDeliveryPoints from "../../../hooks/useDeliveryPoints";
import QRScannerV2 from "../../../components/QR/QRScannerV2";
import { esES } from "@mui/x-data-grid/locales";
import {useProductOrder} from '../../../hooks/useProductOrder'
import Swal from "sweetalert2";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'20px',
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection:'column',
  gap:1
};

export const DeliveryPointsOrder = () => {
  // Obtiene los parámetros de la URL (id y nombre de la sucursal)
  const { id, name } = useParams();

  // Hooks personalizados para cargar pedidos y verificar QR
  const { onLoadOrdersByPointDelivery, orders } = useDeliveryPoints();
  const { loadVerifyQRtoPoint, loadVerifyQR } = useProductOrder();

  // Estados para manejar los modales y sus datos
  const [openModal, setOpenModal] = useState({ value: false, data: null });
  const [validation, setValidation] = useState(false);
  const [valueQR, setValueQR] = useState('');
  const [openModalSupply, setOpenModalSupply] = useState({ value: false, data: null });
  const [validationSupply, setValidationSupply] = useState(false);
  const [valueQRSupply, setValueQRSupply] = useState('');

  // Mapea los pedidos para asignar un id único a cada fila
  const rowsWithIds = orders.map((order, _id) => ({
    id: _id.toString(),
    ...order,
  }));

  // Abre el modal para leer el QR del paquete
  const handleOpenModal = (values) => {
    setOpenModal({ value: true, data: values });
  };

  // Cierra el modal de lectura de QR del paquete
  const handleCloseModal = () => {
    setOpenModal({ value: false, data: null });
    setValueQR('');
    setValidation(false);
  };

  // Abre el modal para leer el QR del cliente
  const handleOpenModalSupply = (values) => {
    setOpenModalSupply({ value: true, data: values });
  };

  // Cierra el modal de lectura de QR del cliente
  const handleCloseModalSupply = () => {
    setOpenModalSupply({ value: false, data: null });
    setValueQRSupply('');
    setValidationSupply(false);
  };

  // Carga los pedidos del punto de entrega al montar el componente
  useEffect(() => {
    onLoadOrdersByPointDelivery(id);
  }, []);

  // Valida el código QR del paquete
  const validationCode = (value) => {
    if (value === openModal.data.order_id) {
      setValidation(true);
    } else {
      Swal.fire({ title: 'No coincide con QR de paquete', icon: 'error' });
    }
  };

  // Valida el código QR del cliente
  const validationCodeSupply = (value) => {
    if (value === openModalSupply.data.order_id) {
      setValidationSupply(true);
    } else {
      Swal.fire({ title: 'No coincide con paquete', icon: 'error' });
    }
  };

  // Observa cambios en el QR del paquete y valida el código
  useEffect(() => {
    if (valueQR) {
      validationCode(valueQR.order_id);
    }
  }, [valueQR]);

  // Observa cambios en el QR del cliente y valida el código
  useEffect(() => {
    if (valueQRSupply) {
      validationCodeSupply(valueQRSupply.order);
    }
  }, [valueQRSupply]);

  // Verifica el paquete en el punto de entrega
  const VerifyPackage = () => {
    loadVerifyQRtoPoint({ order_id: openModal.data.order_id }, handleCloseModal);
  };

  // Entrega el paquete al cliente
  const SupplyPackage = () => {
    loadVerifyQR(valueQRSupply, handleCloseModalSupply);
  };
  
  

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2}>
      {/* Encabezado con el nombre de la sucursal y título de la página */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: "16px", lg: "25px" } }}>
        <strong>Sucursal: {name}</strong><br />
        Detalle de pedidos
        </Typography>
      </Grid2>

      {/* Tabla de datos con los pedidos */}
      <DataGrid
        sx={{
          fontSize: "12px",
          fontFamily: "sans-serif",
          borderRadius: "20px",
          bgcolor: "#fff",
          border: "1px solid rgb(209, 205, 205)", // Borde exterior naranja
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgb(230, 223, 223)", // Borde interno claro
          },
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={[
          {
            field: "order_id",
            hideable: false,
            headerName: "Folio del pedido",
            flex: 2,
            sortable: false,
          },
          {
            field: "point_pickup_status",
            hideable: false,
            headerName: "Estatus",
            flex: 2,
            sortable: false,
            renderCell: (params) => {
              // Renderiza un Chip con el estado del pedido
              let label;
              let color;
              if (params.row.deliveryStatus) {
                label = "Entregado";
                color = "primary";
              } else if (params.row.point_pickup_status) {
                label = "En punto de entrega";
                color = "success";
              } else {
                label = "Pendiente";
                color = "secondary";
              }
              return <Chip label={label} color={color} variant="outlined" />;
            },
          },
          {
            hideable: false,
            headerName: "Opciones",
            flex: 2,
            sortable: false,
            renderCell: (params) => (
              <>
                {/* Botón para leer el QR del paquete */}
                <Tooltip title={'Leer Qr'} >
                  <IconButton disabled={params.row.point_pickup_status} onClick={() => handleOpenModal(params.row)}>
                    <QrCode/>
                  </IconButton>
                </Tooltip>
                {/* Botón para entregar el paquete */}
                <Tooltip title={'Entregar'} >
                  <IconButton disabled={!params.row.point_pickup_status} onClick={() => handleOpenModalSupply(params.row)}>
                    <HandshakeOutlined/>
                  </IconButton>
                </Tooltip>
              </>
            )
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          },
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        density="standard"
        rows={rowsWithIds}
        pagination
        slots={{
          pagination: CustomPagination,
          toolbar: CustomToolbar,
          columnSortedDescendingIcon: SortedDescendingIcon,
          columnSortedAscendingIcon: SortedAscendingIcon,
          columnUnsortedIcon: UnsortedIcon,
        }}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
        style={{ fontFamily: "sans-serif", fontSize: "15px" }}
      />
      
      {/* Modal para leer el QR del paquete */}
      <Modal
        open={openModal.value}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-QR"
        aria-describedby="modal-modal-QR"
      >
        <Box sx={style}>
          <Typography id="modal-modal-QR" variant="h6" component="h2">
            Leer qr del paquete : <strong>{openModal.data?.order_id}</strong> 
          </Typography>
          {/* Componente de escaneo de QR */}
          <QRScannerV2 setValueQR={setValueQR}  title={`Paquete: ${openModal?.data?.order_id}`} />
          {/* Botón para confirmar la recepción del paquete */}
          <Button startIcon={<Check/>} 
          disabled={!validation} variant="contained" 
          fullWidth color="success"
          onClick={VerifyPackage}
          >
            Recibir paquete
          </Button>
        </Box>
      </Modal>

      {/* Modal para leer el QR del cliente */}
      <Modal
        open={openModalSupply.value}
        onClose={handleCloseModalSupply}
        aria-labelledby="modal-modal-Supply-QR"
        aria-describedby="modal-modal-Supply-QR"
      >
        <Box sx={style}>
          <Typography id="modal-modal-supply-QR" variant="h6" component="h2">
            Leer qr del cliente : <strong>{openModalSupply.data?.order_id}</strong> <br />
            Cliente: <strong>{openModalSupply.data?.user_id.fullname}</strong>
          </Typography>
          {/* Componente de escaneo de QR */}
          <QRScannerV2 setValueQR={setValueQRSupply}  title={`Leer codigo del cliente`} />
          {/* Botón para confirmar la entrega del paquete */}
          <Button startIcon={<Check/>} 
          disabled={!validationSupply} variant="contained" 
          fullWidth color="success"
          onClick={SupplyPackage}
          >
            Entregar paquete
          </Button>
        </Box>
      </Modal>
    </Grid2>
  );
};

// Barra de herramientas personalizada para la tabla
function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: "center" }}>
      <GridToolbarQuickFilter variant="outlined" />
    </GridToolbarContainer>
  );
}

// Componente de paginación personalizada
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

// Icono para orden descendente
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono para orden ascendente
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono para columna sin orden
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para la tabla
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
