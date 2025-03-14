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
import { Add, Download, Refresh } from "@mui/icons-material";
import { Button, Fab, Grid, Grid2, Typography } from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import AddButton2 from "../../components/Buttons/AddButton2";
import { orange } from "@mui/material/colors";
import { useAuthStore } from "../../hooks";
import EntriesOutputsModal from "../../components/Modals/EntriesOutputsModal";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
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

const ProductEntries = () => {
  const { loadAllInputs, rowsAllInputs } = useProducts();
  const { loading } = useAuthStore();
  const { user, navigate } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");

  const handleClickOpen = (detail) => {
    setOpen(true);
    setDetails(detail);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadAllInputs();
  }, [user]);

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
    rowsEntriesProducts.forEach((row) => {
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
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
      </GridToolbarContainer>
    );
  }

  if (loading) {
    return <LoadingScreenBlue />;
  }

  const paths = [
    { path: `/mi-almacen/productos/entradas`, name: "Todas mis entradas" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} gap={1}>
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
          <strong>Todas mis entradas de producto</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
        <Fab
          onClick={() => navigate("/mi-almacen/agregar-entrada")}
          color="secondary"
          aria-label="Agregar entrada"
          title="Agragar entradas"
        >
          <Add />
        </Fab>
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
              field: "folio",
              headerName: "Folio",
              align: "center",
              flex: 1,
            },
            {
              field: "date",
              headerName: "Fecha",
              flex: 1,
              align: "center",
            },
            {
              field: "tag",
              headerName: "Código",
              flex: 1,
              align: "center",
            },
            {
              field: "product_name",
              headerName: "Nombre del prodcto",
              flex: 1,
              align: "center",
            },
            {
              field: "quantity",
              headerName: "Cantidad",
              flex: 1,
              align: "center",
            },
            {
              field: "quantity_received",
              headerName: "Cantidad recibida en almacen",
              flex: 1,
              align: "center",
            },
            {
              field: "newQuantity",
              headerName: "Nueva Cantidad",
              flex: 1,
              align: "center",
            },
            {
              field: "nowStock",
              headerName: "Stock actual",
              flex: 1,
              align: "center",
            },
            {
              field: "responsible",
              headerName: "Responsable",
              flex: 1,
              align: "center",
            },
          ]}
          rows={rowsAllInputs}
          pagination
          autoHeight
          density="compact"
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
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
          }}
          style={{ fontFamily: "sans-serif", fontSize: "15px" }}
        />
      </Grid2>
      <EntriesOutputsModal
        open={open}
        handleClose={handleClose}
        details={details}
      />
    </Grid2>
  );
};

export default ProductEntries;
