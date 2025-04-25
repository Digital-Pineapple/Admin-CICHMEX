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
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import DeleteAlert from "../../components/ui/DeleteAlert";
import { useAuthStore } from "../../hooks";
import ProductDetailModal from "../../components/Modals/ProductDetailModal";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

const Products = () => {
  const { user } = useAuthStore(); // Obtiene la información del usuario autenticado
  const {
    loadProductsPaginate, // Carga productos paginados
    navigate, // Navegación entre rutas
    deleteProduct, // Elimina un producto
    loadProduct, // Carga un producto específico
    productsPaginate, // Datos de productos paginados
    product, // Producto seleccionado
    loading, // Estado de carga
    loadProductsBySearch, // Carga productos por búsqueda
  } = useProducts();

  const [openModal, setOpenModal] = useState(false); // Estado para abrir/cerrar el modal de detalles del producto
  const [searchQuery, setSearchQuery] = useState(''); 
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Página actual
    pageSize: 30, // Tamaño de página
  });

  const [rows, setRows] = useState([]); // Filas de datos para la tabla
  // Efecto para cargar productos paginados cuando cambian la página o el usuario
  useEffect(() => {
    if (searchQuery) {
      // Si hay búsqueda, usar el endpoint de búsqueda con paginación
      loadProductsBySearch(searchQuery, paginationModel.page + 1, paginationModel.pageSize);
    } else {
      // Si no hay búsqueda, cargar todos los productos
      loadProductsPaginate(paginationModel.page + 1, paginationModel.pageSize);
    }
  }, [paginationModel, searchQuery]);

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
    setSearchQuery(search); // Guardar el término de búsqueda
    setPaginationModel(prev => ({ ...prev, page: 0 })); // Resetear a página 1
  }
  // Función para abrir el modal de detalles de un producto
  const handleOpen = async (id) => {
    await loadProduct(id);
    setOpenModal(true);
  };

  // Función para cerrar el modal de detalles
  const handleClose = () => setOpenModal(false);

  // Función para navegar a la edición de un producto o sus variantes
  const valuateNavigateEdit = async (id) => {
    const response = await loadProduct(id);
    let variants = response.variants;

    if (variants && Array.isArray(variants) && variants.length > 0) {
      navigate(`/mi-almacen/productos/variantes/editar/${id}`);
    } else {
      navigate(`/mi-almacen/productos/editar/${id}`);
    }
  };

  const paths = [
    { path: `/mi-almacen/productos`, name: "Todos mis productos" }, // Ruta para el breadcrumb
  ];

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
          <strong>Todos mis productos</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb */}
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Botones para agregar productos */}
      <Grid2 display={"flex"} justifyContent={"end"} rowSpacing={2} size={12}>
        <Button
          size="small"
          startIcon={<ViewModule />}
          sx={{ marginX: 2 }}
          variant="contained"
          color="success"
          onClick={() => navigate("/mi-almacen/producto/agregar-variantes")}
        >
          Agregar con variantes
        </Button>
        <Button
          size="small"
          startIcon={<Star />}
          variant="contained"
          color="error"
          onClick={() => navigate("/mi-almacen/producto/agregar")}
        >
          Agregar sin variantes
        </Button>
      </Grid2>

      {/* Campo de búsqueda */}
      <TextField
        size="small"
        value={value}
        fullWidth
        placeholder="Buscar productos"
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === '') {
            setSearchQuery(''); 
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            searchProduct();
          }
        }}
        InputProps={{
          style: {
            borderRadius: "5px",
            backgroundColor: "white",
            paddingLeft: "8px",
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => searchProduct()} aria-label="search">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

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
            field: "Category",
            headerName: "Categoria",
            flex: 1,
            align: "center",
          },
          {
            field: "SubCategory",
            headerName: "Subcategoria",
            flex: 1,
            align: "center",
          },
          {
            field: "product_key",
            headerName: "Clave SAT",
            flex: 1,
            align: "center",
            renderCell: (params) => [
              params.row.product_key ? (
                params.row.product_key
              ) : (
                <Tooltip title="Falta clave sat">
                  <Warning color="warning" />
                </Tooltip>
              ),
            ],
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
                title={`¿Estas seguro de eliminar el producto ${params.row?.name}`}
                callbackToDeleteItem={() => deleteProduct(params.row._id)}
                disabled={params.row?.has_variants ? true : false}
              />,
              <Tooltip title="Editar Producto">
                <IconButton
                  aria-label="Editar"
                  color="success"
                  onClick={() => valuateNavigateEdit(params.row._id)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>,
              <Tooltip title="Ver detalle">
                <IconButton
                  aria-label="Ver detalle"
                  color="primary"
                  onClick={() => handleOpen(params.row._id)}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>,
            ],
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

      {/* Modal de detalles del producto */}
      <ProductDetailModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        openModal={openModal}
        product={product ? product : ""}
        setOpenModal={setOpenModal}
      />
    </Grid2>
  );
};

export default Products;
