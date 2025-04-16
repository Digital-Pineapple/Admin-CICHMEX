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
import { Button, Grid, Typography } from "@mui/material";
import { Workbook } from "exceljs";
import DeleteAlert from "../../components/ui/DeleteAlert";
import EditButton from "../../components/Buttons/EditButton";

// Componente de paginación personalizada para el DataGrid
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

// Icono personalizado para orden descendente
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono personalizado para orden ascendente
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono personalizado para columnas no ordenadas
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para el DataGrid
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const Services = () => {
  const { loadServices, deleteService } = useServices(); // Hook personalizado para cargar y eliminar servicios
  const { services } = useSelector((state) => state.services); // Selector para obtener los servicios del estado global
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Cargar servicios al montar el componente
  useEffect(() => {
    loadServices();
  }, []);

  // Agregar un ID único a cada fila de datos
  const rowsWithIds = services.map((service, _id) => ({
    id: _id.toString(),
    ...service,
  }));

  // Función para exportar los datos a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Servicios");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre de la categoria",
      "Descripción",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([row._id, row.name, row.description]);
    });

    // Crear un archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "servicios.xlsx");
    });
  };

  // Barra de herramientas personalizada para el DataGrid
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    // Función para regresar a la página 1
    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
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
    <Grid maxWidth={'85vw'} container>
      {/* Título principal */}
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
          Servicios Globales
        </Typography>
      </Grid>

      {/* Tabla de datos con DataGrid */}
      <DataGrid
        sx={{ marginTop: 5, fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          {
            field: "name",
            hideable: false,
            headerName: "Nombre del servicio",
            flex: 1,
            sortable: false,
          },
          {
            field: "description",
            headerName: "Descripción",
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
              // Botón para eliminar un servicio
              <DeleteAlert title={`¿Quieres eliminar ${params.row.name}?`} callbackToDeleteItem={() => deleteService(params.row._id)} />,
              // Botón para editar un servicio
              <EditButton title={`¿Quieres editar ${params.row.name}?`} callbackToEdit={() => navigate(`/auth/servicios/${params.row._id}`)} />
            ],
          },
        ]}
        rows={rowsWithIds}
        pagination
        slots={{
          pagination: CustomPagination, // Paginación personalizada
          toolbar: CustomToolbar, // Barra de herramientas personalizada
          columnSortedDescendingIcon: SortedDescendingIcon, // Icono de orden descendente
          columnSortedAscendingIcon: SortedAscendingIcon, // Icono de orden ascendente
          columnUnsortedIcon: UnsortedIcon, // Icono de columna no ordenada
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

export default Services;
