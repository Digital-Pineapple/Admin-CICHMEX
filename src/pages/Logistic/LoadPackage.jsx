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
  Button,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProductOrder } from "../../hooks/useProductOrder";
import { saveAs } from "file-saver"; // Asegúrate de importar esto
import Download from "@mui/icons-material/Download";
import Swal from "sweetalert2";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";

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
  const { loadAssignedPO, navigate, productOrders, loading } = useProductOrder();

  useEffect(() => {
    loadAssignedPO();
  }, []);

  const rowsWithIds = productOrders?.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0);
  
    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    const statusRoute = item?.route_detail?.route_status ? item?.route_detail?.route_status : 'No asignado';
  
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      status_route: statusRoute,
      ...item,
    };
  });
  

  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Stock de productos");

    // Agregar encabezados de columna
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

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row.quantityProduct,
        row.typeDelivery,
        row.existences, // Asegúrate de que estas propiedades existan
        row.price,
        row.size,
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
        <Button onClick={handleGoToPage1}>Regresa a la página 1</Button>
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

  const renderIcon = (values) => {
    if (values?.row?.status_route === 'assigned') {
      return (
        <Tooltip title="Cargar paquete">
          <Button
            aria-label="Cargar paquete"
            color="success"
            onClick={() => navigate(`/auth/cargar-paquetes/verificar/${values.row._id}`, { replace: true })}
            variant="outlined"
          >
            Cargar paquete
          </Button>
        </Tooltip>
      );
    }
    return null; // Asegúrate de manejar el caso donde no haya icono a renderizar
  };
if (loading) {
  return(<LoadingScreenBlue/>)
}

  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "85%" }}>
      <Grid item marginTop={{ xs: "-30px" }} xs={12} minHeight={"100px"} className="Titles">
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Pedidos listos para cargar
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
                getActions: (params) => [renderIcon(params)],
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

export default LoadPackage;
