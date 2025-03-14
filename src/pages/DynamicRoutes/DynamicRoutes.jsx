import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
  DataGrid,
  GridActionsCellItem,
  GridPagination,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useServices } from "../../hooks/useServices";
import MuiPagination from "@mui/material/Pagination";
import { Add, Download, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { redirectPages } from "../../helpers";
import {
  Button,
  IconButton,
  Tooltip,
  Grid2,
  Typography,
  Fab,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import { editOneProduct } from "../../store/actions/productsActions";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore } from "../../hooks";
import { useDynamicRoutes } from "../../hooks/useDynamicRoutes";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import { esES } from "@mui/x-data-grid/locales";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

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

const DynamicRoutes = () => {
  const { user } = useAuthStore();
  const {
    loadDynamicRoutes,
    rowsRoutes,
    loading,
    navigate,
    deleteDynamicRoute,
  } = useDynamicRoutes();

  useEffect(() => {
    loadDynamicRoutes();
  }, [user]);

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "center",m:1 }}>
        <GridToolbarQuickFilter label='Buscar'  variant="outlined"/>
      </GridToolbarContainer>
    );
  }

  if (loading) return <LoadingScreenBlue />;

  const paths = [
    { path: `/url`, name: "Mis url's" },
  ];

  return (
    <Grid2 container gap={2} paddingX={{xs:10}} >
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
          <strong>Mis url's</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12} display={"flex"}margin={2} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />

        <Fab
          onClick={() =>
            navigate("/url/agregar", { replace: true })
          }
          color="secondary"
          aria-label="Alta de transportista"
          title="Alta de transportista"
        >
          <Add />
        </Fab>
      </Grid2>
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
            field: "name",
            headerName: "Nombre",
            flex: 1,
            align: "center",
          },
          {
            field: "component",
            headerName: "Componente",
            flex: 1,
            align: "center",
          },
          {
            field: "path",
            hideable: false,
            headerName: "Ruta",
            flex: 2,
            sortable: false,
          },
          {
            field: "rolesAllowed",
            headerName: "Roles Permitidos",
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
              <DeleteAlert
                title={`¿Estas seguro de eliminar la ruta: ${params.row?.name}`}
                callbackToDeleteItem={() => deleteDynamicRoute(params.row._id)}
              />,
              <Tooltip title="Editar Ruta">
                <IconButton
                  aria-label="Editar"
                  color="success"
                  onClick={() =>
                    navigate(`/url/editar/${params.row._id}`, { replace: true })
                  }
                >
                  <Edit />
                </IconButton>
              </Tooltip>,
            ],
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "name", sort: "desc" }],
          },
          pagination: {
            paginationModel: { pageSize: 20 },
          },
        }}
        density="compact"
        rows={rowsRoutes}
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
        style={{ fontFamily: "sans-serif", fontSize: "15px" }}
      />
    </Grid2>
  );
};

export default DynamicRoutes;
