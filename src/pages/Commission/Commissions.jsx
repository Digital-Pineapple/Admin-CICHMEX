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
import MuiPagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import { Download, Edit } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { redirectPages } from '../../helpers';
import { useCommissions } from "../../hooks/useCommissions";
import { Workbook } from "exceljs";

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

// Icono personalizado para columnas sin ordenar
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada que utiliza el componente Pagination
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const Commissions = () => {
  const { loadCommissions, deleteCommission  } = useCommissions();
  const { commissions } = useSelector((state) => state.commissions);
  const navigate = useNavigate();

  // Cargar las comisiones al montar el componente
  useEffect(() => {
    loadCommissions();
  }, []);

  // Agregar un ID único a cada fila de datos
  const rowsWithIds = commissions.map((commission, _id) => ({
    id: _id.toString(),
    ...commission,
  }));

  // Navegar a la página para crear una nueva comisión
  const createCommission = () => {
    navigate('/auth/CrearComisiones')
  }

  // Exportar los datos de las comisiones a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Comisiones");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre de la comisión",
      "Cantidad",
      'Descuento'
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([row._id, row.name, row.amount, row.discount]);
    });

    // Crear un archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "comisiones.xlsx");
    });
  };

  // Barra de herramientas personalizada para el DataGrid
  function CustomToolbar() {
    const apiRef = useGridApiContext();
  
    // Función para regresar a la primera página
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
    <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      
      {/* Botón para registrar una nueva comisión */}
      <Button
          variant="contained"
          disableElevation
          sx={{ color: "primary", my: 5, p: 2, borderRadius: 5 }}
          onClick={createCommission}
        >
          Registrar nuevo descuento
        </Button>

      {/* Tabla de datos con las comisiones */}
      <DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          {
            field: "_id",
            hideable: false,
            headerName: "Id",
            flex: 1,
            sortable: "false",
          },
          {
            field: "name",
            hideable: false,
            headerName: "Nombre de la promoción",
            flex: 2,
            sortable: false,
          },
          {
            field: "amount",
            headerName: "Cantidad",
            flex: 1,
          },
          {
            field: "discount",
            headerName: "Descuento",
            flex: 1,
          },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              // Acción para redirigir a la edición de una comisión
              <GridActionsCellItem icon={<Edit />} onClick={()=>redirectPages(navigate,(params.row._id))}  label="Editar comisión" showInMenu />,
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
    </div>
  );
}

export default Commissions;
