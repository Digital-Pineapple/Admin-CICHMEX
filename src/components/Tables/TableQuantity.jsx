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
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setValues(values.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = values.find((row) => row.id === id);
    if (editedRow.isNew) {
      setValues(values.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    // Validate the quantity against the stock
    if (newRow.quantity > newRow.stock && type !== 'entries') {
      alert("La cantidad no puede ser mayor que el stock disponible.");
      return { ...newRow, quantity: newRow.stock }; // Reset quantity to max stock
    }
    
    const updatedRow = { ...newRow, isNew: false };
    setValues(values.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Dynamically add the stock column only if the stock value is present
  const columns = [
    {
      field: "tag",
      headerName: "Codigo",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 150,
      editable: false,
    },
    { field:'name' , headerName: "Nombre ", width: 250, editable: false },
    { field: "price", headerName: "Precio", width: 100, editable: false },
    // ...(values.some(row => row.stock !== undefined)
    //   ? [{
    //       field: 'stock',
    //       headerName: "Stock",
    //       type: "number",
    //       width: 100,
    //       editable: false,
    //     }]
    //   : []),
    {
      field: "quantity",
      headerName: "Cantidad",
      type: "number",
      width: 100,
      editable: true,
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
      <Typography variant="h5" color="inherit">
        Productos seleccionados:
      </Typography>
      <DataGrid
        rows={values}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
       slots={{noRowsOverlay: CustomNoRows}}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[10, 15, 20]}
        disableRowSelectionOnClick
        density="compact"
        sx={{ minHeight: "200px", width: "100%" }}
      />
    </Grid2>
  );
};

export default TableQuantity;
