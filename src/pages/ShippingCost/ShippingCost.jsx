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
import { Button, IconButton, Tooltip, Typography, Grid2, Modal, Box, Fab } from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import { editOneProduct } from "../../store/actions/productsActions";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore, useShippingCost } from "../../hooks";
import EditButton from "../../components/Buttons/EditButton";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import CreateShippingCost from '../../pages/ShippingCost/Create'
import UpdateShippingCost from '../../pages/ShippingCost/Edit'
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

// Estilo para los modales
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'15px',
  boxShadow: 24,
  p: 2,
};

// Componente de paginación personalizada
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

// Iconos personalizados para ordenamiento
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para la tabla
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const ShippingCost = () => {
  const { loadShippingCosts, deleteShippingCost, rowsShippingCosts, loading } = useShippingCost();
  const {user, navigate} = useAuthStore()

  // Estado para controlar los modales de agregar y actualizar
  const [open, setOpen] = React.useState({openAdd: false, openUpdate:false, SC:{}});
  const handleOpenAdd = () => setOpen({openAdd:true});
  const handleOpenUpdate = (values) => setOpen({openUpdate:true,SC:values});
  const handleCloseAdd = (event,reason) => {
    if (reason !== "backdropClick") {
      setOpen({openAdd: false})
    }
  }
  const handleCloseUpdate = (event,reason) =>{ 
    if (reason !== "backdropClick") {
      setOpen({openUpdate: false, SC:{}})
    }
  }

  // Cargar los costos de envío al montar el componente
  useEffect(() => {
    loadShippingCosts()
  }, [user]);
  
  // Función para exportar los datos a un archivo Excel
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

  // Barra de herramientas personalizada para la tabla
  function CustomToolbar() {
    const apiRef = useGridApiContext();
  
    const handleGoToPage1 = () => apiRef.current.setPage(1);
  
    return (
      <GridToolbarContainer sx={{justifyContent:'center'}}>
        <GridToolbarQuickFilter variant="outlined" />
      </GridToolbarContainer>
    );
  }

  // Mostrar pantalla de carga si los datos están cargando
  if (loading) {
    return(<LoadingScreenBlue/>)
  }

  const paths = [
    { path: `/costos-envio`, name: "Costos de envío" },
];

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2} >
      {/* Encabezado de la página */}
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
                    <strong>Costos de envío</strong>
                </Typography>
            </Grid2>
            <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
                <BreadcrumbCustom paths={paths} />
                <Fab onClick={()=>handleOpenAdd()} sx={{top: 10, right:20}} title="Agregar" color="secondary"> <Add/></Fab>
            </Grid2>
    
      {/* Tabla de datos */}
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
                       localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={[
          {
            field: `date`,
            headerName: "Fecha de creación",
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
              <EditButton title={`Desea editar el siguiente elemento${params.row.uuid}`} callbackToEdit={()=>handleOpenUpdate(params.row)} />
            ],
          },
        ]}
        
        rows={rowsShippingCosts}
        pagination
        autoHeight
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
          sorting: {
            sortModel: [{ field: 'starting_weight', sort: 'asc' }],
          },
        }}
      />
      
      {/* Modal para agregar un costo de envío */}
      <Modal
        open={open.openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateShippingCost handleCloseModal={handleCloseAdd} />
        </Box>
      </Modal>

      {/* Modal para actualizar un costo de envío */}
      <Modal
        open={open.openUpdate}
        onClose={handleOpenUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateShippingCost SC={open.SC}  handleCloseModal={handleCloseUpdate} />
        </Box>
      </Modal>
    </Grid2>
  );
}

export default ShippingCost