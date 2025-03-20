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
import { Button, Grid2, Tooltip, Typography } from "@mui/material";
import { Workbook } from "exceljs";
import { useProductOrder } from "../../hooks/useProductOrder";
import { saveAs } from "file-saver";
import Download from "@mui/icons-material/Download";
import Swal from "sweetalert2";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import LoadPackageModal from "../../components/Modals/LoadPackageModal";
import { useAuthStore } from "../../hooks";
import { localDate } from "../../Utils/ConvertIsoDate";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
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

const LoadPackage = () => {
  const { loadAssignedPO, navigate, productOrders, loading } =
    useProductOrder();
  const { user } = useAuthStore();

  useEffect(() => {
    loadAssignedPO();
  }, [user]);

  const [openModal, setOpenModal] = useState(false);
  const [valuePO, setValuePO] = useState(null);

  const handleOpen = (values) => {
    console.log(values,'data ok ');
    
    setValuePO(values);
    setOpenModal(true);
  };
  const handleClose = () => {
    setValuePO(null);
    setOpenModal(false);
  };

  const rowsWithIds = productOrders?.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce(
      (valorAnterior, valorActual) => valorAnterior + valorActual,
      0
    );
    const date = localDate(item.createdAt);
    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    const statusRoute =
      item?.route_detail?.route_status === "assigned"
        ? "Asignado"
        : "No asignado";

    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      status_route: statusRoute,
      date: date,
      ...item,
    };
  });


  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
      
        <GridToolbarQuickFilter variant="outlined" />
        
      </GridToolbarContainer>
    );
  }

  if (loading) {
    return <LoadingScreenBlue />;
  }

  const paths = [
    {
      path: "/transportista/cargar-paquete",
      name: "Paquetes listos para cargar",
    },
  ];

  return (
    <Grid2 container paddingX={{ lg: 10 }} display="flex" gap={2}>
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">
          <strong>Paquetes listos para cargar</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
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
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
                  onClick={() => handleOpen(params.row)}
                  variant="text"
                  color="primary"
                >
                  Cargar Paquete
                </Button>,
              ],
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
      </Grid2>
      <LoadPackageModal
        openModal={openModal}
        handleClose={handleClose}
        productOrder={valuePO}
      />
    </Grid2>
  );
};

export default LoadPackage;
