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

const AllOrders = () => {


  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "85%" }}>
     
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

export default AllOrders;
