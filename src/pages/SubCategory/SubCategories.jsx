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
  Download,
  RefreshOutlined,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  Avatar,
  Grid,
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
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import DeleteAlert from "../../components/ui/DeleteAlert";
import EditButton from "../../components/Buttons/EditButton";
import { useSubCategories } from "../../hooks/useSubCategories";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore } from "../../hooks";
import CreateSubCategory from "./Create"
import EditSubcategory from "./Edit"
import { Box } from "@mui/system";
import { useCategories } from "../../hooks/useCategories";

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

const SubCategories = () => {
  const {
    loadSubCategories,
    deleteSubCategory,
    subCategories,
    loading,
  } = useSubCategories();
  const { loadCategories, categories } = useCategories();
  const { user } = useAuthStore();
  const callBackCategories = useCallback(() => {
    loadCategories();
    loadSubCategories();
  }, [user]);

  useEffect(() => {
    callBackCategories();
  }, [callBackCategories]);
  const [open, setOpen] = useState({ value: false, subCategory: null });
  const [openCreate, setOpenCreate] = useState({value: false, categories: []});
  const [openUpdate, setOpenUpdate] = useState({
    value: false,
    subCategory: null,
    categories: null
  });

  const handleOpen = async (data) => {
    setOpen({value:true, subCategory: data});
  };
  const handleClose = () => setOpen({value:false, subCategory:null});

  const handleOpenCreate = () => {
    setOpenCreate({value:true, categories: categories });
  };
  const handleCloseCreate = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpenCreate({value:false, categories: []});
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

  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Subcategorias");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow(["Nombre de la subcategoria"]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsSubCategories.forEach((row) => {
      worksheet.addRow([row.name]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "subcategorias.xlsx");
    });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();
    const handleGoToPage1 = () => apiRef.current.setPage(0);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between", paddingX:5 }}>
        <GridToolbarQuickFilter placeholder="Buscar" />
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
        {/* <Button
          variant="text"
          startIcon={<Download />}
          disableElevation
          sx={{ color: "secondary" }}
          onClick={exportToExcel}
        >
          Descargar Excel
        </Button> */}
      </GridToolbarContainer>
    );
  }

  const rowsSubCategories =(data) => data.map((i, _id) => ({
    id: _id.toString(),
    ...i,
  }));

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container gap={2} maxWidth={"85vw"}>
      <Grid2
        size={12}
        marginTop={{ xs: "-30px" }}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Sub-categorías
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Button
          onClick={() => {loadSubCategories(), loadCategories()}}
          variant="contained"
          color="primary"
        >
          <RefreshOutlined />
          Recargar
        </Button>
        <Fab
          sx={{ right: "-80%" }}
          onClick={() => handleOpenCreate() }
          color="secondary"
          aria-label="Agregar subcategoría"
          title="Agragar subcategoría"
        >
          <Add />
        </Fab>
      </Grid2>

      <DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
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
            sortModel: [{ field: "createdAt", sort: "asc" }],
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
      <Modal open={openCreate.value} onClose={handleCloseCreate}>
        <Box sx={style}>
          <CreateSubCategory categories={openCreate.categories} handleClose={handleCloseCreate} />
        </Box>
      </Modal>
      <Modal open={openUpdate.value} onClose={handleCloseUpdate}>
        <Box sx={style}>
          <EditSubcategory handleClose={handleCloseUpdate} subCategory={openUpdate.subCategory} categories={openUpdate.categories} />
        </Box>
      </Modal>
    </Grid2>
  );
};

export default SubCategories;
