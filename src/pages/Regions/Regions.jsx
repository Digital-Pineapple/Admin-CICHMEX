import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Workbook } from "exceljs";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  ScheduleSend as ScheduleSendIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  Visibility,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import { useRegions } from "../../hooks/useRegions";
import MultiRegionMap from "./MultiRegionMap";
import DeleteAlert from "../../components/ui/DeleteAlert";
import EditButton from "../../components/Buttons/EditButton";
import { loadOneRoute } from "../../store/actions/dynamicRouteActions";
import RegionDetailModal from "../../components/Modals/RegionDetailModal";

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

// Barra de herramientas personalizada para DataGrid
function CustomToolbar() {
  const apiRef = useGridApiContext();

  // Función para regresar a la primera página
  const handleGoToPage1 = () => apiRef.current.setPage(1);

  // Función para exportar datos a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Pedidos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Cantidad de productos",
      "Tipo de envio",
      "Id de Pedido",
      "Fecha de solicitud",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row.quantityProduct,
        row.typeDelivery,
        row.order_id,
        row.createdAt,
      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Pedidos.xlsx");
    });
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <Button onClick={handleGoToPage1}>Regresar a la página 1</Button>
      <GridToolbarQuickFilter />
      <Button
        variant="text"
        startIcon={<DownloadIcon />}
        disableElevation
        sx={{ color: "secondary" }}
        onClick={exportToExcel}
      >
        Descargar Excel
      </Button>
    </GridToolbarContainer>
  );
}

// Componente principal para la gestión de regiones
const Regions = () => {
  const { navigate, loading } = useProductOrder();
  const { loadAllRegions, regions, onDeleteRegion, loadOneRegion, region } = useRegions();
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);

  // Cargar todas las regiones al montar el componente
  useEffect(() => {
    loadAllRegions();
  }, [user]);

  // Agregar un identificador único a cada fila
  const rowsWithIds = regions?.map((item, index) => ({
    id: index,
    ...item,
  }));

  // Abrir modal de detalles de región
  const handleOpen = (id) => {
    loadOneRegion(id);
    setOpen(true);
  };

  // Cerrar modal de detalles de región
  const handleClose = () => {
    setOpen(false);
  };

  // Mostrar pantalla de carga si los datos están cargando
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid container gap={1}>
      {/* Título de la página */}
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
          Regiones
        </Typography>
      </Grid>

      {/* Mapa con múltiples regiones */}
      <Grid item xs={12}>
        <MultiRegionMap regions={regions} />
      </Grid>

      {/* Tabla de datos de regiones */}
      <Grid item xs={12}>
        <DataGrid
          sx={{ fontSize: "14px", fontFamily: "sans-serif" }}
          columns={[
            {
              field: "regionCode",
              headerName: "Código",
              flex: 1,
              align: "center",
            },
            {
              field: "name",
              headerName: "Nombre de la region",
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
                // Botón para eliminar una región
                <DeleteAlert
                  title={`¿Desea eliminar ${params.row.name}?`}
                  callbackToDeleteItem={() => onDeleteRegion(params.row._id)}
                />,
                // Botón para ver detalles de una región
                <Tooltip title="Ver Detalles">
                  <IconButton
                    aria-label="ver detalle"
                    color="primary"
                    onClick={() => handleOpen(params.row._id)}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>,
                // Botón para editar una región
                <EditButton
                  title={`Desea editar ${params.row.name}?`}
                  callbackToEdit={() =>
                    navigate(`/region/editar/${params.row._id}`)
                  }
                />,
              ],
            },
          ]}
          rows={rowsWithIds}
          autoHeight
          pagination
          slots={{
            pagination: CustomPagination,
            toolbar: CustomToolbar,
            columnSortedDescendingIcon: SortedDescendingIcon,
            columnSortedAscendingIcon: SortedAscendingIcon,
            columnUnsortedIcon: UnsortedIcon,
            noRowsOverlay: CustomNoRows,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          density="compact"
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
        />
      </Grid>

      {/* Modal para mostrar detalles de una región */}
      {open ? (
        <RegionDetailModal
          region={region.name ? region : []}
          open={open}
          handleClose={handleClose}
        />
      ) : (
        ""
      )}
    </Grid>
  );
};

export default Regions;
