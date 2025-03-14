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
  const { user } = useAuthStore();
  const {
    loadProductsPaginate,
    navigate,
    deleteProduct,
    loadProduct,
    productsPaginate,
    product,
    loading,
    loadProductsBySearch
  } = useProducts();
  const [openModal, setOpenModal] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [rows, setRows] = useState([]);


  useEffect(() => {
    loadProductsPaginate(paginationModel.page + 1, paginationModel.pageSize);
  }, [paginationModel, user]);
  
  useEffect(() => {
    if (productsPaginate?.products) {
      setRows(rowsProducts(productsPaginate.products));
    }
  }, [productsPaginate]);

  const rowsProducts = useCallback((data) =>
    data?.map((item, _id) => ({
      id: _id.toString(),
      Category: item?.category?.name,
      SubCategory: item?.subCategory?.name,
      ...item,
    })), []
  );
  const [value, setValue] = useState('')

  function searchProduct() {
    const search = value.trim();
    if(search.length < 1){
      return
    } 
    loadProductsBySearch(search);
  }
  


  // if (loading) return <LoadingScreenBlue />;

  const handleOpen = async (id) => {
    await loadProduct(id);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

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
    { path: `/mi-almacen/productos`, name: "Todos mis productos" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} gap={1} >
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
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
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
      <TextField
        size='small'
        value={value}
        fullWidth
        placeholder="Buscar productos"
        onChange={(e)=>setValue(e.target.value)}    
        onKeyUp={(e)=>{
          if(e.key === 'Enter'){
            searchProduct()
          }          
        }}                    
        // focused
        InputProps={{ 
          // autoComplete:false,   
          style: {
            borderRadius: '5px',
            backgroundColor: 'white',
            paddingLeft :'8px',
            // width:
          },   
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={()=>searchProduct()} aria-label='search'>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    
      <DataGrid
        density="compact"
         sx={{
                    fontSize: "12px",
                    fontFamily: "sans-serif",
                    borderRadius: "20px",
                    bgcolor: "#fff",
                    border: "1px solid rgb(209, 205, 205)", // Borde exterior naranja
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid rgb(230, 223, 223)", // Borde interno claro
                    },
                  }}
                  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={[
          // {
          //   field: "tag",
          //   headerName: "Código",
          //   flex: 1,
          //   align: "center",
          // },
          {
            field: "name",
            hideable: false,
            headerName: "Nombre del prodcto",
            flex: 1,
            sortable: false,
          },
          // {
          //   field: "price",
          //   headerName: "Precio",
          //   flex: 1,
          //   align: "center",
          // },
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
            renderCell: (params)=>[
              params.row.product_key ? 
              params.row.product_key : 
              (
              <Tooltip title='Falta clave sat'>
                <Warning color="warning"  />
              </Tooltip>
              )
            ]
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
                disabled={params.row?.has_variants ? true: false} 
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
