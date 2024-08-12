import * as React from "react";
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
import { useEffect } from "react";
import MuiPagination from "@mui/material/Pagination";
import {
  CancelScheduleSend,
  Clear,
  Done,
  Download,
  LocalShipping,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProductOrder } from "../../hooks/useProductOrder";
import PaidIcon from "@mui/icons-material/Paid";
import PendingIcon from "@mui/icons-material/Pending";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Swal from "sweetalert2";
import LoadingScreenBlue from '../../components/ui/LoadingScreenBlue'
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

const MyProductOrders = () => {
  const {
    loadProductOrders,
    navigate,
    productOrders,
    loading,
  } = useProductOrder();
  const {user} = useAuthStore()

  useEffect(() => {
    loadProductOrders();
  }, [user]);

  const rowsWithIds = productOrders.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      ...item,
    };
  });
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Stock de productos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Cantidad de productos",
      "Tipo de envio",
      "Existencias",
      "Precio",
      "Tamaño",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row._id,
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
      saveAs(blob, "Pedidos.xlsx");
    });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
        <GridToolbarQuickFilter />
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
  const paymentValuate = (row)=>{
    if (row.payment_status !== 'approved') {
      Swal.fire('Pendiente de pago','','error')
    }
    else{
      navigate(`/auth/surtir-orden/${row._id}`)
    }
  }



  const renderIcon = (values) => {
    if (!values.row.storeHouseStatus) {
      return (
        <Tooltip title="Surtir orden">
          <Button
            aria-label="Surtir"
            color="success"
            onClick={()=>paymentValuate(values.row)}
            variant="outlined"
          >
            Surtir
          </Button>
        </Tooltip>
      );
    } else if (!values.row.route_status) {
      return (
        <Tooltip title="Asignar Ruta">
          <Button
            aria-label="Asignar Ruta"
            color="info"
            variant="outlined"
            onClick={() =>navigate(`/auth/asignar-ruta/${values.row._id}`)}
          >
            Ruta
          </Button>
        </Tooltip>
      );
    } else if (!values.row.deliveryStatus)  {
      return (
        <Tooltip title="En envio">
          <IconButton
            aria-label="secondary"
            color="secondary"
          >
            <ScheduleSendIcon />
          </IconButton>
        </Tooltip>
      );
    }
    else{
      return (
        <Tooltip title="Pedido entregado">
          <IconButton
            aria-label="Pedido entregado"
            color="primary"
          >
            <ThumbUpAltIcon />
          </IconButton>
        </Tooltip>
      );
    }
  };
  
  if (loading) {
    return(<LoadingScreenBlue/>)
  }
  

  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "85%" }}>
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
         Pedidos
        </Typography>
      </Grid>
      <Grid item xs={12} marginY={2}>
        <DataGrid
          sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
          columns={[
            {
              field: "createdAt",
              headerName: "Fecha de solicitud",
              flex: 1,
              align: "center",
            },
            {
              field: "order_id",
              headerName: "Código de pedido",
              flex: 1,
              align: "center",
            },
            {
              field: "typeDelivery",
              hideable: false,
              headerName: "Tipo de envio",
              flex: 1,
              sortable: false,
            },
            {
              field: "payment_status",
              headerName: "Status de pago",
              flex: 1,
              align: "center",
              renderCell: (params) =>
                params.value === "approved" ? (
                  <>
                    <Chip
                      icon={<PaidIcon />}
                      label="Pagado"
                      variant="outlined"
                      color="success"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<PendingIcon />}
                      label="Pendiente"
                      variant="outlined"
                      color="info"
                    />
                  </>
                ),
            },
            {
              field: "storeHouseStatus",
              headerName: "Orden preparada",
              flex: 1,
              align: "center",
              renderCell: (params) =>
                params.value === true ? (
                  <>
                    <Chip
                      icon={<Done />}
                      label="Surtido"
                      variant="outlined"
                      color="success"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<Clear />}
                      label="Pendiente"
                      variant="outlined"
                      color="error"
                    />
                  </>
                ),
            },
            {
              field: "route_status",
              headerName: "Ruta",
              flex: 1,
              align: "center",
              renderCell: (params) =>
                params.value === true ? (
                  <>
                    <Chip
                      icon={<LocalShippingIcon />}
                      label="En camino"
                      variant="outlined"
                      color="success"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<CarCrashIcon />}
                      label="Sin ruta"
                      variant="outlined"
                      color="error"
                    />
                  </>
                ),
            },
            {
              field: "deliveryStatus",
              headerName: "Entregado",
              flex: 1,
              align: "center",
              renderCell: (params) =>
                params.value === true ? (
                  <>
                    <Chip
                      icon={<LocalShipping />}
                      label="Entregado"
                      variant="outlined"
                      color="success"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      icon={<CancelScheduleSend />}
                      label="Pendiente"
                      variant="outlined"
                      color="error"
                    />
                  </>
                ),
            },

            
          ]}
          rows={rowsWithIds}
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
        />
      </Grid>
    </Grid>
  );
};

export default MyProductOrders;
