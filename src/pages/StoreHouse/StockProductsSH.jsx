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
import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { useServices } from "../../hooks/useServices";
import MuiPagination from "@mui/material/Pagination";
import { Download, Edit } from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";
import { redirectPages } from '../../helpers';
import { Button, ButtonGroup, Modal, Box,  Typography, TextField, InputAdornment } from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import { useStoreHouse } from "../../hooks/useStoreHouse";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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




export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const StockProductsSH = () => {
  const { navigate, loadOneStoreHouse, StoreHouseDetail, loadAllStock, rowsStocks, addStockProduct, removeStockProduct } = useStoreHouse();
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openRemoveModal, setOpenRemoveModal] = useState(false)
  const [info, setInfo] = useState('')
  const [quantity, setQuantity] = useState('')
  const { id } = useParams()
 let StoreHouse =StoreHouseDetail
  useEffect(() => {
    loadOneStoreHouse(id)
    loadAllStock(id)
  }, [id]);

  
  
  const createStoreHouse = () => {
    navigate(`/auth/agregar-productos/${id}`)
  }

  const handleAddOpen = (values) => {
    setInfo(values)
    setOpenAddModal(true)
  };
  const handleAddClose = () => {
    setInfo('')
    setQuantity('')
    setOpenAddModal(false)};

  const handleRemoveOpen = (values) => {
    setInfo(values)
    setOpenRemoveModal(true)};

  const handleRemoveClose = () => {
    setInfo('')
    setQuantity('')
    setOpenRemoveModal(false)};
  
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(`Productos en almacen: ${StoreHouse?.name}`);

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre del producto",
      "Cantidad",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsStocks.forEach((row) => {
      worksheet.addRow([row._id, row.product_id, row.stock]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Producto en mi almacen.xlsx");
    });
  };

  const agregateStock = (quantity, info) => {
    addStockProduct(info?._id,{stock:quantity})
   handleAddClose()
  
  }
  const removeStock = (quantity, info) => {
    removeStockProduct(info?._id,{stock:quantity})
   handleRemoveClose()
  
  }


  

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
    <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <Button
          variant="contained"
          disableElevation
          sx={{ color: "primary", my: 5, p: 2, borderRadius: 5 }}
          onClick={createStoreHouse}
        >
          Agregar productos
        </Button>
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
            field: `name`,
            hideable: false,
            headerName: "Nombre del producto",
            flex: 2,
            sortable: false,
          },
          {
            field: "stock",
            headerName: "Quantity",
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
            getActions: (params) => {
              const actions = [];
        
              if (params.row.stock === 0) {
                actions.push(
                
                );
              }
        
              actions.push(
                <ButtonGroup variant="contained" color="primary">
                  <Button onClick={()=>handleAddOpen(params.row)}>Agregar</Button>
                  <Button onClick={()=>handleRemoveOpen(params.row)}>Quitar</Button>
                </ButtonGroup>
              );
        
              return actions;
            },
          },
        ]}
        
        rows={rowsStocks}
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
  
      <Modal
        keepMounted
        open={openAddModal}
        onClose={handleAddClose}
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
           Agregar al Producto : {info?.name}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Stock actual: {info?.stock}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Agregar:
          </Typography>
          <TextField
           
            id="quantity"
            variant="outlined"
            color="primary"
            margin="none"
            sizes="small"
            value={quantity}
            InputProps={{
              endAdornment: <InputAdornment position="start">Pz's</InputAdornment>,
            }}
            onChange={(e)=>setQuantity(e.target.value)}
          />
          <Button onClick={()=>agregateStock(quantity, info)} variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={openRemoveModal}
        onClose={handleRemoveClose}
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
           Quitar al Producto : {info?.name}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Stock actual: {info?.stock}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Quitar:
          </Typography>
          <TextField
           
            id="quantity"
            variant="outlined"
            color="primary"
            margin="none"
            sizes="small"
            value={quantity}
            InputProps={{
              endAdornment: <InputAdornment position="start">Pz's</InputAdornment>,
            }}
            onChange={(e)=>setQuantity(e.target.value)}
          />
          <Button onClick={()=>removeStock(quantity, info)} variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default StockProductsSH

