import React, { useEffect } from "react";
import useDeliveryPoints from "../../hooks/useDeliveryPoints";
import {
  Fab,
  Grid2,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
import { Add, Check, CompareArrows, Delete, Edit, Visibility } from "@mui/icons-material";
import SortIcon from "@mui/icons-material/Sort";
import SwitchButton from "../../components/Buttons/SwitchButton";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";
import ActionMenu from "../../components/Buttons/ActionMenu";

export const PointsList = () => {
  const {
    onGetDeliveryPoints,
    deliveryPoints,
    onDeleteDeliveryPoint,
    onActivateDeliveryPoint,
    onDesactivateDeliveryPoint,
  } = useDeliveryPoints();
  const navigate = useNavigate();

  // Mapeo de los puntos de entrega para asignar un ID único a cada fila
  const rowsWithIds = deliveryPoints.map((deliveryPoint, _id) => ({
    id: _id.toString(),
    ...deliveryPoint,
  }));

  // Maneja el cambio de estado del interruptor (activar/desactivar)
  const handleToggle = (id, activate, name) => {
    if (activate) {
      onDesactivateDeliveryPoint(id, name);
    } else {
      onActivateDeliveryPoint(id, name);
    }
  };

  // Llama a la función para obtener los puntos de entrega al montar el componente
  useEffect(() => {
    onGetDeliveryPoints();
  }, []);

  // Define las rutas para el componente de Breadcrumb
  const paths = [
    { path: `/puntos-entrega/todos`, name: "Todas mis puntos de entrega" },
  ];

  return (
    <Grid2 container maxWidth={"85vw"} gap={2}>
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
          <strong>Todas mis puntos de entrega</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb y botón para agregar un nuevo punto de entrega */}
      <Grid2
        size={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <BreadcrumbCustom paths={paths} />
        <Fab
          onClick={() => navigate("/puntos-entrega/create")}
          color="secondary"
          aria-label="Agregar punto de entrega"
          title="Agragar punto de entrega"
        >
          <Add />
        </Fab>
      </Grid2>

      {/* Tabla de datos con los puntos de entrega */}
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
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={[
          {
            field: "name",
            hideable: false,
            headerName: "Sucursal",
            flex: 2,
            sortable: false,
          },
          {
            field: "phone_number",
            hideable: false,
            headerName: "Num de telefono",
            flex: 2,
            sortable: false,
          },
          {
            field: "activated",
            hideable: false,
            headerName: "Activo",
            flex: 2,
            sortable: false,
            // Renderiza un interruptor para activar/desactivar el punto de entrega
            renderCell: (params) => (
              <SwitchButton
                checked={params.row.activated} // Estado del interruptor
                handleChange={() =>
                  handleToggle(
                    params.row._id,
                    params.row.activated,
                    params.row.name
                  )
                } // Llama a la función de cambio de estado
                color="primary"
              />
            ),
          },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 3,
            sortable: false,
            type: "actions",
            // Renderiza un menú de acciones con opciones como editar, eliminar, etc.
            renderCell: (params) => (
              <ActionMenu
                row={params.row}
                actions={[
                  {
                    label: "Recepción y entrega de paquetes",
                    icon: CompareArrows,
                    icon_color: 'warning',
                    onClick: () =>
                      navigate(`/puntos-entrega/${params.row._id}/ordenes/${params.row.name}`),
                  },
                  {
                    label: "Pedidos entregados",
                    icon: Check,
                    icon_color: 'success',
                    onClick: () =>
                      navigate(`/puntos-entrega/paquetes_entregados/${params.row._id}/${params.row.name}`),
                  },
                  {
                    label: "Ver detalle",
                    icon: Visibility,
                    icon_color: 'primary',
                    onClick: () =>
                      navigate(`/puntos-entrega/${params.row._id}`),
                  },
                  {
                    label: "Editar",
                    icon: Edit,
                    icon_color:'info',
                    onClick: () =>
                      navigate(`/puntos-entrega/editar/${params.row._id}`),
                  },
                  {
                    label: "Eliminar",
                    icon_color:'error',
                    icon: Delete,
                    onClick: () =>onDeleteDeliveryPoint(params.row._id),
                  },
                ]}
              />
            ),
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          },
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        density="standard"
        rows={rowsWithIds} // Filas de datos
        pagination
        slots={{
          pagination: CustomPagination, // Componente de paginación personalizado
          toolbar: CustomToolbar, // Barra de herramientas personalizada
          columnSortedDescendingIcon: SortedDescendingIcon, // Icono de orden descendente
          columnSortedAscendingIcon: SortedAscendingIcon, // Icono de orden ascendente
          columnUnsortedIcon: UnsortedIcon, // Icono para columnas no ordenadas
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
};

// Barra de herramientas personalizada con un filtro rápido
function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: "center" }}>
      <GridToolbarQuickFilter variant="outlined" />
    </GridToolbarContainer>
  );
}

// Componente de paginación personalizado
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

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

// Icono para orden descendente
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono para orden ascendente
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono para columnas no ordenadas
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación que utiliza el componente de acciones personalizado
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
