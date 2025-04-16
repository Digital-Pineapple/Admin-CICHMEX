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
import { Button, ButtonGroup, Modal, Box, Typography, TextField } from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import { useStoreHouse } from "../../hooks/useStoreHouse";

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

// Iconos personalizados para el ordenamiento
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación personalizada para DataGrid
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const AddProductsToSH = () => {
  const { loadProducts, products, navigate } = useProducts();
  const { loadAllStock, rowsStocks } = useStoreHouse();
  const [openModal, setOpenModal] = useState(false);
  const { createStockProduct } = useStoreHouse();

  const [info, setinfo] = useState('');
  const [quantity, setQuantity] = useState('');
  const { id } = useParams();

  // Cargar productos y stock al montar el componente
  useEffect(() => {
    loadProducts();
    loadAllStock(id);
  }, [id]);

  // Estilo para el modal
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

  // Navegar a la página anterior
  const Out = () => {
    navigate(`/auth/Almacenes/${id}`);
  };

  // Exportar datos a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(`Productos en almacen: ${StoreHouse?.name}`);

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre del producto",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([row._id, row.name]);
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

  // Agregar un producto al almacén
  const addProductInBranch = (quantity, values) => {
    createStockProduct(id, { stock: quantity, product_id: values._id });
    handleClose();
  };

  // Abrir el modal para agregar producto
  const handleOpen = (values) => {
    setinfo(values);
    setOpenModal(true);
  };

  // Cerrar el modal
  const handleClose = () => setOpenModal(false);

  // Barra de herramientas personalizada para DataGrid
  function CustomToolbar() {
    const apiRef = useGridApiContext();

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

  console.log(rowsStocks);

  return (
    <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      {/* Botón para regresar */}
      <Button onClick={() => Out()} variant="contained" color="primary">
        regresar
      </Button>
      {/* Tabla de datos */}
      <DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          {
            field: "tag",
            hideable: false,
            headerName: "Código",
            flex: 1,
            sortable: "false",
          },
          {
            field: "name",
            hideable: false,
            headerName: "Nombre del producto",
            flex: 2,
            sortable: false,
          },
          {
            field: "stock",
            hideable: false,
            headerName: "Existencias",
            flex: 2,
            sortable: false,
          },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              <>
                {/* Botón para abrir el modal y agregar producto */}
                <Button key={params.row._id} onClick={() => { handleOpen(params.row); }} variant="outlined" color="primary">
                  Agregar
                </Button>
              </>
            ],
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
      {/* Modal para agregar producto */}
      <Modal
        keepMounted
        open={openModal}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Agregar producto: {info.name}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Cantidad:
          </Typography>
          <TextField
            id="quantity"
            variant="outlined"
            color="primary"
            margin="none"
            sizes="small"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button onClick={() => addProductInBranch(quantity, info)} variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProductsToSH;
