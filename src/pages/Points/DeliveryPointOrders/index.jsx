import React, { useEffect, useState } from "react";
import { Button, Chip, Fab, Grid, Grid2, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteAlert from "../../../components/ui/DeleteAlert";
import MuiPagination from "@mui/material/Pagination";
import { Add, Download, Visibility } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import { Workbook } from "exceljs";
import DeleteAlertInput from "../../../components/ui/DeleteAlertInput";
import SwitchButton from "../../../components/Buttons/SwitchButton";
import useDeliveryPoints from "../../../hooks/useDeliveryPoints";
import QRScannerV2 from "../../../components/QR/QRScannerV2";


export const DeliveryPointsOrder = () => {
  const { id, name } = useParams();
  const { onLoadOrdersByPointDelivery, orders } = useDeliveryPoints();
  const navigate = useNavigate();    
  const rowsWithIds = orders.map((order, _id) => ({
    id: _id.toString(),
    ...order,  
  }));  


  useEffect(() => {
    onLoadOrdersByPointDelivery(id);
  }, []);

  return (
    <Grid container maxWidth={"85vw"} gap={2}>        
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography textAlign={"center"} variant="h1" fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}>
          Pedidos {name}
        </Typography>
      </Grid>  
      <Grid container display={"flex"} alignContent={"center"}>
        {/* <QRScanner /> */}
        <QRScannerV2 />
      </Grid>
      <DataGrid
        sx={{ fontSize: "20px", marginTop: 2, fontFamily: "BikoBold" }}
        columns={[          
          {
            field: "order_id",
            hideable: false,
            headerName: "Folio del pedido",
            flex: 2,
            sortable: false,
          },
          {
            // field: "point_pickup_status",
            hideable: false,
            headerName: "Estatus",
            flex: 2,
            sortable: false,
              renderCell: (params) => {
                let label;
                let color;
                if(params.row.deliveryStatus){
                  label = "Entregado"
                  color = "primary"                  
                }else if(params.row.point_pickup_status){
                  label = "En punto de entrega"
                  color = "success"                  
                }else{
                  label = "Pendiente"
                  color = "secondary"                  
                }          
                return (
                  <Chip label={label} color={color} variant="outlined" />                
                );

              }
                
          },            
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          },
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        density="standard"        
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
        style={{ fontFamily: "sans-serif", fontSize: "15px" }}
      />
    </Grid>
  );
};

function CustomToolbar() {
  const apiRef = useGridApiContext();

  const handleGoToPage1 = () => apiRef.current.setPage(1);

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
      <GridToolbarQuickFilter />
      <Button
        variant="text"
        startIcon={<Download />}
        disableElevation
        sx={{ color: "secondary" }}
        onClick={()=>null}
      >
        Descargar Excel
      </Button>
    </GridToolbarContainer>
  );
}

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
