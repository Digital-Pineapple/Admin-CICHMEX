import { useEffect } from "react"
import { useProducts } from "../../hooks/useProducts"
import { useAuthStore } from "../../hooks"
import { Button, Grid, Typography } from "@mui/material"
import { Workbook } from "exceljs"
import { DataGrid, GridLogicOperator, gridPageCountSelector, GridPagination, GridToolbarContainer, GridToolbarQuickFilter, useGridApiContext, useGridSelector } from "@mui/x-data-grid"
import { orange } from "@mui/material/colors"
import { Download } from "@mui/icons-material"
import AddButton2 from "../../components/Buttons/AddButton2"
import MuiPagination from "@mui/material/Pagination";

const StockMovements = () => {
    const{ loadAllInputs, rowsAllInputs, loadAllOutputs, rowsAllOutputs } = useProducts()
    const {user} = useAuthStore()

    useEffect(() => {
     loadAllInputs()
     loadAllOutputs()
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
      rowsAllInputs.forEach((row) => {
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
    <Grid container gap={4}>
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
          Movimientos de Stock
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6} >
        <Typography
          bgcolor={orange[900]}
          variant="h3"
          color={"#fff"}
          borderRadius={2}
          marginY={2}
          textAlign={"center"}
          fontSize={"30px"}
        >
          Entradas
        </Typography>
        <DataGrid
          sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
          columns={[
            {
              field: "date",
              headerName: "Fecha de entrada",
              flex: 2,
              align: "center",
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
              headerName: "Responsable de entrada",
              flex: 2,
              align: "center",
            },
          ]}
          rows={rowsAllInputs}
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
            pagination:{paginationModel:{pageSize:10, page:0}}
          }}
          pageSizeOptions={[5,10,25]}
        />
      </Grid>ç
      <Grid item xs={12} lg={5} >
        <Typography
          bgcolor={orange[900]}
          variant="h3"
          color={"#fff"}
          borderRadius={2}
          marginY={2}
          textAlign={"center"}
          fontSize={"30px"}
        >
          Salidas
        </Typography>
        <DataGrid
          sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
          columns={[
            {
              field: "date",
              headerName: "Fecha de entrada",
              flex: 2,
              align: "center",
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
            // {
            //   field: "newQuantity",
            //   headerName: "Nueva Cantidad",
            //   flex: 1,
            //   align: "center",
            // },
            {
              field: "nowStock",
              headerName: "Existencia ahora",
              flex: 1,
              align: "center",
            },
            // {
            //   field: "responsible",
            //   headerName: "Responsable de entrada",
            //   flex: 2,
            //   align: "center",
            // },
          ]}
          rows={rowsAllOutputs}
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
            pagination:{paginationModel:{pageSize:10, page:0}}
          }}
          pageSizeOptions={[5,10,25]}
        />
      </Grid>



    </Grid>
  )
}

export default StockMovements