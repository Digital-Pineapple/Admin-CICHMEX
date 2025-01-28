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
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

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

const Categories = () => {
  const { loadCategories, deleteCategory, categories, loading } =
    useCategories();
  useEffect(() => {
    loadCategories();
  }, []);

  const [open, setOpen] = useState({ value: false, category: null });
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState({value: false, category:null});

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
    setOpenUpdate({value:true, category: data});
  };
  const handleCloseUpdate = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpenUpdate({value: false, category: null})
    }
  };

  const rowsWithIds = (categories) =>
    categories?.map((category, _id) => ({
      id: _id.toString(),
      ...category,
    })) || [];

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

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between", paddingX:5 }}>
        <GridToolbarQuickFilter placeholder="Buscar" />
        <Button variant="text" onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
      </GridToolbarContainer>
    );
  }
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container maxWidth={"85vw"} gap={2}>
      <Grid2
        marginTop={{ xs: "-30px" }}
        size={12}
        className="Titles"
        minHeight={"80px"}
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Categorías
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Button
          onClick={() => loadCategories()}
          variant="contained"
          color="primary"
        >
          <RefreshOutlined />
          Recargar
        </Button>
        <Fab
          sx={{ right: "-80%" }}
          onClick={() => handleOpenCreate()}
          color="secondary"
          aria-label="Agregar categoría"
          title="Agragar categoría"
        >
          <Add />
        </Fab>
      </Grid2>

      <DataGrid
        sx={{ fontSize: "20px", marginTop: 2, fontFamily: "BikoBold" }}
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
               callbackToEdit={()=>handleOpenUpdate(params.row)}
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
            quickFilterProps: { debounceMs: 500},
          },
        }}
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
        style={{ fontFamily: "sans-serif", fontSize: "15px" }}
      />
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
      <Modal open={openCreate} onClose={handleCloseCreate}>
        <Box sx={style}>
          <CreateCategory handleClose={handleCloseCreate} />
        </Box>
      </Modal>
      <Modal open={openUpdate.value} onClose={handleCloseUpdate}>
        <Box sx={style}>
          <EditCategory handleClose={handleCloseUpdate} category={openUpdate.category} />
        </Box>
      </Modal>
    </Grid2>
  );
};

export default Categories;
