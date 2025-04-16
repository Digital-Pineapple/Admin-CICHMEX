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
import {
  Add,
  Download,
  Edit,
  Refresh,
  Star,
  Start,
  ViewModule,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Tooltip,
  Grid2,
  Typography,
  Fab,
  Skeleton,
} from "@mui/material";
import { Workbook } from "exceljs";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore } from "../../hooks";
import { useSizeGuide } from "../../hooks/useSizeGuide";
import TableGuideModal from "../../components/Modals/TableGuideModal";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

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

// Iconos personalizados para el ordenamiento de columnas
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para la tabla
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const AllMySizeGuides = () => {
  const { user } = useAuthStore();
  const {
    loadSizeGuides, // Cargar todas las guías de tallas
    loadOneSizeGuide, // Cargar una guía de tallas específica
    rowsAllGuides, // Filas de datos para la tabla
    sizeGuide, // Datos de una guía de tallas específica
    deleteSizeGuide, // Eliminar una guía de tallas
    navigate, // Navegación entre rutas
    loading, // Estado de carga
  } = useSizeGuide();
  const [openModal, setOpenModal] = useState(false); // Estado para abrir/cerrar el modal

  // Cargar las guías de tallas al montar el componente
  useEffect(() => {
    loadSizeGuides();
  }, [user]);

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter variant="outlined" />
      </GridToolbarContainer>
    );
  }

  if (loading) return <LoadingScreenBlue />; // Mostrar pantalla de carga si está cargando

  // Manejar la apertura del modal con los datos de una guía específica
  const handleOpen = async (id) => {
    await loadOneSizeGuide(id);
    setOpenModal(true);
  };

  // Manejar el cierre del modal
  const handleClose = () => setOpenModal(false);

  const paths = [
    { path: `/guia-dimensiones`, name: "Guias de dimensiones" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2}>
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
          <strong>Guias de dimensiones</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb para navegación */}
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Tabla principal con las guías de tallas */}
      <DataGrid
        sx={{
          fontSize: "12px",
          fontFamily: "sans-serif",
          borderRadius: { xs: '5px', md: '20px' },
          bgcolor: "#fff",
          border: "1px solid rgb(209, 205, 205)",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgb(230, 223, 223)",
          },
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={[
          {
            field: "name",
            hideable: false,
            headerName: "Nombre del prodcto",
            flex: 1,
            sortable: false,
          },
          {
            field: "Category",
            headerName: "Categoria",
            flex: 1,
            align: "center",
          },
          {
            field: "SubCategory",
            headerName: "Subcategoria",
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
              // Botón para eliminar una guía de tallas
              <DeleteAlert
                title={`¿Estas seguro de eliminar esta guia de tallas ${params.row?.name}`}
                callbackToDeleteItem={() => deleteSizeGuide(params.row._id)}
              />,
              // Botón para editar una guía de tallas
              <Tooltip title="Editar Producto">
                <IconButton
                  aria-label="Editar"
                  color="success"
                  onClick={() => navigate(`/guia-dimensiones/editar/${params.row._id}`)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>,
              // Botón para ver detalles de una guía de tallas
              <Tooltip title="Ver detalle">
                <IconButton
                  aria-label="Ver detalle"
                  color="primary"
                  onClick={() => handleOpen(params.row._id)}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>,
            ],
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          },
          pagination: {
            paginationModel: { pageSize: 20 },
          },
        }}
        density="compact"
        rows={rowsAllGuides}
        pagination
        slots={{
          pagination: CustomPagination, // Paginación personalizada
          toolbar: CustomToolbar, // Barra de herramientas personalizada
          columnSortedDescendingIcon: SortedDescendingIcon, // Icono de orden descendente
          columnSortedAscendingIcon: SortedAscendingIcon, // Icono de orden ascendente
          columnUnsortedIcon: UnsortedIcon, // Icono de sin orden
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

      {/* Modal para mostrar detalles de una guía de tallas */}
      <TableGuideModal
        openModal={openModal}
        handleClose={handleClose}
        sizeGuide={sizeGuide}
      />
    </Grid2>
  );
};

export default AllMySizeGuides;
