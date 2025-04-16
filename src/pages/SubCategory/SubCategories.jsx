// Importación de íconos y componentes necesarios
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
import { useCallback, useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import {
  Add,
  Close,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Typography,
  Fab,
  Tooltip,
  IconButton,
  Grid2,
  Modal,
  Card,
  CardHeader,
  CardMedia,
} from "@mui/material";
import DeleteAlert from "../../components/ui/DeleteAlert";
import EditButton from "../../components/Buttons/EditButton";
import { useSubCategories } from "../../hooks/useSubCategories";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore } from "../../hooks";
import CreateSubCategory from "./Create";
import EditSubcategory from "./Edit";
import { Box } from "@mui/system";
import { useCategories } from "../../hooks/useCategories";
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

// Íconos personalizados para ordenamiento de columnas
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para DataGrid
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Estilo para los modales
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

// Componente principal de Subcategorías
const SubCategories = () => {
  // Hooks personalizados para cargar datos de subcategorías y categorías
  const { loadSubCategories, deleteSubCategory, subCategories, loading } =
    useSubCategories();
  const { loadCategories, categories } = useCategories();
  const { user } = useAuthStore();

  // Callback para cargar categorías y subcategorías
  const callBackCategories = useCallback(() => {
    loadCategories();
    loadSubCategories();
  }, [user]);

  // Efecto para cargar datos al montar el componente
  useEffect(() => {
    callBackCategories();
  }, [callBackCategories]);

  // Estados para manejar modales de creación, edición y visualización
  const [open, setOpen] = useState({ value: false, subCategory: null });
  const [openCreate, setOpenCreate] = useState({
    value: false,
    categories: [],
  });
  const [openUpdate, setOpenUpdate] = useState({
    value: false,
    subCategory: null,
    categories: null,
  });

  // Funciones para abrir y cerrar los modales
  const handleOpen = async (data) => {
    setOpen({ value: true, subCategory: data });
  };
  const handleClose = () => setOpen({ value: false, subCategory: null });

  const handleOpenCreate = () => {
    setOpenCreate({ value: true, categories: categories });
  };
  const handleCloseCreate = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpenCreate({ value: false, categories: [] });
    }
  };
  const handleOpenUpdate = (data) => {
    setOpenUpdate({ value: true, subCategory: data, categories: categories });
  };
  const handleCloseUpdate = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpenUpdate({ value: false, subCategory: null, categories: null });
    }
  };

  // Barra de herramientas personalizada para el DataGrid
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter variant="outlined" />
      </GridToolbarContainer>
    );
  }

  // Transformación de datos para las filas del DataGrid
  const rowsSubCategories = (data) =>
    data.map((i, _id) => ({
      id: _id.toString(),
      ...i,
    }));

  // Mostrar pantalla de carga si los datos aún no están disponibles
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Rutas para el componente de breadcrumb
  const paths = [{ path: `/mi-almacen/subcategorias`, name: "Subcategorías" }];

  return (
    <Grid2 paddingX={{ xs: 0, lg: 10 }} gap={2}>
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
          <strong>Subcategorías</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb y botón para agregar subcategorías */}
      <Grid2 size={12} m={2} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
        <Fab
          onClick={() => handleOpenCreate()}
          color="secondary"
          aria-label="Agregar subcategoría"
          title="Agragar subcategoría"
        >
          <Add />
        </Fab>
      </Grid2>

      {/* Tabla de subcategorías */}
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
            field: "name",
            hideable: false,
            headerName: "Nombre de la categoria",
            flex: 2,
            sortable: false,
          },
          {
            field: "subCategory_image",
            hideable: false,
            headerName: "Imagen",
            flex: 1,
            sortable: "false",
            renderCell: (params) =>
              params?.value ? (
                <Avatar alt={params.value} src={params.value} />
              ) : null,
          },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              <DeleteAlert
                title={`¿Desea eliminar ${params.row.name}?`}
                callbackToDeleteItem={() => deleteSubCategory(params.row._id)}
              />,
              <EditButton
                title={`Desea editar ${params.row.name}?`}
                callbackToEdit={() => handleOpenUpdate(params.row)}
              />,
              <Tooltip title="Ver detalle">
                <IconButton
                  color="primary"
                  aria-label="Ver detalle"
                  onClick={() => handleOpen(params.row)}
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
        rows={rowsSubCategories(subCategories)}
        density="standard"
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

      {/* Modal para ver detalles de una subcategoría */}
      <Modal open={open.value} onClose={handleClose}>
        <Card sx={style} variant="outlined">
          <CardHeader
            action={
              <IconButton onClick={() => handleClose()} aria-label="Cerrar">
                <Close />
              </IconButton>
            }
            title={`Nombre: ${open?.subCategory?.name}`}
          />
          <CardMedia
            sx={{ borderRadius: "10px" }}
            component={"img"}
            title="Imagen"
            image={open?.subCategory?.subCategory_image}
          />
        </Card>
      </Modal>

      {/* Modal para crear una nueva subcategoría */}
      <Modal open={openCreate.value} onClose={handleCloseCreate}>
        <Box sx={style}>
          <CreateSubCategory
            categories={openCreate.categories}
            handleClose={handleCloseCreate}
          />
        </Box>
      </Modal>

      {/* Modal para editar una subcategoría existente */}
      <Modal open={openUpdate.value} onClose={handleCloseUpdate}>
        <Box sx={style}>
          <EditSubcategory
            handleClose={handleCloseUpdate}
            subCategory={openUpdate.subCategory}
            categories={openUpdate.categories}
          />
        </Box>
      </Modal>
    </Grid2>
  );
};

export default SubCategories;
