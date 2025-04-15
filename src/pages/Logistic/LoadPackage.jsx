// Importación de iconos y componentes necesarios
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
import { useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import { Button, Grid2, Tooltip, Typography } from "@mui/material";
import { Workbook } from "exceljs";
import { useProductOrder } from "../../hooks/useProductOrder";
import { saveAs } from "file-saver";
import Download from "@mui/icons-material/Download";
import Swal from "sweetalert2";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import LoadPackageModal from "../../components/Modals/LoadPackageModal";
import { useAuthStore } from "../../hooks";
import { localDate } from "../../Utils/ConvertIsoDate";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

// Componente de paginación personalizada
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext(); // Acceso a la API de la tabla
  const pageCount = useGridSelector(apiRef, gridPageCountSelector); // Obtiene el número total de páginas

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount} // Número total de páginas
      page={page + 1} // Página actual
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1); // Cambia de página
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

// Icono para columna sin ordenar
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para DataGrid
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Componente principal de la página
const LoadPackage = () => {
  const { loadAssignedPO, navigate, productOrders, loading } = useProductOrder(); // Hook para manejar órdenes de productos
  const { user } = useAuthStore(); // Hook para manejar información del usuario

  useEffect(() => {
    loadAssignedPO(); // Carga las órdenes asignadas al montar el componente
  }, [user]);

  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura del modal
  const [valuePO, setValuePO] = useState(null); // Estado para almacenar la orden seleccionada

  // Maneja la apertura del modal con los valores seleccionados
  const handleOpen = (values) => {
    setValuePO(values);
    setOpenModal(true);
  };

  // Maneja el cierre del modal
  const handleClose = () => {
    setValuePO(null);
    setOpenModal(false);
  };

  // Mapea las órdenes de productos para agregar información adicional
  const rowsWithIds = productOrders?.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity); // Obtiene las cantidades de productos
    const suma = quantities.reduce(
      (valorAnterior, valorActual) => valorAnterior + valorActual,
      0
    ); // Suma las cantidades
    const date = localDate(item.createdAt); // Convierte la fecha al formato local
    const TD = item.branch ? "En Punto de entrega" : "A domicilio"; // Determina el tipo de entrega
    const statusRoute =
      item?.route_detail?.route_status === "assigned"
        ? "Asignado"
        : "No asignado"; // Determina el estado de la ruta

    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      status_route: statusRoute,
      date: date,
      ...item,
    };
  });

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1); // Función para ir a la primera página

    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter variant="outlined" /> {/* Filtro rápido */}
      </GridToolbarContainer>
    );
  }

  // Muestra una pantalla de carga si los datos aún no están disponibles
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Rutas para el componente de breadcrumb
  const paths = [
    {
      path: "/transportista/cargar-paquete",
      name: "Paquetes listos para cargar",
    },
  ];

  return (
    <Grid2 container paddingX={{ lg: 10 }} display="flex" gap={2}>
      {/* Título de la página */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">
          <strong>Paquetes listos para cargar</strong>
        </Typography>
      </Grid2>

      {/* Componente de breadcrumb */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Tabla de datos */}
      <Grid2 size={12}>
        <DataGrid
          sx={{
            fontSize: "12px",
            fontFamily: "sans-serif",
            borderRadius: "20px",
            bgcolor: "#fff",
            border: "1px solid rgb(209, 205, 205)", // Borde exterior
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgb(230, 223, 223)", // Borde interno
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Traducción al español
          columns={[
            {
              field: "date",
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
              field: "status_route",
              hideable: false,
              headerName: "Estado de ruta",
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
              getActions: (params) => [
                <Button
                  onClick={() => handleOpen(params.row)} // Abre el modal con la fila seleccionada
                  variant="text"
                  color="primary"
                >
                  Cargar Paquete
                </Button>,
              ],
            },
          ]}
          rows={rowsWithIds} // Filas con datos procesados
          pagination
          slots={{
            pagination: CustomPagination, // Paginación personalizada
            toolbar: CustomToolbar, // Barra de herramientas personalizada
            columnSortedDescendingIcon: SortedDescendingIcon, // Icono de orden descendente
            columnSortedAscendingIcon: SortedAscendingIcon, // Icono de orden ascendente
            columnUnsortedIcon: UnsortedIcon, // Icono de columna sin ordenar
          }}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }, // Filtro rápido con debounce
            },
          }}
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
      </Grid2>

      {/* Modal para cargar paquetes */}
      <LoadPackageModal
        openModal={openModal}
        handleClose={handleClose}
        productOrder={valuePO}
      />
    </Grid2>
  );
};

export default LoadPackage;
