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
  Tooltip,
  Typography, IconButton,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProductOrder } from "../../hooks/useProductOrder";
import { saveAs } from "file-saver"; 
import Download from "@mui/icons-material/Download";
import Swal from "sweetalert2";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import LoadPackageModal from "../../components/Modals/LoadPackageModal";
import MapReadyToPoint from "../../components/Google/MapReadyToPoint";
import { useUsers } from "../../hooks/useUsers";
import MapRouteOptimized from "../../components/Google/MapRouteOptimized";
import { localDate } from "../../Utils/ConvertIsoDate";
import { Close, Handshake, Visibility } from "@mui/icons-material";
import MapGoogleMarker from "../../components/Google/MapGoogleMarker";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import { useAuthStore } from "../../hooks";

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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius:'20px',
  boxShadow: 24,
  p: 4,
};

const ReadyToDelivery = () => {
  const { loading, readyToPoint, loadReadyToPoint, navigate } = useProductOrder();
  const {user} =useAuthStore()
  const {loadOptimizedRoutes,optimizedRoutes} = useUsers()
  const [detail, setDetail] = useState(null)
  const [open, setOpen] = useState(false);
  const [myPosition, setMyPosition] = useState({lat:'', lng:''});
  const handleOpen = (values) => {
    const location = values.deliveryLocation || values.branch?.location
    const coords = {lat: location.lat, lng: location.lgt}
    setOpen(true) , setDetail({...values, coords, location})};
  const handleClose = () => {setOpen(false), setDetail(null)};

  useEffect(() => {
    loadReadyToPoint();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMyPosition({lat: latitude, lng:longitude})
        loadOptimizedRoutes({lat: latitude, lgt: longitude})
      }, (error) => {
        console.error('Error obteniendo la ubicación:', error);
      });
    } else {
      console.log("La geolocalización no es soportada por este navegador.");
    }
  }, [user]);
  
  
   

  const rowsWithIds = readyToPoint?.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    const statusRoute = item?.route_detail?.route_status || 'No asignado';

    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      status_route: statusRoute === 'assigned' ? 'Cargado':'No cargado',
      date : localDate(item.createdAt),
      ...item,
    };
  });

  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Stock de productos");

    const headerRow = worksheet.addRow([
      "Cantidad de productos",
      "Tipo de envío",
      "Existencias",
      "Precio",
      "Tamaño",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row.quantityProduct,
        row.typeDelivery,
        row.existences, // Ensure this field exists
        row.price,
        row.size,
      ]);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Pedidos.xlsx");
    });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
          <Button size="small" variant="contained" color="primary" onClick={()=>rechargeRoutes()}>
            Recargar rutas
          </Button>
        <GridToolbarQuickFilter />
        <Button
          variant="text"
          startIcon={<Download />}
          disableElevation
          sx={{ color: "secondary.main" }} // Correct usage of the secondary color
          onClick={exportToExcel}
        >
          Descargar Excel
        </Button>
      </GridToolbarContainer>
    );
  }

 

  if (loading) {
    return <LoadingScreenBlue />;
  }

  const rechargeRoutes = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        loadOptimizedRoutes({lat: latitude, lgt: longitude})
      }, (error) => {
        console.error('Error obteniendo la ubicación:', error);
      });
    } else {
      console.log("La geolocalización no es soportada por este navegador.");
    }
  }
  


  return (
    <Grid2 size={12} width={'100%'} >
      <Grid2 marginTop={{ xs: "-30px" }} size={12} minHeight={"100px"} className="Titles">
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Paquetes listos para entregar
        </Typography>
       
      </Grid2>
      {
        optimizedRoutes ? (
      <Grid2  size={12} padding={2} >
      <MapRouteOptimized optimizedRoutes={optimizedRoutes} myPosition={myPosition} />
      <Typography variant="h5" color="initial">
        Distancia aprox: <strong>{optimizedRoutes.totalDistance}</strong> ,{" "}
        Tiempo aprox: <strong>{optimizedRoutes.totalDuration}</strong>
      </Typography>
      </Grid2>
        ): ''
      }
     
      <Grid2 size={12} >
      
        <DataGrid
          sx={{ fontSize: "12px", fontFamily: "sans-serif" }}
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
                startIcon={<Visibility/>}
                sx={{textTransform:'capitalize'}}
                size="small"
                onClick={()=>handleOpen(params.row)} variant="text" color="primary">
                  Ver Detalles
                </Button>,
                 <Button
                 startIcon={<Handshake/>}
                 sx={{textTransform:'capitalize'}}
                 size="small"
                 onClick={()=>navigate(`/transportista/entregar/${params.row._id}`)} variant="text" color="success">
                   Entregar
                 </Button>
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
            noRowsOverlay: CustomNoRows
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

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <IconButton sx={{left:`calc(95%)`}} aria-label="Cerrar" onClick={()=>handleClose()}>
            <Close/>
          </IconButton>
           <MapGoogleMarker center={detail?.coords} zoom={16}/> 
           <Typography textAlign={'center'} variant="body2" color="initial">
            Id de orden: <strong>{detail?.order_id}</strong><br />
           <strong>Direccion:</strong>  <br />
            Municipio: {detail?.location.municipality} <br />
            Localidad: {detail?.location.neighborhood} <br />
            Calle:{detail?.location.street} <br />
            Numero: { detail?.location.numext } <br />
            CP: { detail?.location.zipcode}

           </Typography>
        </Box>
      </Modal>
      
     
      
      
    </Grid2>
  );
};

export default ReadyToDelivery
