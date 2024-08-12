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
import { Download, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { redirectPages } from '../../helpers';
import { Button, IconButton, Tooltip, Grid, Typography } from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import { editOneProduct } from "../../store/actions/productsActions";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore, useShippingCost } from "../../hooks";
import EditButton from "../../components/Buttons/EditButton";

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

const ShippingCost = () => {
  const { loadShippingCosts, deleteShippingCost, rowsShippingCosts, loading } = useShippingCost();
  const {user, navigate} = useAuthStore()

  useEffect(() => {
    loadShippingCosts()
  }, [user]);
  
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Productos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Peso inicial",
      "PesoFinal",
      "Precio",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsShippingCosts.forEach((row) => {
      worksheet.addRow([row._id, row.starting_weight, row.end_weight, row.price_weight]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "costos de envio.xlsx");
    });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();
  
    const handleGoToPage1 = () => apiRef.current.setPage(1);
  
    return (
      <GridToolbarContainer sx={{justifyContent:'space-between'}}>
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
        <GridToolbarQuickFilter/>
        <Button
        variant="text"
        startIcon={<Download/>}
        disableElevation
        sx={{ color: "secondary" }}
        onClick={exportToExcel}
      >
        Descargar Excel
      </Button>
      </GridToolbarContainer>
    );
  }

  if (loading) {
    return(<LoadingScreenBlue/>)
  }

  return (
    <Grid container maxWidth={'85vw'}>
      <Grid item marginTop={{xs:'-30px'}} xs={12} minHeight={'100px'} className="Titles">   
      <Typography textAlign={'center'} variant="h1" fontSize={{xs:'20px', sm:'30px', lg:'40px'}} >
        Costos de envio
      </Typography>
      </Grid>
      <DataGrid
        sx={{ marginTop:5, fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          {
            field: `uuid`,
            headerName: "Código",
            flex: 1,
            align: "center",
          },
          {
            field: "starting_weight",
            hideable: false,
            headerName: "Peso inicial(g)",
            flex: 1,
            sortable: false,
          },
          {
            field: "end_weight",
            headerName: "Peso Final(g)",
            flex: 1,
            align: "center",
          },
          {
            field: "price_weight",
            headerName: "Precio por envío($)",
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
                title={`¿Estas seguro de eliminar el costo de envío ${params.row?.uuid}`}
                callbackToDeleteItem={() => deleteShippingCost(params.row._id)}
              />,
              <EditButton title={`Desea editar el siguiente elemento${params.row.uuid}`} callbackToEdit={()=>navigate(`/auth/costo-de-envio/${params.row._id}`)} />
                             
            ],
          },
        ]}
        
        rows={rowsShippingCosts}
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
        initialState={{
          sorting: {
            sortModel: [{ field: 'starting_weight', sort: 'asc' }],
          },
        }}
      />
    </Grid>
  );
}


export default ShippingCost