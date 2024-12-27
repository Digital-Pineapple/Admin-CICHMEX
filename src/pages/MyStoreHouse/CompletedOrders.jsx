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
import {
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Workbook } from "exceljs";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  ScheduleSend as ScheduleSendIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  Visibility,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import {localDate} from "../../Utils/ConvertIsoDate"

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
      "Fecha de solicitud"
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
        row.createdAt
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

const CompletedOrders = () => {
  const {
    loadProductOrdersPaidAndFill,
    navigate,
    productOrders,
    loading
  } = useProductOrder();
  const { user } = useAuthStore();

  useEffect(() => {
    loadProductOrdersPaidAndFill();
  }, [user]);
 
  

  

  const rowsWithIds = productOrders.map((item, index) => {
    const date = localDate(item.createdAt)
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      date : date,
      id: index.toString(),
      ...item,
    };
  });

  const paymentValuate = (row) => {
    if (row.payment_status !== 'approved') {
      Swal.fire('Pendiente de pago', '', 'error');
    } else {
      navigate(`/almacenista/surtir-venta/${row._id}`);
    }
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid container gap={1}>
      <Grid item xs={12}>
        <DataGrid
          sx={{ fontSize: "14px", fontFamily: "sans-serif" }}
          columns={[
            {
              field: "date",
              headerName: "Fecha de solicitud",
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
              field: "typeDelivery",
              headerName: "Tipo de envio",
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
              renderCell: (params) => (
                
                <IconButton color="primary"  onClick={()=>navigate(`/almacenista/detalle-de-pedido/${params.row._id}`)} >
                  <Visibility/>
                </IconButton>
              ) 
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
          initialState={{
            sorting:{
              sortModel:[{field:'date', sort:'desc'}]
            }
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

export default CompletedOrders
