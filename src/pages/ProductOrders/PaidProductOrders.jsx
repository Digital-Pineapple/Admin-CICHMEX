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
import { Button, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Sort as SortIcon,
  TransferWithinAStation,
} from "@mui/icons-material";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
import { localDate, localDateTable } from "../../Utils/ConvertIsoDate";
import { esES } from "@mui/x-data-grid/locales";
import { useEffect, useState } from "react";
import useDateFormatter from "../../hooks/useFormattedDate";

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

// Componente de paginación personalizada para la tabla
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

// Barra de herramientas personalizada con un filtro rápido
function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: "center" }}>
      <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
    </GridToolbarContainer>
  );
}

// Componente principal que muestra las órdenes de productos pagados
const PaidProductOrders = () => {
  const isXs = useMediaQuery('(max-width:600px)'); // Detecta si la pantalla es pequeña

  const { loadProductOrdersPaid, navigate, productOrders, loading } = useProductOrder(); // Hook para manejar órdenes de productos
  const { user } = useAuthStore(); // Hook para obtener información del usuario

  // Estado para manejar la visibilidad de las columnas
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    typeDelivery: !isXs,
  });

  // Carga las órdenes de productos pagados al montar el componente o cuando cambia el usuario
  useEffect(() => {
    loadProductOrdersPaid();
  }, [user]);

  // Actualiza la visibilidad de columnas según el tamaño de la pantalla
  useEffect(() => {
    setColumnVisibilityModel((prevModel) => ({
      ...prevModel,
      typeDelivery: !isXs,
    }));
  }, [isXs]);

  // Mapea las órdenes de productos para agregar campos personalizados
  const rowsWithIds = productOrders.map((item, index) => {
    const date = localDate(item.createdAt); // Convierte la fecha a formato local
    const quantities = item.products.map((i) => i.quantity); // Obtiene las cantidades de los productos
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio"; // Determina el tipo de entrega
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      date: date,
      id: index.toString(),
      ...item,
    };
  });

  // Muestra una pantalla de carga mientras se obtienen los datos
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Configuración de las columnas de la tabla
  const columns = [
    {
      field: "date",
      headerName: "Fecha",
      flex: 0.5,
      align: "center",
      renderCell: (params) => {
        const date = localDateTable(params.row.createdAt); // Convierte la fecha para mostrarla en la tabla
        const day = date.split("/")[0];
        const month = date.split("/")[1];
        return (
          <Typography variant="h6" fontSize={14} color="initial">
            {day} <br />
            {month}
          </Typography>
        );
      },
    },
    {
      field: "order_id",
      headerName: "Id de pedido",
      flex: 1,
      align: "center",
    },
    {
      field: "typeDelivery",
      headerName: "Tipo de envío",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <span>
          {params.row.typeDelivery === "A domicilio"
            ? "Envío a domicilio"
            : "Punto de entrega"}
        </span>
      ),
    },
    {
      field: "Opciones",
      headerName: "Opciones",
      align: "center",
      flex: 1,
      sortable: false,
      type: "actions",
      renderCell: (params) => (
        <IconButton
          size="small"
          variant="contained"
          onClick={() =>
            navigate(`/almacenista/surtir-venta/${params.row._id}`)
          }
        >
          <Tooltip title="Surtir pedido" arrow>
            <TransferWithinAStation color="success" />
          </Tooltip>
        </IconButton>
      ),
    },
  ];

  // Renderiza la tabla con las órdenes de productos pagados
  return (
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
      rows={rowsWithIds} // Filas de la tabla
      columns={columns} // Columnas de la tabla
      autoHeight
      pagination
      columnVisibilityModel={columnVisibilityModel} // Modelo de visibilidad de columnas
      onColumnVisibilityModelChange={setColumnVisibilityModel} // Maneja cambios en la visibilidad de columnas
      slots={{
        pagination: CustomPagination, // Paginación personalizada
        toolbar: CustomToolbar, // Barra de herramientas personalizada
        columnSortedDescendingIcon: SortedDescendingIcon, // Icono de orden descendente
        columnSortedAscendingIcon: SortedAscendingIcon, // Icono de orden ascendente
        columnUnsortedIcon: UnsortedIcon, // Icono de sin orden
        noRowsOverlay: CustomNoRows, // Componente para mostrar cuando no hay filas
      }}
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Traducción al español
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
  );
};

export default PaidProductOrders;