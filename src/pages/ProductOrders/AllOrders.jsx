import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import MuiPagination from "@mui/material/Pagination";
import {
  CancelScheduleSend,
  Clear,
  Done,
  Download,
  LocalShipping,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProductOrder } from "../../hooks/useProductOrder";
import PaidIcon from "@mui/icons-material/Paid";
import PendingIcon from "@mui/icons-material/Pending";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Swal from "sweetalert2";
import LoadingScreenBlue from '../../components/ui/LoadingScreenBlue'
import { useAuthStore } from "../../hooks";

// Componente de paginación personalizada para la tabla
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount} // Número total de páginas
      page={page + 1} // Página actual
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1); // Cambiar página
      }}
    />
  );
}

// Icono para indicar orden descendente en las columnas
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono para indicar orden ascendente en las columnas
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono para indicar que no hay orden aplicado en las columnas
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada que utiliza el componente Pagination
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Componente principal que muestra la tabla de todas las órdenes
const AllOrders = () => {
  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "85%" }}>
      {/* Contenedor principal de la tabla */}
      <Grid item xs={12} marginY={2}>
        <DataGrid
          sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
          columns={[
            // Columna para mostrar la fecha de solicitud
            {
              field: "createdAt",
              headerName: "Fecha de solicitud",
              flex: 1,
              align: "center",
            },
            // Columna para mostrar el código de pedido
            {
              field: "order_id",
              headerName: "Código de pedido",
              flex: 1,
              align: "center",
            },
            // Columna para mostrar el tipo de envío
            {
              field: "typeDelivery",
              hideable: false,
              headerName: "Tipo de envio",
              flex: 1,
              sortable: false,
            },
            // Columna para mostrar el estado del pago
            {
              field: "payment_status",
              headerName: "Status de pago",
              flex: 1,
              align: "center",
              renderCell: (params) =>
                params.value === "approved" ? (
                  <>
                    <Chip
                      icon={<PaidIcon />}
                      label="Pagado"
                      variant="outlined"
                      color="success"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<PendingIcon />}
                      label="Pendiente"
                      variant="outlined"
                      color="info"
                    />
                  </>
                ),
            },
            // Columna para mostrar si la orden fue preparada
            {
              field: "storeHouseStatus",
              headerName: "Orden preparada",
              flex: 1,
              align: "center",
              renderCell: (params) =>
                params.value === true ? (
                  <>
                    <Chip
                      icon={<Done />}
                      label="Surtido"
                      variant="outlined"
                      color="success"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<Clear />}
                      label="Pendiente"
                      variant="outlined"
                      color="error"
                    />
                  </>
                ),
            },
            // Columna para mostrar el estado de la ruta
            {
              field: "route_status",
              headerName: "Ruta",
              flex: 1,
              align: "center",
              renderCell: (params) =>
                params.value === true ? (
                  <>
                    <Chip
                      icon={<LocalShippingIcon />}
                      label="En camino"
                      variant="outlined"
                      color="success"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<CarCrashIcon />}
                      label="Sin ruta"
                      variant="outlined"
                      color="error"
                    />
                  </>
                ),
            },
            // Columna para mostrar si la orden fue entregada
            {
              field: "deliveryStatus",
              headerName: "Entregado",
              flex: 1,
              align: "center",
              renderCell: (params) =>
                params.value === true ? (
                  <>
                    <Chip
                      icon={<LocalShipping />}
                      label="Entregado"
                      variant="outlined"
                      color="success"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<CancelScheduleSend />}
                      label="Pendiente"
                      variant="outlined"
                      color="error"
                    />
                  </>
                ),
            },
          ]}
          rows={rowsWithIds} // Datos de las filas
          pagination
          slots={{
            pagination: CustomPagination, // Componente de paginación personalizada
            toolbar: CustomToolbar, // Barra de herramientas personalizada
            columnSortedDescendingIcon: SortedDescendingIcon, // Icono de orden descendente
            columnSortedAscendingIcon: SortedAscendingIcon, // Icono de orden ascendente
            columnUnsortedIcon: UnsortedIcon, // Icono de columna sin orden
          }}
          disableColumnFilter // Deshabilitar el filtro de columnas
          disableColumnMenu // Deshabilitar el menú de columnas
          disableColumnSelector // Deshabilitar el selector de columnas
          disableDensitySelector // Deshabilitar el selector de densidad
          slotProps={{
            toolbar: {
              showQuickFilter: true, // Mostrar el filtro rápido
              quickFilterProps: { debounceMs: 500 }, // Configuración del filtro rápido
            },
          }}
          printOptions={{
            hideFooter: true, // Ocultar pie de página al imprimir
            hideToolbar: true, // Ocultar barra de herramientas al imprimir
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AllOrders;
