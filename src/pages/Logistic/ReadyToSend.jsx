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
  LocalShipping,
  Refresh,
  Route,
  Star,
  Start,
  ViewModule,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Tooltip,
  Grid,
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
import { useProductOrder } from "../../hooks/useProductOrder";
import { localDate } from "../../Utils/ConvertIsoDate";

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

const ReadyToSend = () => {
  const { user } = useAuthStore();
  const { loadProductOrdersPaidAndFill, productOrders, loading } = useProductOrder()
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadProductOrdersPaidAndFill();
  }, [user]);
  console.log(productOrders);
  

  const rowsAllPO = productOrders?.map((item, index) => ({
    id: index,
    date: localDate(item.createdAt),
    supply_date: localDate(item.supply_detail.date),
    ...item,
  }));
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Productos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Nombre del producto",
      "Descripción",
      "Precio",
      "Tamaño",
      "Código",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    productOrders.forEach((row) => {
      worksheet.addRow([
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
      saveAs(blob, "productos.xlsx");
    });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
        <GridToolbarQuickFilter placeholder='Buscar'/>
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

  if (loading) return <LoadingScreenBlue />;

  const handleOpen = async (id) => {
    await loadOneSizeGuide(id);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  return (
    <Grid container gap={2} maxWidth={"85vw"}>
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Pedidos listos para envío
        </Typography>
      </Grid>
      <Grid item display={"flex"} justifyContent={"end"} rowSpacing={2} xs={12}>
        <Button
          size="small"
          startIcon={<Refresh />}
          variant="contained"
          color="primary"
          onClick={() => loadProductOrdersPaidAndFill()}
        >
          Recargar
        </Button>
      </Grid>
      <DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          {
            field: "date",
            headerName: "Fecha de compra",
            flex: 1,
            align: "center",
          },
          {
            field: "order_id",
            hideable: false,
            headerName: "Folio",
            flex: 1,
            sortable: false,
          },
          // {
          //   field: "price",
          //   headerName: "Precio",
          //   flex: 1,
          //   align: "center",
          // },
          {
            field: "supply_date",
            headerName: "Fecha de empaque",
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
              <Tooltip title="Asignar compañía de envios">
                <Button
                  aria-label="Editar"
                  color="success"
                  startIcon={<LocalShipping/>}
                  onClick={() => navigate(`/guia-dimensiones/editar/${params.row._id}` )}
                >
                 Asignar  
                </Button>
              </Tooltip>,
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
        rows={rowsAllPO}
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
    </Grid>
  );
};



export default ReadyToSend
