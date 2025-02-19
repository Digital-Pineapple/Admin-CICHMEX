import { useEffect } from "react"
import { useProducts } from "../../hooks/useProducts"
import { useAuthStore } from "../../hooks"
import { Button, CircularProgress, Grid2, Typography, Box, Tooltip, IconButton } from "@mui/material"
import { Workbook } from "exceljs"
import { DataGrid, GridLogicOperator, gridPageCountSelector, GridPagination, GridToolbarContainer, GridToolbarQuickFilter, useGridApiContext, useGridSelector } from "@mui/x-data-grid"
import { orange } from "@mui/material/colors"
import { ArrowDownward, ArrowUpward, Download, Visibility } from "@mui/icons-material"
import AddButton2 from "../../components/Buttons/AddButton2"
import MuiPagination from "@mui/material/Pagination";

const StockMovements = () => {
    const{ loadAllMovements, allMovements, isLoading } = useProducts()
    const {user} = useAuthStore()

    useEffect(() => {
     loadAllMovements()
    }, [user])
    
  

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
    function CustomPagination(props) {
      return <GridPagination  ActionsComponent={Pagination} {...props} />;
    }
    

    const exportToExcel = () => {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Stock de productos");
  
      // Agregar encabezados de columna
      const headerRow = worksheet.addRow([
        "Código",
        "Nombre del producto",
        "Existencias",
        "Precio",
        "Tamaño",
      ]);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });
  
      // Agregar datos de las filas
      rowsIds.forEach((row) => {
        worksheet.addRow([
          row._id,
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
        saveAs(blob, "entradas.xlsx");
      });
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
            onClick={exportToExcel}
          >
            Descargar Excel
          </Button>
        </GridToolbarContainer>
      );
    }
    
    
  return (
    <Grid2 container gap={4}>
       <Grid2
        size={12}
        marginTop={{ xs: "-30px" }}
       
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Movimiento de Stock
        </Typography>
      </Grid2>
      <Grid2 size={12} >
        <Typography
          bgcolor={orange[900]}
          variant="h3"
          color={"#fff"}
          borderRadius={2}
          marginY={2}
          textAlign={"center"}
          fontSize={"30px"}
        >
          Movimentos
        </Typography>
        {isLoading? (
          <Box display="flex" width={'100%'} height={'100%'} justifyContent={'center'} alignContent={'center'}>
            <CircularProgress color="primary"/>
            <Typography variant="body1" color="initial">Cargando movimientos...</Typography>   
          </Box>
        ): (
        <DataGrid
          sx={{ fontSize: "12px" }}
          columns={[
            {
              field: "date",
              headerName: "Fecha de entrada",
              flex: 2,
              align: "center",
            },
            {
              field: "type",
              headerName: "Tipo",
              flex: 0.5,
              align: "center",
              renderCell: ( params)=>{
                if (params.row.type === 'input') {
                  return ( 
                    <Tooltip title='Alta'>
                      <ArrowUpward color="success"/>
                    </Tooltip>
                  )
                }else{
                  return (
                    <Tooltip title='Baja'>
                      <ArrowDownward color="warning"/>
                    </Tooltip>
                  )
                }
              }
            },
            {
              field: "product_name",
              headerName: "Nombre del producto",
              flex: 2,
              align: "center",
            },
            {
              field: "quantity",
              headerName: "Cantidad",
              flex: 1,
            },
            {
              field: "newQuantity",
              headerName: "Nueva Cantidad",
              flex: 1,
              align: "center",
            },
            {
              field: "nowStock",
              headerName: "Existencia ahora",
              flex: 1,
              align: "center",
            },
            {
              field: "responsible",
              headerName: "Responsable",
              flex: 2,
              align: "center",
            },
          ]}
          rows={allMovements}
          pagination
          slots={{
            pagination: CustomPagination,
            toolbar: CustomToolbar,
          }}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          style={{fontFamily:'sans-serif'}}
          density="compact"
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
          initialState={{
            sorting:{
              sortModel:[{field:'date', sort:'desc'}],
              
            },
            pagination:{paginationModel:{pageSize:50, page:0}}
          }}
          pageSizeOptions={[50,100]}
        />
        )}
      </Grid2>



    </Grid2>
  )
}

export default StockMovements