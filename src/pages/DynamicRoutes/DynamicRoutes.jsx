import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
  DataGrid,
  GridActionsCellItem,
  GridPagination,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useServices } from "../../hooks/useServices";
import MuiPagination from "@mui/material/Pagination";
import { Add, Download, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { redirectPages } from "../../helpers";
import {
  Button,
  IconButton,
  Tooltip,
  Grid2,
  Typography,
  Fab,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import { editOneProduct } from "../../store/actions/productsActions";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore } from "../../hooks";
import { useDynamicRoutes } from "../../hooks/useDynamicRoutes";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import { esES } from "@mui/x-data-grid/locales";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

// Componente de paginación personalizada para la tabla
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
        onPageChange(event, newPage - 1); // Cambia la página actual
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

// Componente de paginación personalizada para integrarlo con DataGrid
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Componente principal de rutas dinámicas
const DynamicRoutes = () => {
  const { user } = useAuthStore(); // Obtiene información del usuario autenticado
  const {
    loadDynamicRoutes, // Carga las rutas dinámicas desde el backend
    rowsRoutes, // Datos de las rutas dinámicas
    loading, // Estado de carga
    navigate, // Navegación entre rutas
    deleteDynamicRoute, // Función para eliminar una ruta dinámica
  } = useDynamicRoutes();

  // Efecto para cargar las rutas dinámicas al montar el componente
  useEffect(() => {
    loadDynamicRoutes();
  }, [user]);

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1); // Navega a la primera página

    return (
      <GridToolbarContainer sx={{ justifyContent: "center", m: 1 }}>
        <GridToolbarQuickFilter label="Buscar" variant="outlined" /> {/* Filtro rápido */}
      </GridToolbarContainer>
    );
  }

  // Muestra una pantalla de carga mientras se obtienen los datos
  if (loading) return <LoadingScreenBlue />;

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: `/url`, name: "Mis url's" },
  ];

  return (
    <Grid2 container gap={2} paddingX={{ xs: 10 }}>
      {/* Encabezado de la página */}
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
          <strong>Mis url's</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb y botón para agregar nueva ruta */}
      <Grid2 size={12} display={"flex"} margin={2} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} /> {/* Componente de breadcrumb */}

        <Fab
          onClick={() =>
            navigate("/url/agregar", { replace: true }) // Navega a la página de agregar ruta
          }
          color="secondary"
          aria-label="Alta de transportista"
          title="Alta de transportista"
        >
          <Add />
        </Fab>
      </Grid2>

      {/* Tabla de rutas dinámicas */}
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
        localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Traducción al español
        columns={[
          {
            field: "name",
            headerName: "Nombre",
            flex: 1,
            align: "center",
          },
          {
            field: "component",
            headerName: "Componente",
            flex: 1,
            align: "center",
          },
          {
            field: "path",
            hideable: false,
            headerName: "Ruta",
            flex: 2,
            sortable: false,
          },
          {
            field: "rolesAllowed",
            headerName: "Roles Permitidos",
            flex: 1,
            align: "center",
          },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              // Botón para eliminar una ruta
              <DeleteAlert
                title={`¿Estas seguro de eliminar la ruta: ${params.row?.name}`}
                callbackToDeleteItem={() => deleteDynamicRoute(params.row._id)}
              />,
              // Botón para editar una ruta
              <Tooltip title="Editar Ruta">
                <IconButton
                  aria-label="Editar"
                  color="success"
                  onClick={() =>
                    navigate(`/url/editar/${params.row._id}`, { replace: true })
                  }
                >
                  <Edit />
                </IconButton>
              </Tooltip>,
            ],
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "name", sort: "desc" }], // Orden inicial por nombre descendente
          },
          pagination: {
            paginationModel: { pageSize: 20 }, // Tamaño de página inicial
          },
        }}
        density="compact" // Densidad compacta para la tabla
        rows={rowsRoutes} // Datos de las rutas
        pagination
        slots={{
          pagination: CustomPagination, // Paginación personalizada
          toolbar: CustomToolbar, // Barra de herramientas personalizada
          columnSortedDescendingIcon: SortedDescendingIcon, // Icono de orden descendente
          columnSortedAscendingIcon: SortedAscendingIcon, // Icono de orden ascendente
          columnUnsortedIcon: UnsortedIcon, // Icono de columna sin ordenar
          noRowsOverlay: CustomNoRows, // Componente para mostrar cuando no hay filas
        }}
        disableColumnFilter // Desactiva el filtro de columnas
        disableColumnMenu // Desactiva el menú de columnas
        disableColumnSelector // Desactiva el selector de columnas
        disableDensitySelector // Desactiva el selector de densidad
        slotProps={{
          toolbar: {
            showQuickFilter: true, // Muestra el filtro rápido
            quickFilterProps: { debounceMs: 500 }, // Configuración del filtro rápido
          },
        }}
        printOptions={{
          hideFooter: true, // Oculta el pie de página al imprimir
          hideToolbar: true, // Oculta la barra de herramientas al imprimir
        }}
        style={{ fontFamily: "sans-serif", fontSize: "15px" }}
      />
    </Grid2>
  );
};

export default DynamicRoutes;
