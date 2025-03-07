import React, { useEffect, useState } from "react";
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
import {
  Button,
  Chip,
  Grid,
  Grid2,
  IconButton,
  Tooltip,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
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
  Refresh,
  Close,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import dayjs from "dayjs";
import SuccessButton from "../../components/Buttons/SuccessButton";
import { usePayments } from "../../hooks/usePayments";
import useDateFormatter from "../../hooks/useFormattedDate";
import { esES } from "@mui/x-data-grid/locales";
import { date } from "yup";
import ModalDetailSale from "./ModalDetailSale";


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
    <GridToolbarContainer sx={{ justifyContent: "center" }}>
      <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
    </GridToolbarContainer>
  );
}

const AllSales = () => {
  const { loadProductOrders, navigate, productOrders, loading } =
    useProductOrder();
  const { user } = useAuthStore();
  const { getMonthName } = useDateFormatter();
  const [open, setOpen] = useState(sale)
  const handleOpen = ()=>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

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
      date: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:s a"),
      id: index.toString(),
      ...item,
    };
  });


  const renderIcon = (values) => {
      return (
        <>
          <IconButton
            sx={{ display: {} }}
            aria-label="Ver detalle"
            color="primary"
            title="Ver detalle"
            onClick={handleOpen()}
          >
            <Visibility />
          </IconButton>
        </>
      );
  };

  const renderChip = (values) => {
    const { payment_status, download_ticket, payment } = values.row;

    if (payment_status === "approved") {
      return (
        <Chip
          icon={<Paid />}
          label="Liquidada"
          variant="filled"
          color="success"
          size="small"
        />
      );
    }

    if (payment_status === "pending" && !!download_ticket) {
      return (
        <Chip
          icon={<Paid />}
          label="Pendiente MP"
          variant="filled"
          color="primary"
          size='small'
        />
      );
    }

    if (payment?.verification?.payment_vouchers) {
      return (
        <Chip
          icon={<Paid />}
          label="Pendiente con ticket"
          variant="filled"
          color="secondary"
          size="small"

        />
      );
    }

    if (payment_status === "rejected") {
      return (
        <Chip
          icon={<Close />}
          label="Pago rechazado"
          variant="filled"
          color="warning"
           size="small"
        />
      );
    }

    if (payment_status === "cancelled") {
      return (
        <Chip
          icon={<Close />}
          label="Pago cancelado o rechazado"
          variant="filled"
          color="warning"
           size="small"
        />
      );
    }

    if (payment_status === "approved") {
      return (
        <Chip
          icon={<Paid />}
          label="Liquidada"
          variant="filled"
          color="success"
           size="small"
        />
      );
    }

    // Default case
    return (
      <Chip
        icon={<Paid />}
        label="Pendiente sin ticket"
        variant="filled"
        color="info"
         size="small"
      />
    );
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container paddingX={10}>
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
          <strong>Ordenes</strong>
        </Typography>
      </Grid2>

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
          columns={[
            {
              field: "date",
              headerName: "Fecha",
              flex: 0.5,
              align: "center",
              renderCell: (params) => {
                const [day, month, year] = params.row.date.split("/");
                return (
                  <Typography variant="h6" fontSize={14} color="initial">
                    {day} <br />
                    {getMonthName(params.row.date)}
                  </Typography>
                );
              },
            },
            {
              field: "order_id",
              headerName: "Código",
              flex: 1,
              align: "center",
            },
            {
              field: "payment",
              headerName: "Estatus",
              flex: 1.5,
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
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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

          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
      </Grid2>
      <ModalDetailSale open={open} handleClose={handleClose} />
    </Grid2>
  );
};

export default AllSales;
