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
import { useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import { Check, Download, Edit, Mediation } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Modal,
  Box,
  Typography,
  TextField,
  Grid2,
  Chip,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useStoreHouse } from "../../hooks/useStoreHouse";
import { useStockStorehouse } from "../../hooks/useStockStorehouse";
import { useAuthStore, useUI } from "../../hooks";
import { localDate } from "../../Utils/ConvertIsoDate";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";
import { FilePdfFilled } from "@ant-design/icons";
import { printPDFInputsReport } from "../../store/actions/stockStorehouseActions";

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

// Iconos personalizados para ordenamiento
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación para la tabla
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const InputsByFolio = () => {
  const [openModal, setOpenModal] = useState(false);
  const { loadInputs, inputs, navigate, loadPDFReport } = useStockStorehouse();
  const { user } = useAuthStore();
  const { loading } = useUI();

  // Cargar datos de entradas al montar el componente
  useEffect(() => {
    loadInputs();
  }, [user]);

  // Formatear filas para la tabla
  const rows = (data) =>
    data.map((i, _id) => ({
      id: _id.toString(),
      date: localDate(i.createdAt),
      ...i,
    }));

  // Estilo para el modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Rutas para el breadcrumb
  const paths = [
    { path: "/almacenista/entradas_de_producto", name: "Entradas de producto" },
  ];

  // Cerrar el modal
  const handleClose = () => setOpenModal(false);

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-evenly" }}>
        <GridToolbarQuickFilter
          size="small"
          placeholder="Buscar"
          variant="outlined"
        />
      </GridToolbarContainer>
    );
  }

  // Renderizar un chip basado en el estado de "in_storehouse"
  const RenderChip = (data) => {
    if (data === true) {
      return <Chip color="success" label="Autorizado" />;
    } else if (data === false) {
      return <Chip color="info" label="Pendiente" title="Pendiente" />;
    } else {
      return <Chip color="default" label="Sin información" />;
    }
  };

  // Renderizar un chip basado en el estado de "in_section"
  const RenderChip2 = (data) => {
    if (data === true) {
      return <Chip color="success" label="Terminado" />;
    } else if (data === false) {
      return <Chip color="error" label="Pendiente" title="Pendiente" />;
    } else {
      return <Chip color="default" label="Sin información" />;
    }
  };

  // Mostrar pantalla de carga si está cargando
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container paddingX={{ lg: 20 }}>
      {/* Encabezado de la página */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h4">
          <strong>Entradas de producto</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Tabla de datos */}
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
            field: "date",
            hideable: false,
            headerName: "Fecha de creación",
            flex: 1,
            sortable: false,
          },
          {
            field: "_id",
            hideable: false,
            headerName: "Folio",
            flex: 1,
            sortable: false,
          },
          {
            field: "in_storehouse",
            headerName: "En almacén",
            hideable: false,
            flex: 0.5,
            renderCell: (params) => RenderChip(params.row.in_storehouse),
          },
          {
            field: "in_section",
            headerName: "Acomodo",
            hideable: false,
            flex: 0.5,
            renderCell: (params) => RenderChip2(params.row.in_section),
          },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 0.5,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              // Acción para autorizar entrada
              <GridActionsCellItem
                icon={<Check color="success" />}
                onClick={() => navigate(`autorizar_entradas/${params.row._id}`)}
                label="Autorizar entrada"
                showInMenu
                disabled={params.row.in_storehouse}
              />,
              // Acción para acomodar producto
              <GridActionsCellItem
                icon={<Mediation color="success" />}
                onClick={() => navigate(`acomodar_producto/${params.row._id}`)}
                label="Acomodar producto"
                showInMenu
                disabled={
                  !(
                    params.row.in_storehouse === true &&
                    params.row.in_section === false
                  )
                }
              />,
              // Acción para imprimir reporte
              <GridActionsCellItem
                icon={<FilePdfFilled color="success" />}
                onClick={() => loadPDFReport(params.row._id)}
                label="Imprimir reporte"
                showInMenu
                disabled={!params.row.in_storehouse}
              />,
            ],
          },
        ]}
        rows={rows(inputs)}
        pagination
        slots={{
          pagination: CustomPagination,
          toolbar: CustomToolbar,
          columnSortedDescendingIcon: SortedDescendingIcon,
          columnSortedAscendingIcon: SortedAscendingIcon,
          columnUnsortedIcon: UnsortedIcon,
        }}
        disableColumnFilter
        density="compact"
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
      />

      {/* Modal */}
      <Modal keepMounted open={openModal} onClose={handleClose}>
        <Box sx={style}></Box>
      </Modal>
    </Grid2>
  );
};

export default InputsByFolio;
