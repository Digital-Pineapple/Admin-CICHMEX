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
import { useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import { Add, Download } from "@mui/icons-material";
import {
  Button,
  Fab,
  Grid,
  Grid2,
  Typography,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import AddButton2 from "../../components/Buttons/AddButton2";
import { orange } from "@mui/material/colors";
import { useAuthStore } from "../../hooks";
import EntriesOutputsModal from "../../components/Modals/EntriesOutputsModal";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

// Componente de paginación personalizada para la tabla
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext(); // Acceso al contexto de la tabla
  const pageCount = useGridSelector(apiRef, gridPageCountSelector); // Obtiene el número total de páginas

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount} // Número total de páginas
      page={page + 1} // Página actual
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1); // Cambia de página
      }}
    />
  );
}

// Ícono para indicar orden descendente
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Ícono para indicar orden ascendente
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Ícono para indicar que no hay orden aplicado
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada que utiliza el componente Pagination
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Componente principal que muestra las salidas de productos
const ProductOutputs = () => {
  const {
    loadAllOutputs, // Función para cargar todas las salidas de productos
    rowsAllOutputs, // Datos de las salidas de productos
  } = useProducts();
  const { user, navigate } = useAuthStore(); // Información del usuario y función para navegar
  const [open, setOpen] = useState(false); // Estado para controlar la apertura del modal
  const [details, setDetails] = useState(''); // Estado para almacenar los detalles de una salida

  // Abre el modal y establece los detalles de la salida seleccionada
  const handleClickOpen = (detail) => {
    setOpen(true);
    setDetails(detail);
  };

  // Cierra el modal
  const handleClose = () => {
    setOpen(false);
  };

  // Carga las salidas de productos al montar el componente o cuando cambia el usuario
  useEffect(() => {
    loadAllOutputs();
  }, [user]);

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter variant="outlined" /> {/* Filtro rápido */}
      </GridToolbarContainer>
    );
  }

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: `/mi-almacen/productos/salidas`, name: "Todas mis salidas" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} gap={1}>
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
        <Typography variant="h4" sx={{ fontSize: { xs: "16px", lg: "25px" } }}>
          <strong>Todas mis salidas de producto</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb y botón para agregar salidas */}
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} /> {/* Componente de breadcrumb */}
        {/* <Fab
          onClick={() => navigate("/mi-almacen/salida-productos")} // Navega a la página para agregar salidas
          color="secondary"
          aria-label="Agregar entrada"
          title="Agragar entradas"
        >
          <Add />
        </Fab> */}
      </Grid2>

      {/* Tabla de datos */}
      <Grid2 size={12}>
        <DataGrid
          sx={{
            fontSize: "12px",
            fontFamily: "sans-serif",
            borderRadius: "20px",
            bgcolor: "#fff",
            border: "1px solid rgb(209, 205, 205)", // Borde exterior
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgb(230, 223, 223)", // Borde interno
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Traducción al español
          columns={
            [
              {
                field: "folio",
                headerName: "Folio",
                align: "center",
                renderCell: (params) =>
                  params.row.folio ? params.row.folio : 'Venta', // Muestra "Venta" si no hay folio
              },
              {
                field: "date",
                headerName: "Fecha",
                flex: 1,
                align: "center",
              },
              {
                field: "tag",
                headerName: "Código",
                flex: 1,
                align: "center",
              },
              {
                field: "product_name",
                headerName: "Nombre del prodcto",
                flex: 1,
                align: 'center',
              },
              {
                field: "quantity",
                headerName: "Cantidad",
                flex: 1,
                align: "center",
              },
              {
                field: "nowStock",
                headerName: "Stock actual",
                flex: 1,
                align: "center",
              },
            ]
          }
          rows={rowsAllOutputs} // Datos de las filas
          pagination
          autoHeight
          density="compact"
          slots={{
            pagination: CustomPagination, // Paginación personalizada
            toolbar: CustomToolbar, // Barra de herramientas personalizada
            columnSortedDescendingIcon: SortedDescendingIcon, // Ícono de orden descendente
            columnSortedAscendingIcon: SortedAscendingIcon, // Ícono de orden ascendente
            columnUnsortedIcon: UnsortedIcon, // Ícono sin orden
            noRowsOverlay: CustomNoRows, // Mensaje cuando no hay filas
          }}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          slotProps={{
            toolbar: {
              showQuickFilter: true, // Muestra el filtro rápido
              quickFilterProps: { debounceMs: 500 }, // Configuración del filtro rápido
            },
          }}
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }, // Tamaño de página inicial
            },
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }], // Orden inicial por fecha descendente
            },
          }}
          style={{ fontFamily: 'sans-serif', fontSize: '15px' }}
        />
      </Grid2>

      {/* Modal para mostrar detalles de una salida */}
      <EntriesOutputsModal open={open} handleClose={handleClose} details={details} />
    </Grid2>
  );
};

export default ProductOutputs;
