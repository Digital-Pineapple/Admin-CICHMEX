import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useDeliveryPoints from "../../../hooks/useDeliveryPoints"
import { DataGrid, gridPageCountSelector, GridPagination, GridToolbarContainer, useGridApiContext } from "@mui/x-data-grid";
import { useGridSelector } from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { ExpandLess, ExpandMore, Sort, Visibility } from "@mui/icons-material";
import { Grid2, IconButton, Tooltip, Typography } from "@mui/material";
import BreadcrumbCustom from "../../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";
import CustomNoRows from "../../../components/Tables/CustomNoRows";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { localDate } from "../../../Utils/ConvertIsoDate";

// Componente de paginación personalizada para la tabla
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

// Icono para indicar orden descendente en la tabla
export function SortedDescendingIcon() {
  return <ExpandMore className="icon" />;
}

// Icono para indicar orden ascendente en la tabla
export function SortedAscendingIcon() {
  return <ExpandLess className="icon" />;
}

// Icono para indicar que no hay orden aplicado en la tabla
export function UnsortedIcon() {
  return <Sort className="icon" />;
}

// Componente de paginación personalizada para integrarse con DataGrid
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Barra de herramientas personalizada para la tabla
function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: "center" }}>
      <GridToolbarQuickFilter variant="outlined" />
    </GridToolbarContainer>
  );
}

// Componente principal que muestra los paquetes entregados
const PackagesDelivered = () => {
  const { id, name } = useParams(); // Obtiene parámetros de la URL
  const { loadPackagesDelivered, orders } = useDeliveryPoints(); // Hook personalizado para cargar datos

  // Carga los paquetes entregados al montar el componente o cambiar el ID
  useEffect(() => {
    loadPackagesDelivered(id);
  }, [id]);

  // Mapea las órdenes para generar filas con un ID único
  const rows = orders.map((i, index) => ({
    ...i,
    id: index.toString()
  }));

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: `/puntos-entrega/todos`, name: "Todas mis puntos de entrega" },
    { path: `/puntos-entrega//paquetes_entregados/:id`, name: "Paquetes entregados" },
  ];

  // Si no hay filas, retorna null
  if (!rows) {
    return null;
  }

  return (
    <Grid2 paddingX={{ xs: 0, lg: 10 }} gap={2}>
      {/* Encabezado con título y nombre del punto de entrega */}
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
          <strong>Paquetes entregados</strong><br />
          {name}
        </Typography>
      </Grid2>

      {/* Componente de breadcrumb para navegación */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Tabla principal que muestra los datos de los paquetes entregados */}
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
        localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Traducción al español
        columns={[
          {
            field: "order_id",
            hideable: false,
            headerName: "Id",
            flex: 2,
            sortable: false,
          },
          {
            field: "user_id.fullname",
            hideable: false,
            headerName: "Cliente",
            flex: 2,
            sortable: false,
            renderCell: (params) => <Typography>{params.row.user_id?.fullname}</Typography>
          },
          {
            field: 'verification',
            hideable: true,
            headerName: "Fecha de entrega",
            flex: 2,
            sortable: true,
            renderCell: (params) => <Typography>
              {localDate(params.row.verification?.verification_time)}
            </Typography>
          }
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "updatedAt", sort: "desc" }],
          },
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        density="compact"
        rows={rows} // Filas de datos
        pagination
        slots={{
          pagination: CustomPagination, // Paginación personalizada
          toolbar: CustomToolbar, // Barra de herramientas personalizada
          columnSortedDescendingIcon: SortedDescendingIcon, // Icono de orden descendente
          columnSortedAscendingIcon: SortedAscendingIcon, // Icono de orden ascendente
          columnUnsortedIcon: UnsortedIcon, // Icono de no orden
          noRowsOverlay: CustomNoRows // Componente para mostrar cuando no hay datos
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
      />
    </Grid2>
  );
}

export default PackagesDelivered;
