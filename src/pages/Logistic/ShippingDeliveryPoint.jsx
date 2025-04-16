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
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";

// Componente para la paginación personalizada
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

// Icono para indicar orden descendente
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono para indicar orden ascendente
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono para indicar que no hay orden
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para la tabla
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Componente principal para gestionar los puntos de entrega de envíos
const ShippingDeliveryPoint = () => {
  const {
    loadPOPaidAndSuplyToPoint, // Carga los pedidos pagados y suministrados al punto de entrega
    navigate, // Navegación entre rutas
    productOrders, // Lista de pedidos de productos
    loading, // Estado de carga
  } = useProductOrder();
  const { user } = useAuthStore();

  // Efecto para cargar los pedidos al montar el componente
  useEffect(() => {
    loadPOPaidAndSuplyToPoint();
  }, [user]);

  // Mapeo de los pedidos para agregar propiedades adicionales necesarias para la tabla
  const rowsWithIds = productOrders?.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    const statusRoute = item?.route_detail?.route_status ? item?.route_detail?.route_status : 'No signado';
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      status_route: statusRoute,
      ...item,
    };
  });

  // Función para exportar los datos a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Stock de productos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Cantidad de productos",
      "Tipo de envio",
      "Existencias",
      "Precio",
      "Tamaño",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row._id,
        row.name,
        row.description,
        row.price,
        row.size,
        row.tag,
      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Pedidos.xlsx");
    });
  };

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
        <GridToolbarQuickFilter />
        <Button
          variant="text"
          startIcon={<Download />}
          disableElevation
          sx={{ color: "secondary" }}
          onClick={exportToExcel}
        >
          Descargar Excel
        </Button>
      </GridToolbarContainer>
    );
  }

  // Validación de pago antes de navegar a otra ruta
  const paymentValuate = (row) => {
    if (row.payment_status !== 'approved') {
      Swal.fire('Pendiente de pago', '', 'error');
    } else {
      navigate(`/auth/surtir-orden/${row._id}`);
    }
  };

  // Renderizado de íconos según el estado del pedido
  const renderIcon = (values) => {
    if (!values.row.storeHouseStatus) {
      return (
        <Tooltip title="Surtir orden">
          <Button
            aria-label="Surtir"
            color="success"
            onClick={() => paymentValuate(values.row)}
            variant="outlined"
          >
            Surtir
          </Button>
        </Tooltip>
      );
    } else if (!values.row.route_status) {
      return (
        <Tooltip title="Asignar ruta">
          <Button
            aria-label="Asignar ruta"
            color="info"
            variant="outlined"
            onClick={() => navigate(`/auth/asignar-ruta/${values.row._id}`)}
          >
            Enviar
          </Button>
        </Tooltip>
      );
    } else if (!values.row.deliveryStatus) {
      return (
        <Tooltip title="En envio">
          <IconButton
            aria-label="secondary"
            color="secondary"
          >
            <ScheduleSendIcon />
          </IconButton>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Pedido entregado">
          <IconButton
            aria-label="Pedido entregado"
            color="primary"
          >
            <ThumbUpAltIcon />
          </IconButton>
        </Tooltip>
      );
    }
  };

  // Mostrar pantalla de carga si los datos aún no están disponibles
  if (loading) {
    return (<LoadingScreenBlue />);
  }

  // Renderizado principal del componente
  return (
    <Grid container>
      <Grid item xs={12} marginY={2}>
        <DataGrid
          sx={{ fontSize: "14px", fontFamily: "sans-serif" }}
          columns={[
            {
              field: "createdAt",
              headerName: "Fecha de solicitud",
              align: "center",
            },
            {
              field: "order_id",
              headerName: "Id de pedido",
              align: "center",
            },
            {
              field: "status_route",
              hideable: false,
              headerName: "Estado de ruta",
              sortable: false,
            },
            {
              field: "Opciones",
              headerName: "Opciones",
              align: "center",
              sortable: false,
              type: "actions",
              getActions: (params) => [renderIcon(params)],
            },
          ]}
          rows={rowsWithIds}
          pagination
          slots={{
            pagination: CustomPagination,
            toolbar: CustomToolbar,
            columnSortedDescendingIcon: SortedDescendingIcon,
            columnSortedAscendingIcon: SortedAscendingIcon,
            columnUnsortedIcon: UnsortedIcon,
            noRowsOverlay: CustomNoRows,
          }}
          autoHeight
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
        />
      </Grid>
    </Grid>
  );
};

export default ShippingDeliveryPoint;