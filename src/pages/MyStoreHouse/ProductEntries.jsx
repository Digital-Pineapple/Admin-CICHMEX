// Importación de íconos y componentes necesarios de Material-UI y otras librerías
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
import { Add } from "@mui/icons-material";
import { Fab, Grid2, Typography } from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import { useAuthStore } from "../../hooks";
import EntriesOutputsModal from "../../components/Modals/EntriesOutputsModal";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

// Componente de paginación personalizada para la tabla
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext(); // Acceso al contexto de la tabla
  const pageCount = useGridSelector(apiRef, gridPageCountSelector); // Selección del número total de páginas

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount} // Número total de páginas
      page={page + 1} // Página actual (ajustada para que sea 1-indexada)
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1); // Cambio de página (ajustada para que sea 0-indexada)
      }}
    />
  );
}

// Íconos personalizados para el ordenamiento de columnas
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada que utiliza el componente Pagination
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Componente principal para mostrar las entradas de productos
const ProductEntries = () => {
  const { loadAllInputs, rowsAllInputs } = useProducts(); // Hook para cargar datos de entradas de productos
  const { loading } = useAuthStore(); // Estado de carga global
  const { user, navigate } = useAuthStore(); // Información del usuario y función de navegación
  const [open, setOpen] = useState(false); // Estado para controlar el modal
  const [details, setDetails] = useState(""); // Detalles del producto seleccionado

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false);
  };

  // Efecto para cargar las entradas de productos al montar el componente
  useEffect(() => {
    loadAllInputs();
  }, [user]);

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
      </GridToolbarContainer>
    );
  }

  // Mostrar pantalla de carga mientras se obtienen los datos
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: `/mi-almacen/productos/entradas`, name: "Todas mis entradas" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} gap={1}>
      {/* Título de la página */}
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
          <strong>Todas mis entradas de producto</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb y botón para agregar una nueva entrada */}
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
        <Fab
          onClick={() => navigate("/mi-almacen/agregar-entrada")} // Navegar a la página para agregar una entrada
          color="secondary"
          aria-label="Agregar entrada"
          title="Agragar entradas"
        >
          <Add />
        </Fab>
      </Grid2>

      {/* Tabla de datos de entradas de productos */}
      <Grid2 size={12}>
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
          localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Localización en español
          columns={[
            // Definición de las columnas de la tabla
            {
              field: "folio",
              headerName: "Folio",
              align: "center",
              flex: 1,
            },
            {
              field: "date",
              headerName: "Fecha",
              flex: 1,
              align: "center",
            },
            {
              field: "tag",
              headerName: "Código",
              flex: 1,
              align: "center",
            },
            {
              field: "product_name",
              headerName: "Nombre del prodcto",
              flex: 1,
              align: "center",
            },
            {
              field: "quantity",
              headerName: "Cantidad",
              flex: 1,
              align: "center",
            },
            {
              field: "quantity_received",
              headerName: "Cantidad recibida en almacen",
              flex: 1,
              align: "center",
            },
            {
              field: "newQuantity",
              headerName: "Nueva Cantidad",
              flex: 1,
              align: "center",
            },
            {
              field: "nowStock",
              headerName: "Stock actual",
              flex: 1,
              align: "center",
            },
            {
              field: "responsible",
              headerName: "Responsable",
              flex: 1,
              align: "center",
            },
          ]}
          rows={rowsAllInputs} // Datos de las filas
          pagination
          autoHeight
          density="compact"
          slots={{
            pagination: CustomPagination, // Paginación personalizada
            toolbar: CustomToolbar, // Barra de herramientas personalizada
            columnSortedDescendingIcon: SortedDescendingIcon, // Ícono para orden descendente
            columnSortedAscendingIcon: SortedAscendingIcon, // Ícono para orden ascendente
            columnUnsortedIcon: UnsortedIcon, // Ícono para columnas no ordenadas
            noRowsOverlay: CustomNoRows, // Componente personalizado para cuando no hay filas
          }}
          disableColumnFilter // Deshabilitar el filtro de columnas
          disableColumnMenu // Deshabilitar el menú de columnas
          disableColumnSelector // Deshabilitar el selector de columnas
          disableDensitySelector // Deshabilitar el selector de densidad
          slotProps={{
            toolbar: {
              showQuickFilter: true, // Mostrar filtro rápido
              quickFilterProps: { debounceMs: 500 }, // Configuración del filtro rápido
            },
          }}
          printOptions={{
            hideFooter: true, // Ocultar pie de página al imprimir
            hideToolbar: true, // Ocultar barra de herramientas al imprimir
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }, // Configuración inicial de la paginación
            },
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }], // Orden inicial por fecha descendente
            },
          }}
          style={{ fontFamily: "sans-serif", fontSize: "15px" }}
        />
      </Grid2>

      {/* Modal para mostrar detalles de entradas o salidas */}
      <EntriesOutputsModal
        open={open}
        handleClose={handleClose}
        details={details}
      />
    </Grid2>
  );
};

export default ProductEntries;
