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
import { Button, Chip, Grid, IconButton, Tooltip } from "@mui/material";
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
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import dayjs from "dayjs";
import SuccessButton from "../../components/Buttons/SuccessButton";
import { usePayments } from "../../hooks/usePayments";

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

  const handleGoToPage1 = () => apiRef.current.setPage(1);
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
          sx={{ display: {} }}
          aria-label="Ver detalle"
          color="primary"
          title="Ver detalle"
          onClick={() => navigate(`/contaduria/venta-detalle/${values.row._id}`)}
        >
          <Visibility />
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
        disabled
      >
        <Visibility />
      </IconButton> 
      );
    }
  };

  const renderChip = (values) => {
    if (values.row.payment_status === "pending_to_verify") {
      return (
        <>
          <Chip
            icon={<Paid />}
            label="Pendiente validar"
            variant="filled"
            color="info"
          />
        </>
      );
    } else {
      return (
        <>
          <Chip
            icon={<Paid />}
            label="No liquidada"
            variant="filled"
            color="warning"
          />
        </>
      );
    }
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid container>
      <Grid mb={2} item xs={12}>
        <Button variant="contained" onClick={()=>loadValidateExpiredPayments()} color="primary">
          Limpiar pagos expirados
        </Button>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          sx={{ fontSize: "14px", fontFamily: "sans-serif" }}
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

export default SalesTransfer;
