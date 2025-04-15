import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
  DataGrid,
  GridActionsCellItem,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import MuiPagination from "@mui/material/Pagination";
import { Avatar, Button, Chip, Grid, Typography } from "@mui/material";
import { Download, Edit } from "@mui/icons-material";
import DeleteAlert  from "../../components/ui/DeleteAlert";
import { Workbook } from "exceljs";
import { useMembership } from "../../hooks/useMembership";
import EditButton from "../../components/Buttons/EditButton"

// Componente de paginación personalizada para el DataGrid
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="secondary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

// Icono para indicar orden descendente
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono para indicar orden ascendente
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono para indicar que no hay orden aplicado
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada que utiliza el componente Pagination
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Componente principal que muestra la tabla de membresías
export default function Memberships() {
  const { loadMemberships, deleteMembership, memberships, navigate } = useMembership();

  // Cargar las membresías al montar el componente
  useEffect(() => {
    loadMemberships()
  }, []);

  // Agregar un ID único a cada fila de membresía
  const rowsWithIds = memberships.map((membership, _id) => ({
    id: _id.toString(),
    ...membership,
  }));

  // Función para exportar los datos de membresías a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("membership");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre",
      "Precio estándar",
      "Descuento",
      "Precio con descuento",
      "Descuento en productos"
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row._id,
        row.name,
        row.email,
        row.price_standard,
        row.discount_porcent,
        row.price_discount,
        row.discount_products
      ]);
    });

    // Crear un archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "membresias.xlsx");
    });
  };

  // Renderizar porcentaje con formato personalizado
  const RenderPorcent = ({params}) => {
    return (
      <Typography style={{fontSize:'20px'}} >{params.value} % </Typography>
    );
  };

  // Renderizar precios con formato personalizado
  const Rendered = ({params}) => {
    return (
      <Typography style={{fontSize:'20px'}} > $ {params.value}  </Typography>
    );
  };

  // Barra de herramientas personalizada para el DataGrid
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    // Función para regresar a la primera página
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
    <Grid container maxWidth={'85vw'}>
      {/* Título de la página */}
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
          Membresías
        </Typography>
      </Grid>
    
      {/* Tabla de datos con DataGrid */}
      <DataGrid
        sx={{ marginTop:5, fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          // Columna para el nombre de la membresía
          {
            field: "name",
            hideable: false,
            headerName: "Nombre",
            flex: 2,
            sortable: "false",
          },
          // Columna para el precio estándar
          {
            field: "price_standard",
            hideable: false,
            headerName: "Precio estándar",
            flex: 1,
            sortable: false,
            renderCell:(params)=><Rendered params ={params}/>
          },
          // Columna para el porcentaje de descuento
          {
            field: "discount_porcent",
            headerName: "Descuento",
            flex: 1,
            align: "center",
            sortable:false,
            renderCell:(params)=><RenderPorcent params ={params}/>
          },
          // Columna para el descuento en productos
          {
            field: "discount_products",
            headerName: "Descuento en productos",
            flex: 1.5,
            align: "center",
            sortable:false,
            renderCell:(params)=><RenderPorcent params ={params}/>
          },
          // Columna para el precio con descuento
          {
            field: "price_discount",
            headerName: "Precio con descuento",
            flex: 1.5,
            align: "center",
            sortable:false,
            renderCell:(params)=><Rendered params ={params}/>
          },
          // Columna de opciones con botones de eliminar y editar
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              <DeleteAlert title={`¿Desea eliminar ${params.row.name}?`} callbackToDeleteItem={()=> deleteMembership(params.row._id)} />,
              <EditButton disabled={true} title={`¿Desea editar ${params.row.name}?`} callbackToEdit={()=>navigate(`/auth/Membresias/${params.row._id}`)}/>
            ],
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "name", sort: "desc" }],
          },
        }}
        rows={rowsWithIds}
        pagination
        slots={{
          pagination: CustomPagination,
          toolbar: CustomToolbar,
          columnSortedDescendingIcon: SortedDescendingIcon,
          columnSortedAscendingIcon: SortedAscendingIcon,
          columnUnsortedIcon: UnsortedIcon,
        }}
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
