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
import { Download } from "@mui/icons-material";
import {
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import AddButton from "../../components/Buttons/AddButton";
import { useStoreHouse } from "../../hooks/useStoreHouse";
import AddButton2 from "../../components/Buttons/AddButton2";
import { orange } from "@mui/material/colors";

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

const MyStockProducts = () => {
  const {
    loadStockProducts,
    loadNoStockProducts,
    rowsStockProducts,
    navigate,
    rowsOutOfStockProducts,
  } = useProducts();
  const { createStockProduct } = useStoreHouse();

  useEffect(() => {
    loadStockProducts();
    loadNoStockProducts();
  }, []);

  const rowsWithIds = rowsStockProducts;
  const createProduct = () => {
    navigate("/auth/CrearProducto");
  };

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
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row._id,
        row.name,
        row.description,
        row.price,
        row.size,
        row.tag,
      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "productos.xlsx");
    });
  };
  console.log(rowsOutOfStockProducts.length > 0);

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
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

  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Administración de producto
        </Typography>
      </Grid>
      {rowsOutOfStockProducts.length > 0 ? (
        <Grid item xs={6} lg={6} mr={1}>
          <Typography variant="h1" fontSize={"30px"}>
            Productos sin almacen
          </Typography>

          <DataGrid
            sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
            columns={[
              {
                field: "tag",
                headerName: "Código",
                flex: 1,
                align: "center",
              },
              {
                field: "name",
                hideable: false,
                headerName: "Nombre del prodcto",
                flex: 1,
                sortable: false,
              },
              {
                field: "price",
                headerName: "Precio",
                flex: 1,
                align: "center",
              },
              {
                field: "size",
                headerName: "Tamaño",
                flex: 1,
                align: "center",
              },
              {
                field: "weight",
                headerName: "Peso",
                flex: 1,
                align: "center",
              },

              {
                field: "Opciones",
                headerName: "Opciones",
                align: "center",
                flex: 1,
                sortable: false,
                type: "actions",
                getActions: (params) => [
                  <AddButton
                    title={`Agregar`}
                    product={params?.row}
                    text={`¿Quiere agregar al almacen el producto ${params.row.name}?`}
                  />,
                ],
              },
            ]}
            rows={rowsOutOfStockProducts}
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
      ) : (
        ""
      )}
      <Grid item xs={12} lg={rowsOutOfStockProducts.length > 0 ? 6 : 12}>
        <Typography
          bgcolor={orange[900]}
          variant="h3"
          color={"#fff"}
          borderRadius={2}
          marginY={2}
          textAlign={"center"}
          fontSize={"30px"}
        >
          Stock de productos
        </Typography>

        <DataGrid
          sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
          columns={[
            {
              field: "tag",
              headerName: "Código",
              flex: 1,
              align: "center",
            },
            {
              field: "name",
              hideable: false,
              headerName: "Nombre del prodcto",
              flex: 1,
              sortable: false,
            },
            {
              field: "price",
              headerName: "Precio",
              flex: 1,
              align: "center",
            },
            {
              field: "stock",
              headerName: "Existencia",
              flex: 1,
              align: "center",
            },
            {
              field: "size",
              headerName: "Tamaño",
              flex: 1,
              align: "center",
            },
            {
              field: "weight",
              headerName: "Peso",
              flex: 1,
              align: "center",
            },
            {
              field: "Opciones",
              headerName: "Opciones",
              align: "center",
              flex: 1,
              sortable: false,
              type: "actions",
              getActions: (params) => [
                <AddButton2
                  title={`Agregar`}
                  product={params?.row}
                />,
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
      </Grid>
    </Grid>
  );
};

export default MyStockProducts;
