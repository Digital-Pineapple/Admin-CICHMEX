import React, { useEffect, useState } from "react";
import useDeliveryPoints from "../../hooks/useDeliveryPoints";
import { Button, Fab, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import EditButton from "../../components/Buttons/EditButton";
import MuiPagination from "@mui/material/Pagination";
import { Add, Download, Looks, Visibility } from "@mui/icons-material";
import SortIcon from "@mui/icons-material/Sort";
import { Workbook } from "exceljs";
import DeleteAlertInput from "../../components/ui/DeleteAlertInput";
import SwitchButton from "../../components/Buttons/SwitchButton";


export const PointsList = () => {
  const { onGetDeliveryPoints, deliveryPoints, onDeleteDeliveryPoint, onActivateDeliveryPoint, onDesactivateDeliveryPoint } = useDeliveryPoints();
  const navigate = useNavigate();    
  const rowsWithIds = deliveryPoints.map((deliveryPoint, _id) => ({
    id: _id.toString(),
    ...deliveryPoint,  
  }));  

  // Handle toggle for the Switch
  const handleToggle = (id, activate, name) => { 
    if(activate){
      onDesactivateDeliveryPoint(id, name)
    }else{
      onActivateDeliveryPoint(id, name)
    }
  }; 


  useEffect(() => {
    onGetDeliveryPoints();
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
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Puntos de entrega
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Fab
          sx={{ right: "-80%" }}
          onClick={() => navigate("/puntos-entrega/create")}
          color="secondary"
          aria-label="Agregar categoría"
          title="Agragar categoría"
        >
          <Add />
        </Fab>
      </Grid>

      <DataGrid
        sx={{ fontSize: "20px", marginTop: 2, fontFamily: "BikoBold" }}
        columns={[
          {
            field: "name",
            hideable: false,
            headerName: "Sucursal",
            flex: 2,
            sortable: false,
          },
          {
            field: "phone_number",
            hideable: false,
            headerName: "Num de telefono",
            flex: 2,
            sortable: false,
          },      
          {
            field: "activated",
            hideable: false,
            headerName: "Activo",
            flex: 2,
            sortable: false,            
            renderCell: (params) => (
              <SwitchButton
                checked={params.row.activated} // Bind the active state to the row's data
                handleChange={() => handleToggle(params.row._id, params.row.activated, params.row.name)} // Call a toggle function
                color="primary"
              />
            )                                                                                 
          },      
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 3,
            sortable: false,
            type: "actions",
            getActions: (params) => [    
              <Tooltip title={'Ver pedidos'}>
              <IconButton  onClick={() => navigate(`/puntos-entrega/${params.row._id}/ordenes/${params.row.name}`)} >
               <Looks/>
              </IconButton>
              </Tooltip>,
              <Tooltip title="Ver Detalle">
                <IconButton
                  aria-label="ver detalle"
                  color="primary"
                  onClick={() => navigate(`/puntos-entrega/${params.row._id}`)}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>,
              <EditButton
                title={`Desea editar ${params.row.name}?`}
                callbackToEdit={() =>
                  navigate(`/puntos-entrega/editar/${params.row._id}`)
                }
              />,
                 <DeleteAlertInput 
                 title={`¿Desea eliminar ${params.row.name}?`}
                 callbackToDeleteItem={() => onDeleteDeliveryPoint(params.row._id)}    
                 value={params.row.name}        
               />
            ],
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
        // rows={rowsWithIds}
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
