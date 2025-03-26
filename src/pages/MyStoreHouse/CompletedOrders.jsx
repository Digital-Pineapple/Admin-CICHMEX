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
  Grid2,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
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
import {localDate, localDateTable} from "../../Utils/ConvertIsoDate"
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
    <GridToolbarContainer sx={{ justifyContent: "center" }}>
     
       <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
  
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

  const isXs = useMediaQuery('(max-width:600px)');

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
      typeDelivery: !isXs,
    });
  

  useEffect(() => {
    loadProductOrdersPaidAndFill();
  }, [user]);
 
  useEffect(() => {
      setColumnVisibilityModel((prevModel) => ({
        ...prevModel,
        typeDelivery: !isXs,
      }));
    }, [isXs]);

  

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

  if (loading) {
    return <LoadingScreenBlue />;
  }

   const columns = [
      {
        field: "date",
        headerName: "Fecha",
        flex: 0.5,
        align: "center",
        renderCell: (params) => {
          const date = localDateTable(params.row.createdAt)
          const day = date.split("/")[0]
          const month = date.split("/")[1]
          return (
            <Typography variant="h6" fontSize={14} color="initial">
              {day} <br />
              {month}
            </Typography>
          );
        },
      },
      {
        field: "order_id",
        headerName: "Id de pedido",
        flex: 1,
        align: "center",
      },
      {
        field: "typeDelivery",
        headerName: "Tipo de envío",
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <span>
            {params.row.typeDelivery === "A domicilio"
              ? "Envío a domicilio"
              : "Punto de entrega"}
          </span>
        ),
      },
      {
        field: "Opciones",
        headerName: "Opciones",
        align: "center",
        flex: 1,
        sortable: false,
        type: "actions",
        renderCell: (params) => (
          <Tooltip title='Ver detalle'>
          <IconButton color="primary"  onClick={()=>navigate(`/almacenista/surtir-venta/${params.row._id}`)} >
            <Visibility/>
          </IconButton>
          </Tooltip>
        ) 
      },
    ];

  return (
      <DataGrid
        sx={{
          fontSize: "12px",
          fontFamily: "sans-serif",
          borderRadius: { xs: '5px', md: '20px' },
          bgcolor: "#fff",
          border: "1px solid rgb(209, 205, 205)",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgb(230, 223, 223)",
          },
        }}
        rows={rowsWithIds}
        columns={columns}         
        autoHeight
        pagination
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={setColumnVisibilityModel}
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
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
    );
};

export default CompletedOrders
