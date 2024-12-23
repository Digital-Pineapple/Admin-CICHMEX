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
  Download,
  LocalShipping,
  Refresh,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { Workbook } from "exceljs";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore } from "../../hooks";
import { useProductOrder } from "../../hooks/useProductOrder";
import { localDate } from "../../Utils/ConvertIsoDate";
import Grid from "@mui/material/Grid2";
import AssignRoute from "../MyStoreHouse/ AssignRoute";
import { borderRadius } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius:'15px',
  boxShadow: 24,
  p: 4,
};

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

const ReadyToSend = ({rows = [], loading = false}) => {

  const [openModal, setOpenModal] = useState({ value: false, selectedPO: {} });
  const handleOpen = (data) =>
    setOpenModal({ value: true, selectedPO: { data } });
  const handleClose = () => setOpenModal({ value: false, selectedPO: {} });

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
    rows.forEach((row) => {
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
        <GridToolbarQuickFilter placeholder="Buscar" />
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

  return (
    <Grid container gap={2} maxWidth={"85vw"}>
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
                  aria-label="Asignar envio"
                  color="success"
                  startIcon={<LocalShipping />}
                  onClick={() => handleOpen(params.row) }
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
        rows={rows}
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

      <Modal
        open={openModal.value}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose(event);  // Solo cerrar si no es un clic en el backdrop
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={{...style}}>
        <AssignRoute productOrder={openModal.selectedPO} handleClose={handleClose} />
        </Box>
      </Modal>
    </Grid>
  );
};

export default ReadyToSend;
