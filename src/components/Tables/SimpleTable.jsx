import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { esES } from '@mui/x-date-pickers/locales';


const paginationModel = { page: 0, pageSize: 10 };
    export const SimpleTable = ({products = []}) => {        

    const rows = products.map((i, index) => ({
        id: index.toString(),
        ...i
      }));
      

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        density='compact'
        columns={[{ field: 'name', headerName: 'Nombre', width: 300,  disableColumnMenu: true }]}
        initialState={{ pagination: { paginationModel } }}
        onRowSelectionModelChange={(selection) => {
            const selectedData = rows.filter((row) => selection.includes(row.id))
            setSelectedProducts('products',selectedData);
          }}
          localeText={{
            checkboxSelectionHeaderName: 'Seleccionar', // Cambia el label del checkbox
            noRowsLabel: 'No hay filas para mostrar',   // Texto cuando no hay filas
            footerRowSelected: (count) => `${count.toLocaleString()} seleccionados`, // Texto al seleccionar
            footerPaginationRowsPerPage: 'Filas por página:', // Cambia el label del selector de páginas
            footerPaginationLabelRowsPerPage: 'Páginas:', // Cambia el label del número de páginas
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
        }}
      />
    </Paper>
  );
}
