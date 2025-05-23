import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import {
  Button,
  Chip,
  Grid,
  Grid2,
  IconButton,
  PaginationItem,
  Switch,
  TablePagination,
  Tooltip,
  Typography,
  useTheme, Fab,
} from "@mui/material";
import { Workbook } from "exceljs";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  ScheduleSend as ScheduleSendIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  Visibility,
  Verified,
  Refresh,
  Close,
  Check,
  Edit,
  Add,
} from "@mui/icons-material";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import dayjs from "dayjs";
import { useDiscounts } from "../../hooks/useDiscounts";
import { localDate } from "../../Utils/ConvertIsoDate";
import { esES } from '@mui/x-data-grid/locales'
import ModalDicountDetail from "../../components/Modals/ModalDicountDetail";

// Componente de paginación personalizada para la tabla
function Pagination({ page, onPageChange, className, rowsPerPage, onRowsPerPageChange }) {
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
      renderItem={(item) => (
        <PaginationItem
          {...item}
          slots={{
            previous: () => '← Anterior',
            next: () => 'Siguiente →',
            first: () => 'Primera',
            last: () => 'Última'
          }}
        />
      )}
      getItemAriaLabel={(type, page) => {
        switch (type) {
          case 'page': return `Página ${page}`;
          case 'first': return 'Primera página';
          case 'last': return 'Última página';
          case 'next': return 'Página siguiente';
          case 'previous': return 'Página anterior';
          default: return '';
        }
      }}
    />
  );
}

// Icono para indicar orden descendente en las columnas
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

// Icono para indicar orden ascendente en las columnas
export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

// Icono para indicar que una columna no está ordenada
export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada que utiliza el componente de paginación definido
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Barra de herramientas personalizada para la tabla
function CustomToolbar() {
  const apiRef = useGridApiContext();

  // Función para regresar a la primera página
  const handleGoToPage1 = () => apiRef.current.setPage(1);

  // Función para exportar los datos de la tabla a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Pedidos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Cantidad de productos",
      "Tipo de envio",
      "Id de Pedido",
      "Fecha de solicitud",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row.quantityProduct,
        row.typeDelivery,
        row.order_id,
        row.createdAt,
      ]);
    });

    // Crear un archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Pedidos.xlsx");
    });
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <Button onClick={handleGoToPage1}>Regresar a la página 1</Button>
      <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
      <Button
        variant="text"
        startIcon={<DownloadIcon />}
        disableElevation
        sx={{ color: "secondary" }}
        onClick={exportToExcel}
      >
        Descargar Excel
      </Button>
    </GridToolbarContainer>
  );
}

