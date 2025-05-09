import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useAuthStore } from "../../hooks";
import {
  Button,
  CircularProgress,
  Grid2,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Workbook } from "exceljs";
import {
  DataGrid,
  GridLogicOperator,
  gridPageCountSelector,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { orange } from "@mui/material/colors";
import {
  ArrowDownward,
  ArrowUpward,
  Download,
  Info,
  Replay,
  Visibility,
} from "@mui/icons-material";
import AddButton2 from "../../components/Buttons/AddButton2";
import MuiPagination from "@mui/material/Pagination";
import { esES } from "@mui/x-data-grid/locales";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

const StockMovements = () => {
  const { loadAllMovements, allMovements, isLoading } = useProducts();
  const { user } = useAuthStore();

  // Cargar todos los movimientos de stock al montar el componente
  useEffect(() => {
    loadAllMovements();
  }, [user]);

  // Componente de paginación personalizada para la tabla
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

  // Componente para integrar la paginación personalizada en el DataGrid
  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  // Función para exportar los datos de la tabla a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Stock de productos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Código",
      "Nombre del producto",
      "Existencias",
      "Precio",
      "Tamaño",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsIds.forEach((row) => {
      worksheet.addRow([
        row._id,
        row.name,
        row.description,
        row.price,
        row.size,
        row.tag,
      ]);
    });

    // Crear un archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "entradas.xlsx");
    });
  };

  // Barra de herramientas personalizada para el DataGrid
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
      </GridToolbarContainer>
    );
  }

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: `/mi-almacen/mov-stock`, name: "Todos mis movimientos de stock" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} gap={1}>
      {/* Título de la página */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: "16px", lg: "25px" } }}>
          <strong>Todos mis movimientos de stock </strong>
        </Typography>
      </Grid2>

      {/* Componente de breadcrumb para navegación */}
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Tabla de movimientos de stock */}
      <Grid2 size={12}>
        {isLoading ? (
          // Indicador de carga mientras se obtienen los datos
          <Box
            display="flex"
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <CircularProgress color="primary" />
            <Typography variant="body1" color="initial">
              Cargando movimientos...
            </Typography>
          </Box>
        ) : (
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
              // Definición de columnas de la tabla
              {
                field: "date",
                headerName: "Fecha de entrada",
                flex: 2,
                align: "center",
              },
              {
                field: "type",
                headerName: "Tipo",
                flex: 0.5,
                align: "center",
                renderCell: (params) => {
                  // Renderizado condicional para mostrar íconos según el tipo de movimiento
                  if (params.row.type === "input") {
                    return (
                      <Tooltip title="Alta">
                        <ArrowUpward color="success" />
                      </Tooltip>
                    );
                  } else if (params.row.type === 'return') {
                    return (
                      <Tooltip title="Retorno">
                        <Replay color="info" />
                      </Tooltip>
                    );
                  } else if (params.row.type === 'output') {
                    return (
                      <Tooltip title="Baja">
                        <ArrowDownward color="warning" />
                      </Tooltip>
                    )
                  } else {
                    <Tooltip title="Sin información">
                      <Info color="warning" />
                    </Tooltip>
                  }
                },
              },
              {
                field: "product_name",
                headerName: "Nombre del producto",
                flex: 2,
                align: "center",
              },
              {
                field: "quantity",
                headerName: "Cantidad",
                flex: 1,
              },
              {
                field: "newQuantity",
                headerName: "Nueva Cantidad",
                flex: 1,
                align: "center",
              },
              // {
              //   field: "nowStock",
              //   headerName: "Existencia ahora",
              //   flex: 1,
              //   align: "center",
              // },
              {
                field: "responsible",
                headerName: "Responsable",
                flex: 2,
                align: "center",
                renderCell: (params) => {
                  const { responsible, type } = params.row;

                  let displayText;

                  if (responsible && ['input', 'output', 'return'].includes(type)) {
                    displayText = responsible;
                  } else {
                    displayText =
                      type === 'output' ? 'venta' :
                        type === 'return' ? 'cancelación de pedido' :
                          'sin información';
                  }

                  return (
                    <Typography variant="body2">
                      {displayText}
                    </Typography>
                  );
                }
              },
            ]}
            rows={allMovements} // Datos de los movimientos de stock
            pagination
            slots={{
              pagination: CustomPagination, // Paginación personalizada
              toolbar: CustomToolbar, // Barra de herramientas personalizada
            }}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            style={{ fontFamily: "sans-serif" }}
            density="compact"
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
            initialState={{
              sorting: {
                sortModel: [{ field: "date", sort: "desc" }], // Orden inicial por fecha descendente
              },
              pagination: { paginationModel: { pageSize: 50, page: 0 } }, // Configuración inicial de paginación
            }}
            pageSizeOptions={[50, 100]} // Opciones de tamaño de página
          />
        )}
      </Grid2>
    </Grid2>
  );
};

export default StockMovements;
