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
  

  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Productos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Nombre del producto",
      "Descripción",
      "Precio",
      "Tamaño",
      "Código",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsProducts.forEach((row) => {
      worksheet.addRow([
        row.name,
        row.description,
        row.price,
        row.size,
        row.tag,
      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "productos.xlsx");
    });
  };

  function CustomToolbar() {

    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(0);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
            <Button variant="text" sx={{fontStyle:'oblique'}} onClick={()=> handleGoToPage1()} color="primary">
              Regresar a pagina 1
            </Button>
      </GridToolbarContainer>
    );
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

  return (
    <Grid2 container gap={2} maxWidth={"85vw"}>
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
          Productos
        </Typography>
      </Grid2>
      <Grid2 display={"flex"} justifyContent={"end"} rowSpacing={2} size={12}>
        <Button
          size="small"
          startIcon={<Refresh />}
          variant="contained"
          color="primary"
          onClick={() => setPaginationModel({page:0, pageSize:20})}
        >
          Recargar
        </Button>
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
        sx={{ fontSize: "15px", fontFamily: "sans-serif" }}
        density="compact"
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
        slots={{
          toolbar: CustomToolbar
        }}
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
