import React, { useEffect } from "react";
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
import { Button, Chip, Grid2, IconButton, Tooltip } from "@mui/material";
import { Workbook } from "exceljs";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  ScheduleSend as ScheduleSendIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  Paid,
  Pending,
  Looks,
  Visibility,
  Verified,
  ConfirmationNumber,
  Check,
  MoreHoriz,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import dayjs from "dayjs";
import SuccessButton from "../../components/Buttons/SuccessButton";
import { usePayments } from "../../hooks/usePayments";
import { orange, purple } from "@mui/material/colors";
import { esES } from "@mui/x-data-grid/locales";

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

function CustomToolbar() {
  const apiRef = useGridApiContext();


  return (
    <GridToolbarContainer sx={{ justifyContent: "center" }}>
      <GridToolbarQuickFilter placeholder="Buscar" variant="outlined"  />
    </GridToolbarContainer>
  );
}

const SalesTransfer = () => {
  const { loadPendingTransferPO, navigate, productOrders, loading } =
    useProductOrder();
  const { user } = useAuthStore();
  const {loadValidateExpiredPayments} = usePayments()

  useEffect(() => {
    loadPendingTransferPO();
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
      date: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:s a"),
      id: index.toString(),
      ...item,
    };
  });

  

  const renderIcon = (values) => {
    
    if (values.row.payment?.verification) {
      return (
        <>
        <IconButton
          sx={{ borderRadius:'2px' }}
          aria-label="Autorizar"
          color="success"
          title="Autorizar"
          onClick={() => navigate(`/contaduria/venta-detalle/${values.row._id}`)}
        >
          <Check />
        </IconButton> 
        
        </>
      );
    } else  {
      return (
        <IconButton
        sx={{ display: {} }}
        aria-label="Ver detalle"
        color="primary"
        title="Ver detalle"
        onClick={() => navigate(`/contaduria/venta-detalle/${values.row._id}`)}
      >
        <MoreHoriz />
      </IconButton> 
      );
    }
  };

  const renderChip = (values) => {
    if (!!values.row.payment.verification?.payment_vouchers) {
      return (
        <>
          <Chip
            icon={<ConfirmationNumber />}
            label="Con ticket"
            variant="outlined"
            color="info"
          />
        </>
      );
    } else {
      return (
        <>
          <Chip
            icon={<Paid />}
            label="Sin ticket"
            variant="outlined"
            color={"secondary"}
          />
        </>
      );
    }
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container>
      <Grid2 size={12} display={'flex'} padding={2} justifyContent={'flex-end'}>
        <Button variant="contained" onClick={()=>loadValidateExpiredPayments()} color="primary">
          Limpiar pagos expirados
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <DataGrid
         localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
              field: "payment",
              headerName: "Estatus",
              flex: 1,
              sortable: false,
              renderCell: (params) => [renderChip(params)],
            },
            {
              field: "subTotal",
              headerName: "Subtotal",
              flex: 1,
              sortable: false,
            },
            {
              field: "shipping_cost",
              headerName: "Gastos de envío",
              flex: 1,
              sortable: false,
            },
            {
              field: "discount",
              headerName: "Descuento",
              flex: 1,
              sortable: false,
            },
            {
              field: "total",
              headerName: "Total a pagar",
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
              getActions: (params) => [renderIcon(params)],
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
          disableColumnFilter
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
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
    </Grid2>
  );
};

export default SalesTransfer;
