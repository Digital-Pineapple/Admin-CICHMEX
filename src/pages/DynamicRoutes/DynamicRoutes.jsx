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
import { redirectPages } from '../../helpers';
import { Button, IconButton, Tooltip, Grid, Typography, Fab } from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import { editOneProduct } from "../../store/actions/productsActions";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import {  useAuthStore } from "../../hooks";
import { useDynamicRoutes } from "../../hooks/useDynamicRoutes";
import CustomNoRows from "../../components/Tables/CustomNoRows";

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
  const {user} = useAuthStore()
  const { loadDynamicRoutes, rowsRoutes, loading, navigate, deleteDynamicRoute } = useDynamicRoutes()

  useEffect(() => {
    loadDynamicRoutes()
  }, [user]);
  
  function CustomToolbar() {
    const apiRef = useGridApiContext();
  
    const handleGoToPage1 = () => apiRef.current.setPage(1);

   
  
    return (
      <GridToolbarContainer sx={{justifyContent:'space-between'}}>
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
        <GridToolbarQuickFilter/>
      </GridToolbarContainer>
    );
  }

  if (loading) return (<LoadingScreenBlue/>)
    

  return (
    <Grid container gap={2} maxWidth={'85vw'}>
      <Grid item marginTop={{xs:'-30px'}} xs={12} minHeight={'100px'} className="Titles">   
      <Typography textAlign={'center'} variant="h1" fontSize={{xs:'20px', sm:'30px', lg:'40px'}} >
        Rutas
      </Typography>
      </Grid>
      <Grid item xs={12}>
        <Fab
          sx={{ right: "-80%" }}
          onClick={() => navigate("/url/agregar")}
          color="secondary"
          aria-label="Agregar ruta"
          title="Agregar ruta"
        >
          <Add />
        </Fab>
      </Grid>
      <DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
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
            field: "authRequired",
            headerName: "Autenticación",
            flex: 1,
            align: "center",
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
              <Tooltip title='Editar Ruta' >

              <IconButton aria-label="Editar" color="success" onClick={()=>(navigate(`/url/editar/${params.row._id}`, {replace:true}))} >
                <Edit />
              </IconButton> 
              </Tooltip>
                             
            ],
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "name", sort: "desc" }],
          },
          pagination:{
            paginationModel:{pageSize:20}
          }
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
        style={{fontFamily:'sans-serif', fontSize:'15px'}}
      />
    </Grid>
  );
}

export default DynamicRoutes