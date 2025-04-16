import React, { useEffect } from "react";
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
import {
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Workbook } from "exceljs";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  ScheduleSend as ScheduleSendIcon,
  ThumbUpAlt as ThumbUpAltIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";

// Componente de paginación personalizada para el DataGrid
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

// Icono personalizado para orden descendente
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono personalizado para orden ascendente
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono personalizado para columna sin ordenar
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación que utiliza el componente de paginación personalizada
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Barra de herramientas personalizada para el DataGrid
function CustomToolbar() {
  const apiRef = useGridApiContext();

  // Función para regresar a la primera página
  const handleGoToPage1 = () => apiRef.current.setPage(1);

  // Función para exportar los datos a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Pedidos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Cantidad de productos",
      "Tipo de envio",
      "Id de Pedido",
      "Fecha de solicitud"
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row.quantityProduct,
        row.typeDelivery,
        row.order_id,
        row.createdAt
      ]);
    });

    // Crear un archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Pedidos.xlsx");
    });
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <Button onClick={handleGoToPage1}>Regresar a la página 1</Button>
      <GridToolbarQuickFilter />
      <Button
        variant="text"
        startIcon={<DownloadIcon />}
        disableElevation
        sx={{ color: "secondary" }}
        onClick={exportToExcel}
      >
        Descargar Excel
      </Button>
    </GridToolbarContainer>
  );
}

// Componente principal que muestra los pedidos fuera de las regiones
const ShippingOutOfRegions = () => {
  const {
    loadPOOutOfRegions, // Carga los pedidos fuera de las regiones
    navigate, // Navegación entre rutas
    readyToPoint, // Datos listos para mostrar
    loading // Estado de carga
  } = useProductOrder();

  // Efecto para cargar los pedidos al montar el componente
  useEffect(() => {
    loadPOOutOfRegions();
  }, []);

  // Procesar los datos para agregar información adicional a las filas
  const rowsWithIds = readyToPoint.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      ...item,
    };
  });

  // Validar el estado de pago y redirigir según corresponda
  const paymentValuate = (row) => {
    if (row.payment_status !== 'approved') {
      Swal.fire('Pendiente de pago', '', 'error');
    } else {
      navigate(`/almacenista/surtir-venta/${row._id}`);
    }
  };

  // Renderizar iconos según el estado de la orden
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
        <Tooltip title="Asignar Ruta">
          <Button
            aria-label="Asignar Ruta"
            color="info"
            variant="outlined"
            onClick={() => navigate(`/almacenista/medio-de-envio/${values.row._id}`)}
          >
            Ruta
          </Button>
        </Tooltip>
      );
    } else if (!values.row.deliveryStatus) {
      return (
        <Tooltip title="En envío">
          <IconButton
            aria-label="En envío"
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

  // Mostrar pantalla de carga si los datos aún no están listos
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid container gap={1}>
      <Grid item xs={12}>
        <DataGrid
          sx={{ fontSize: "14px", fontFamily: "sans-serif" }}
          columns={[
            {
              field: "createdAt",
              headerName: "Fecha de solicitud",
              flex: 1,
              align: "center",
            },
            {
              field: "order_id",
              headerName: "Id de pedido",
              flex: 1,
              align: "center",
            },
            {
              field: "typeDelivery",
              headerName: "Tipo de envio",
              flex: 1,
              sortable: false,
            },
            {
              field: "Opciones",
              headerName: "Opciones",
              align: "center",
              flex: 1,
              sortable: false,
              type: "actions",
              getActions: (params) => [renderIcon(params)],
            },
          ]}
          rows={rowsWithIds} // Filas procesadas con datos adicionales
          autoHeight
          pagination
          slots={{
            pagination: CustomPagination, // Paginación personalizada
            toolbar: CustomToolbar, // Barra de herramientas personalizada
            columnSortedDescendingIcon: SortedDescendingIcon, // Icono para orden descendente
            columnSortedAscendingIcon: SortedAscendingIcon, // Icono para orden ascendente
            columnUnsortedIcon: UnsortedIcon, // Icono para columna sin ordenar
            noRowsOverlay: CustomNoRows, // Componente personalizado para cuando no hay filas
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
        />
      </Grid>
    </Grid>
  );
};

export default ShippingOutOfRegions;