// Componente principal que muestra la lista de descuentos
const Discounts = () => {
  const { loadAllDiscounts, discounts, loadingDiscount, changeActiveDiscount } = useDiscounts();
  const { navigate, user } = useAuthStore();
  const [openModal, setOpenModal] = useState({value:false, data:{}})

  // Cargar todos los descuentos al montar el componente
  useEffect(() => {
    loadAllDiscounts();
  }, [user]); 

  // Formatear los datos de los descuentos para la tabla
  const rowsWithIds = Array.isArray(discounts) 
    ? discounts.map((item, index) => ({
        id: index.toString(),
        date_start: localDate(item.start_date),
        date_expiration: localDate(item.expiration_date),
        ...item,
      }))
    : [];

  // Abrir el modal con los detalles del descuento
  const handleOpenModal = (info) => setOpenModal({value:true, data: info });
  // Cerrar el modal
  const handleCloseModal = () => setOpenModal({value: false, data: {}});

  // Renderizar los íconos de acciones (editar y ver detalle)
  const renderIcon = (values) => {
      return (
        <>
        <IconButton
            aria-label="Edit-discount"
            color="success"
            title="Editar"
            onClick={() =>
              navigate(`/promociones/editar_descuento/${values.row._id}`)
            }
          >
            <Edit />
          </IconButton>
          <IconButton
            sx={{ display: {} }}
            aria-label="Ver detalle"
            color="primary"
            title="Ver detalle"
            onClick={()=> handleOpenModal(values.row)
            }
          >
            <Visibility />
          </IconButton>
        </>
      );
  };

  // Cambiar el estado activo/inactivo de un descuento
  const handleChangeActive = (data)=>{
    const active = data.row.is_active
    const newValue = !active
    changeActiveDiscount(data.row._id,newValue)
  }

  // Renderizar el switch para activar/desactivar un descuento
  const renderChip = (values) => {
    const { is_active } = values.row;
      return <Switch checked={is_active} color="secondary" onClick={()=>handleChangeActive(values)} />
  };

  // Renderizar el tipo de descuento con un chip
  const renderType = (data) => {
    const { type_discount } = data.row;

    const info = [
      { value: 'is_percent', color: 'secondary', label: 'Porcentaje(%)' },
      { value: 'is_amount', color: 'info', label: 'Monto($)' },
      { value: 'free_shipping', color: 'success', label: 'Envío gratis' },
      { value: 'first_buy', color: 'warning', label: 'Primera compra' },
      { value: 'for_creators', color: 'error', label: 'Creadores' },
    ];

    const validItem = info.find((item) => item.value === type_discount);

    if (validItem) {
      return <Chip color={validItem.color} label={validItem.label} />;
    }

    return null; // Devuelve null si no hay elementos válidos
  };

  // Mostrar pantalla de carga si los descuentos están cargando
  if (loadingDiscount) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container>
      {/* Título de la página */}
      <Grid2
        marginTop={{ xs: "-30px" }}
        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Todos los descuentos
        </Typography>
      </Grid2>
      {/* Botón flotante para agregar un nuevo descuento */}
      <Grid2
        marginY={1}
        display={"flex"}
        alignContent={"center"}
        justifyContent={"end"}
        size={12}
      >
        <Fab
          color="secondary"
          aria-label="Add-discount"
          onClick={()=>navigate('/promociones/agregar_descuento')}
        >
          <Add />
        </Fab>
      </Grid2>
      {/* Tabla de descuentos */}
      <Grid2 size={12}>
        <DataGrid
          sx={{ fontSize: "14px", fontFamily: "sans-serif" }}
          columns={[
            {
              field: "is_active",
              headerName: "Activo",
              flex: 0.5,
              align: "center",
              renderCell: (params) => [renderChip(params)],
            },
            {
              field: "name",
              headerName: "Nombre",
              flex: 0.8,
            },
            {
              field: "code",
              headerName: "Código",
              flex: 0.8,
              sortable: false,
            },
            {
              field: "date_start",
              headerName: "Fecha de inicio",
              flex: 1.5,
              sortable: false,
            },
            {
              field: "date_expiration",
              headerName: "Fecha de expiración",
              flex: 1.5,
              sortable: false,
            },
            {
              field: "type",
              headerName: "Tipo",
              flex: 1,
              sortable: false,
              renderCell: (params)=> [renderType(params)]
            },
            {
              field: "Opciones",
              headerName: "Opciones",
              align: "center",
              flex: 1,
              sortable: false,
              type: "actions",
              getActions: (params) => [renderIcon(params)],
            },
          ]}
          rows={rowsWithIds}
          autoHeight
          pagination
          slots={{
            pagination: CustomPagination,
            toolbar: CustomToolbar,
            columnSortedDescendingIcon: SortedDescendingIcon,
            columnSortedAscendingIcon: SortedAscendingIcon,
            columnUnsortedIcon: UnsortedIcon,
            noRowsOverlay: CustomNoRows,
          }}
          disableRowSelectionOnClick
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
      </Grid2>
      {/* Modal para mostrar detalles del descuento */}
      <ModalDicountDetail open={openModal.value} handleClose={handleCloseModal} data={openModal.data}/>
    </Grid2>
  );
};

export default Discounts;
