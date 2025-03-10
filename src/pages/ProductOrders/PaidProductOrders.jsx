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
import { Button, Grid2 } from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Sort as SortIcon,
  Download ,
  ScheduleSend ,
  ThumbUpAlt 
} from "@mui/icons-material";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import { localDate } from "../../Utils/ConvertIsoDate";
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
  return (
    <GridToolbarContainer sx={{ justifyContent: "center" }}>
      <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
    </GridToolbarContainer>
  );
}

const PaidProductOrders = () => {
  const { loadProductOrdersPaid, navigate, productOrders, loading } =
    useProductOrder();
  const { user } = useAuthStore();

  useEffect(() => {
    loadProductOrdersPaid();
  }, [user]);

  const rowsWithIds = productOrders.map((item, index) => {
    const date = localDate(item.createdAt);
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      date: date,
      id: index.toString(),
      ...item,
    };
  });

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container gap={1}>
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
            headerName: "Tipo de envío",
            flex: 1,
            sortable: false,
            renderCell: (params) => {
              if (params.row.typeDelivery === "homedelivery") {
                return <span>Envío a domicilio</span>;
              } else {
                return <span>Punto de entrega</span>;
              }
            },
          },

          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            renderCell: (params) => (
              <Button
                size="small"
                variant="contained"
                onClick={() =>
                  navigate(`/almacenista/surtir-venta/${params.row._id}`)
                }
              >
                Surtir
              </Button>
            ),
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
    </Grid2>
  );
};

export default PaidProductOrders;
