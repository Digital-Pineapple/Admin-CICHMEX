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
import { useServices } from "../../hooks/useServices";
import MuiPagination from "@mui/material/Pagination";
import { CancelScheduleSend, Clear, Done, Download, Edit, LocalShipping } from "@mui/icons-material";
import Title from "antd/es/typography/Title";
import WarningAlert from "../../components/ui/WarningAlert";
import { useNavigate } from "react-router-dom";
import { redirectPages } from '../../helpers';
import { Button, Chip, IconButton, Tooltip } from "@mui/material";
import { Workbook } from "exceljs";
import { useProducts } from "../../hooks/useProducts";
import { editOneProduct } from "../../store/actions/productsActions";
import { useProductOrder } from "../../hooks/useProductOrder";
import PaidIcon from '@mui/icons-material/Paid';
import PendingIcon from '@mui/icons-material/Pending';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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

const MyProductOrders = () => {
  const { loadProductOrders, loadProductOrder, navigate, dispatch, productOrder, productOrders, isLoading } = useProductOrder();

  useEffect(() => {
    loadProductOrders()
  }, []);

  const rowsWithIds = productOrders.map((item, index) => {
    const quantities = item.products.map(i => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? 'En Punto de entrega':'A domicilio'           
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      ...item
    };
  });
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Stock de productos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Cantidad de productos",
      "Tipo de envio",
      "Existencias",
      "Precio",
      "Tamaño",
    
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([row._id, row.name, row.description, row.price, row.size, row.tag]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Ordenes de producto.xlsx");
    });
  };

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
      <Title>Ordenes de producto</Title>
      <DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          // {
          //   field: "_id",
          //   hideable: false,
          //   headerName: "Id",
          //   flex: 1,
          //   sortable: "false",
          // },
          {
            field: "createdAt",
            headerName: "Fecha de solicitud",
            flex: 1,
            align: "center",
          },
          {
            field: "quantityProduct",
            headerName: "Catidad de producto",
            flex: 1,
            align: "center",
          },
          {
            field: "typeDelivery",
            hideable: false,
            headerName: "Tipo de envio",
            flex: 1,
            sortable: false,
          },
          {
            field: "payment_status",
            headerName: "Status de pago",
            flex: 1,
            align: "center",
            renderCell: (params) =>
              params.value === 'approved' ? (
                <>
                  <Chip
                    icon={<PaidIcon />}
                    label="Pagado"
                    variant="outlined"
                    color="success"
                  />
                </>
              ) :(
                <>
                  <Chip
                    icon={<PendingIcon />}
                    label="Pendiente"
                    variant="outlined"
                    color="info"
                  />
                </>
              ),
          },
          {
            field: "storeHouseStatus",
            headerName: "Orden preparada",
            flex: 1,
            align: "center",
            renderCell: (params) =>
              params.value === true ? (
                <>
                  <Chip
                    icon={<Done />}
                    label="Surtido"
                    variant="outlined"
                    color="success"
                  />
                </>
              ) :(
                <>
                  <Chip
                    icon={<Clear />}
                    label="Pendiente"
                    variant="outlined"
                    color="error"
                  />
                </>
              ),
          },
          {
            field: "route_status",
            headerName: "Ruta",
            flex: 1,
            align: "center",
            renderCell: (params) =>
              params.value === true ? (
                <>
                  <Chip
                    icon={<LocalShippingIcon />}
                    label="En camino"
                    variant="outlined"
                    color="success"
                  />
                </>
              ) :(
                <>
                  <Chip
                    icon={<CarCrashIcon />}
                    label="Sin ruta"
                    variant="outlined"
                    color="error"
                  />
                </>
              ),
          },
          {
            field: "deliveryStatus",
            headerName: "Entregado",
            flex: 1,
            align: "center",
            renderCell: (params) =>
              params.value === true ? (
                <>
                  <Chip
                    icon={<LocalShipping />}
                    label="Entregado"
                    variant="outlined"
                    color="success"
                  />
                </>
              ) :(
                <>
                  <Chip
                    icon={<CancelScheduleSend />}
                    label="Pendiente"
                    variant="outlined"
                    color="error"
                  />
                </>
              ),
          },
         
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              <Tooltip title='Surtir orden' >
              <IconButton aria-label="Surtir" color="success" onClick={()=>redirectPages(navigate,(`/auth/surtir-orden/${params.row._id}`))} >
                <AddShoppingCartIcon />
              </IconButton> 
              </Tooltip>
                             
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

export default MyProductOrders

