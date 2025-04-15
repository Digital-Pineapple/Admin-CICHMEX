import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { Grid, Grid2 } from "@mui/material";
import CustomNoRows from "./CustomNoRows";

const TableQuantity = ({ values, setValues, type }) => {
  // Estado para manejar los modos de edición de las filas
  const [rowModesModel, setRowModesModel] = React.useState({});

  // Maneja el evento cuando se detiene la edición de una fila
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true; // Previene el comportamiento predeterminado de MUI
    }
  };

  // Activa el modo de edición para una fila específica
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // Guarda los cambios realizados en una fila y la pasa al modo de vista
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // Elimina una fila específica de los valores
  const handleDeleteClick = (id) => () => {
    setValues(values.filter((row) => row.id !== id));
  };

  // Cancela la edición de una fila y revierte los cambios si es necesario
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = values.find((row) => row.id === id);
    if (editedRow.isNew) {
      setValues(values.filter((row) => row.id !== id)); // Elimina filas nuevas si se cancela la edición
    }
  };

  // Procesa la actualización de una fila y valida los datos
  const processRowUpdate = (newRow) => {
    // Valida que la cantidad no exceda el stock disponible
    if (newRow.quantity > newRow.stock && type !== 'entries') {
      alert("La cantidad no puede ser mayor que el stock disponible.");
      return { ...newRow, quantity: newRow.stock }; // Restablece la cantidad al máximo permitido
    }
    
    const updatedRow = { ...newRow, isNew: false };
    setValues(values.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  // Maneja los cambios en el modelo de modos de fila
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Define las columnas de la tabla, incluyendo acciones como editar y eliminar
  const columns = [
    {
      field: "tag",
      headerName: "Codigo",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 150,
      editable: false, // No editable
    },
    { field:'name' , headerName: "Nombre ", width: 250, editable: false },
    { field: "price", headerName: "Precio", width: 100, editable: false },
    {
      field: "quantity",
      headerName: "Cantidad",
      type: "number",
      width: 100,
      editable: true, // Editable
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          // Acciones disponibles en modo de edición
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        // Acciones disponibles en modo de vista
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Grid2>
      {/* Título de la tabla */}
      <Typography variant="h5" color="inherit">
        Productos seleccionados:
      </Typography>
      {/* Componente DataGrid para mostrar los datos */}
      <DataGrid
        rows={values} // Filas de datos
        columns={columns} // Columnas definidas
        editMode="row" // Modo de edición por fila
        rowModesModel={rowModesModel} // Modelo de modos de fila
        onRowModesModelChange={handleRowModesModelChange} // Maneja cambios en el modelo de modos
        slots={{ noRowsOverlay: CustomNoRows }} // Componente personalizado para mostrar cuando no hay filas
        onRowEditStop={handleRowEditStop} // Maneja el evento de detener edición
        processRowUpdate={processRowUpdate} // Procesa actualizaciones de filas
        pageSizeOptions={[10, 15, 20]} // Opciones de paginación
        disableRowSelectionOnClick // Deshabilita la selección de filas al hacer clic
        density="compact" // Densidad compacta
        sx={{ minHeight: "200px", width: "100%" }} // Estilos personalizados
      />
    </Grid2>
  );
};

export default TableQuantity;
