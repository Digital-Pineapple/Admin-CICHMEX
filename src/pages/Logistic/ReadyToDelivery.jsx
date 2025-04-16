// Importación de íconos y componentes necesarios de Material-UI y otras librerías
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
  Box,
  Button,
  Grid2,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import { useProductOrder } from "../../hooks/useProductOrder";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useUsers } from "../../hooks/useUsers";
import MapRouteOptimized from "../../components/Google/MapRouteOptimized";
import { localDate } from "../../Utils/ConvertIsoDate";
import { Close, Route, Visibility } from "@mui/icons-material";
import MapGoogleMarker from "../../components/Google/MapGoogleMarker";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import { useAuthStore } from "../../hooks";
import { esES } from "@mui/x-data-grid/locales";
import TableBranchDetail from "../../components/Tables/TableBranchDetail";

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

// Íconos personalizados para indicar el estado de ordenación de las columnas
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación que utiliza la paginación personalizada
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Estilo para el modal de detalles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  maxHeight: 500,
  overflow: "auto",
};

// Componente principal para la planeación de rutas
const ReadyToDelivery = () => {
  const { loading, readyToPoint, loadReadyToPoint, navigate } =
    useProductOrder(); // Hook para manejar pedidos
  const { user } = useAuthStore(); // Hook para obtener información del usuario
  const { loadOptimizedRoutes, optimizedRoutes, loadStartMyRoutes } = useUsers(); // Hook para manejar rutas optimizadas
  const [detail, setDetail] = useState(null); // Estado para los detalles del pedido
  const [open, setOpen] = useState(false); // Estado para controlar la apertura del modal
  const [myPosition, setMyPosition] = useState({ lat: "", lng: "" }); // Estado para la posición actual del usuario

  // Función para abrir el modal con los detalles del pedido
  const handleOpen = (values) => {
    const location = values.deliveryLocation || values.branch?.location;
    const coords = { lat: location.lat, lng: location.lgt };
    setOpen(true), setDetail({ ...values, coords, location });
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false), setDetail(null);
  };

  // Efecto para cargar los puntos listos para entrega y obtener la ubicación del usuario
  useEffect(() => {
    loadReadyToPoint();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMyPosition({ lat: latitude, lng: longitude });
          loadOptimizedRoutes({ lat: latitude, lgt: longitude });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.log("La geolocalización no es soportada por este navegador.");
    }
  }, [user]);

  // Transformación de los datos para la tabla
  const rowsWithIds = readyToPoint?.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce(
      (valorAnterior, valorActual) => valorAnterior + valorActual,
      0
    );

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    const statusRoute = item?.route_detail?.route_status || "No asignado";

    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      status_route: statusRoute === "assigned" ? "Cargado" : "No cargado",
      date: localDate(item.createdAt),
      ...item,
    };
  });

  // Función para iniciar las rutas
  const handleStartRoutes = () => {
    loadStartMyRoutes(readyToPoint);
  };

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "space-evenly" }}>
        <GridToolbarQuickFilter variant="outlined" />
      </GridToolbarContainer>
    );
  }

  // Pantalla de carga mientras se obtienen los datos
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2}>
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
          <strong>Planeación de ruta</strong>
        </Typography>
      </Grid2>

      {/* Mapa y detalles de la ruta optimizada */}
      {optimizedRoutes ? (
        <Grid2 container sx={{ alignItems: "center", padding: 4 }} width={"100%"} display={"flex"} gap={2}>
          <Grid2 size={{ xs: 12, lg: 4.7 }}>
            <Typography variant="h5" color="initial">
              Distancia aprox: <strong>{optimizedRoutes.totalDistance}</strong> <br />
              Tiempo aprox: <strong>{optimizedRoutes.totalDuration}</strong>
            </Typography>
            <Button variant="contained" onClick={handleStartRoutes} startIcon={<Route />} fullWidth>
              Comenzar viaje
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 7 }}>
            <MapRouteOptimized
              optimizedRoutes={optimizedRoutes}
              myPosition={myPosition}
            />
          </Grid2>
        </Grid2>
      ) : (
        ""
      )}

      {/* Tabla con los pedidos listos para entrega */}
      <Grid2 size={12}>
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
              headerName: "Fecha de compra",
              flex: 1,
              align: "center",
            },
            {
              field: "order_id",
              headerName: "Id de pedido",
              flex: 1,
              align: "center",
            },
            {
              field: "status_route",
              hideable: false,
              headerName: "Estado de ruta",
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
                <Button
                  startIcon={<Visibility />}
                  sx={{ textTransform: "capitalize" }}
                  size="small"
                  onClick={() => handleOpen(params.row)}
                  variant="text"
                  color="primary"
                >
                  Ver Detalles
                </Button>,
              ],
            },
          ]}
          rows={rowsWithIds}
          pagination
          autoHeight
          slots={{
            pagination: CustomPagination,
            toolbar: CustomToolbar,
            columnSortedDescendingIcon: SortedDescendingIcon,
            columnSortedAscendingIcon: SortedAscendingIcon,
            columnUnsortedIcon: UnsortedIcon,
            noRowsOverlay: CustomNoRows,
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
      </Grid2>

      {/* Modal para mostrar detalles del pedido */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <IconButton
            sx={{ left: `calc(95%)`, top: -20 }}
            aria-label="Cerrar"
            onClick={() => handleClose()}
          >
            <Close />
          </IconButton>
          <Grid2 container display={"flex"} gap={2}>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TableBranchDetail branch={detail?.branch} />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 5.7 }}>
              <MapGoogleMarker center={detail?.coords} zoom={16} />
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </Grid2>
  );
};

export default ReadyToDelivery;
