import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AccountCircle,
  Download,
  Edit,
  Refresh,
  Search,
  Star,
  ViewModule,
  Visibility,
  Warning,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Grid2,
  Stack,
  TextField,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import DeleteAlert from "../../components/ui/DeleteAlert";
import { useAuthStore } from "../../hooks";
import ProductDetailModal from "../../components/Modals/ProductDetailModal";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

const OutOfStock = () => {
  const { user } = useAuthStore(); // Obtiene la información del usuario autenticado
  const {
    loadProductsOutOfStock, // Carga productos paginados
    navigate, // Navegación entre rutas
    deleteProduct, // Elimina un producto
    loadProduct, // Carga un producto específico
    productsPaginate, // Datos de productos paginados
    product, // Producto seleccionado
    loading, // Estado de carga
    loadProductsBySearch, // Carga productos por búsqueda
  } = useProducts();

  const [openModal, setOpenModal] = useState(false); // Estado para abrir/cerrar el modal de detalles del producto
  const [minNumber, setMinNumber] = useState(5)

  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Página actual
    pageSize: 20, // Tamaño de página
  });

  const [rows, setRows] = useState([]); // Filas de datos para la tabla

  // Efecto para cargar productos paginados cuando cambian la página o el usuario
  useEffect(() => {
    loadProductsOutOfStock(paginationModel.page + 1, paginationModel.pageSize, minNumber);
  }, [paginationModel, user, minNumber]);

  // Efecto para actualizar las filas cuando se cargan los productos paginados
  useEffect(() => {
    if (productsPaginate?.products) {
      setRows(rowsProducts(productsPaginate.products));
    }
  }, [productsPaginate]);

  // Función para transformar los datos de productos en filas para la tabla
  const rowsProducts = useCallback(
    (data) =>
      data?.map((item, _id) => ({
        id: _id.toString(),
        Category: item?.category?.name,
        SubCategory: item?.subCategory?.name,
        ...item,
      })),
    []
  );

  const [value, setValue] = useState(""); // Estado para el valor del campo de búsqueda

  // Función para buscar productos
  function searchProduct() {
    const search = value.trim();
    if (search.length < 1) {
      return;
    }
    loadProductsBySearch(search);
  }


 
  const paths = [
    { path: `/almacen/agotados`, name: "Productos agotados" }, // Ruta para el breadcrumb
  ];

  const handleChange = (event) => {
    setMinNumber(event.target.value);
  };

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} gap={1}>
      {/* Título de la página */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: "16px", lg: "25px" } }}>
          <strong>Productos agotados</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb */}
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>


      {/* Campo de búsqueda */}
      
      <FormControl fullWidth>
        <InputLabel id="selct-min-stock">Stock Mínimo</InputLabel>
        <Select
          labelId="selct-min-stock-label"
          id="selct-min-stock"
          value={minNumber}
          label="Stock mínimo"
          onChange={handleChange}
        >
          <MenuItem value={5}>5 pzas</MenuItem>
          <MenuItem value={10}>10 pzas</MenuItem>
          <MenuItem value={20}>15 pzas</MenuItem>
        </Select>
      </FormControl>

      {/* Tabla de productos */}
      <DataGrid
        density="compact"
        sx={{
          fontSize: "12px",
          fontFamily: "sans-serif",
          borderRadius: "20px",
          bgcolor: "#fff",
          border: "1px solid rgb(209, 205, 205)",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgb(230, 223, 223)",
          },
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={[
          {
            field: "name",
            hideable: false,
            headerName: "Nombre del prodcto",
            flex: 1,
            sortable: false,
          },
          {
            field: "totalStock",
            headerName: "Existencia",
            flex: 1,
            align: "center",
          },
          {
            field: "sku",
            headerName: "sku",
            flex: 1,
            align: "center",
          },
          {
            field: "tag",
            headerName: "tag",
            flex: 1,
            align: "center",
          },
          
        ]}
        rows={rows}
        pagination
        paginationMode="server"
        rowCount={productsPaginate.totalProducts}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={loading}
        style={{ fontFamily: "sans-serif", fontSize: "15px" }}
      />
     
    </Grid2>
  );
};

export default OutOfStock;
