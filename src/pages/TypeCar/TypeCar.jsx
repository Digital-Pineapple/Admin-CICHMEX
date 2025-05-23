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
import { Button, Grid, Typography } from "@mui/material";
import { Download, Edit } from "@mui/icons-material";
import { useTypeCars } from "../../hooks/UseTypeCars";
import { Workbook } from "exceljs";
import DeleteAlert from '../../components/ui/DeleteAlert'
import EditButton from "../../components/Buttons/EditButton";

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

// Iconos personalizados para el ordenamiento de columnas
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para el DataGrid
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const TypeCar = () => {
  const { loadTypeCars, deleteTypeCar, rowsTypeCars, navigate } = useTypeCars();

  // Cargar los datos de los tipos de autos al montar el componente
  useEffect(() => {
    loadTypeCars()
  }, []);

  // Navegar a la página para crear un nuevo tipo de auto
  const createTypeCar = () => {
    navigate('/auth/createTypeCar')
  }

  // Exportar los datos a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Tipos de autos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre del tipo de auto",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsTypeCars.forEach((row) => {
      worksheet.addRow([row._id, row.name]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "tipos de autos.xlsx");
    });
  };

  // Barra de herramientas personalizada para el DataGrid
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

  return (
    <Grid maxWidth={'85vw'} style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
       <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        {/* Título de la página */}
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Tipos de auto
        </Typography>
      </Grid>
      <DataGrid
        sx={{ fontSize: "20px", mt:2, fontFamily: "BikoBold" }}
        columns={[
          {
            field: "name",
            hideable: false,
            headerName: "Nombre",
            flex: 2,
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
              // Botón para eliminar un tipo de auto
              <DeleteAlert title={`¿Desea eliminar ${params.row.name}?`} callbackToDeleteItem={()=>deleteTypeCar(params.row._id)}/> , 
              // Botón para editar un tipo de auto
              <EditButton title={`¿Desea editar ${params.row.name}?`} callbackToEdit={()=>navigate(`/auth/typeCar/${params.row._id}`)} />           
            ],
          },
        ]}
        
        rows={rowsTypeCars}
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
  );
}

export default TypeCar
