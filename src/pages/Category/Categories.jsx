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
import { useSelector } from "react-redux";
import MuiPagination from "@mui/material/Pagination";
import {
  Add,
  Close,
  Download,
  RefreshOutlined,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import {
  Button,
  Avatar,
  Grid2,
  Typography,
  Fab,
  Tooltip,
  IconButton,
  Modal,
  Card,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import DeleteAlert from "../../components/ui/DeleteAlert";
import EditButton from "../../components/Buttons/EditButton";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CategoryModal from "../../components/Modals/CategoryModal";
import CreateCategory from "./Create";
import EditCategory from "./Edit";
import { Box } from "@mui/system";
import { esES } from "@mui/x-data-grid/locales";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

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

// Icono para indicar orden descendente
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono para indicar orden ascendente
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono para indicar que no hay orden aplicado
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

// Componente principal para la gestión de categorías
const Categories = () => {
  const { loadCategories, deleteCategory, categories, loading } =
    useCategories();

  // Cargar las categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, []);

  // Estados para manejar la apertura y cierre de modales
  const [open, setOpen] = useState({ value: false, category: null });
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState({
    value: false,
    category: null,
  });

  // Funciones para manejar la apertura y cierre de los modales
  const handleOpen = (data) => {
    setOpen({ value: true, category: data });
  };
  const handleClose = () => setOpen({ value: false, category: null });

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpenCreate(false);
    }
  };

  const handleOpenUpdate = (data) => {
    setOpenUpdate({ value: true, category: data });
  };
  const handleCloseUpdate = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpenUpdate({ value: false, category: null });
    }
  };

  // Agregar un ID único a cada categoría para usar en el DataGrid
  const rowsWithIds = (categories) =>
    categories?.map((category, _id) => ({
      id: _id.toString(),
      ...category,
    })) || [];

  // Exportar las categorías a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Categorias");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre de la categoria",
      "Imagen",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([row._id, row.name]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "categorias.xlsx");
    });
  };

  // Barra de herramientas personalizada para el DataGrid
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "center", paddingX: 5 }}>
        <GridToolbarQuickFilter variant="outlined" />
      </GridToolbarContainer>
    );
  }

  // Mostrar pantalla de carga mientras se obtienen las categorías
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Rutas para el componente de Breadcrumb
  const paths = [{ path: `/mi-almacen/categorías`, name: "Categorías" }];

  return (
    <Grid2 paddingX={{ xs: 0, lg: 10 }} gap={2}>
      {/* Encabezado con el título de la página */}
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
          <strong>Categorias</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb y botón para agregar categorías */}
      <Grid2 size={12} m={2} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />

        <Fab
          onClick={() => handleOpenCreate()}
          color="secondary"
          aria-label="Agregar categoría"
          title="Agragar categoría"
        >
          <Add />
        </Fab>
      </Grid2>

      {/* Tabla de categorías */}
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
            field: "category_image",
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
                callbackToDeleteItem={() => deleteCategory(params.row._id)}
              />,
              <EditButton
                title={`Desea editar ${params.row.name}?`}
                callbackToEdit={() => handleOpenUpdate(params.row)}
              />,
              <Tooltip title="Ver Detalles">
                <IconButton
                  aria-label="ver detalle"
                  color="primary"
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
            sortModel: [{ field: "createdAt", sort: "asc" }],
          },
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        density="standard"
        rows={rowsWithIds(categories)}
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

      {/* Modal para mostrar detalles de una categoría */}
      <Modal open={open.value} onClose={handleClose}>
        <Card sx={style} variant="outlined">
          <CardHeader
            action={
              <IconButton onClick={() => handleClose()} aria-label="Cerrar">
                <Close />
              </IconButton>
            }
            title={`Nombre: ${open?.category?.name}`}
          />
          <CardMedia
            sx={{ borderRadius: "10px" }}
            component={"img"}
            title="Imagen"
            image={open?.category?.category_image}
          />
        </Card>
      </Modal>

      {/* Modal para crear una nueva categoría */}
      <Modal open={openCreate} onClose={handleCloseCreate}>
        <Box sx={style}>
          <CreateCategory handleClose={handleCloseCreate} />
        </Box>
      </Modal>

      {/* Modal para editar una categoría existente */}
      <Modal open={openUpdate.value} onClose={handleCloseUpdate}>
        <Box sx={style}>
          <EditCategory
            handleClose={handleCloseUpdate}
            category={openUpdate.category}
          />
        </Box>
      </Modal>
    </Grid2>
  );
};

export default Categories;
