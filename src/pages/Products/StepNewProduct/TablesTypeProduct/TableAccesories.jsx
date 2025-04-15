import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { red } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSizeGuide } from "../../../../hooks/useSizeGuide";

const initialRows = [];

// Componente para la barra de herramientas personalizada
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  // Maneja el clic para agregar una nueva fila
  const handleClick = () => {
    const id = randomId(); // Genera un ID único
    setRows((oldRows) => [
      ...oldRows,
      { id, label: "", equivalence: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "label" },
    }));
  };

  return (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Agregar talla
      </Button>
    </GridToolbarContainer>
  );
}

const TableClothes = ({}) => {
  const [rows, setRows] = useState(initialRows); // Estado para las filas de la tabla
  const [rowModesModel, setRowModesModel] = useState({}); // Estado para los modos de edición de las filas
  const { loadAddOneSizeGuide } = useSizeGuide(); // Hook personalizado para manejar la lógica de la guía de tallas

  // Configuración del formulario con react-hook-form
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      dimensions: [],
    },
  });

  // Actualiza el valor del campo "dimensions" en el formulario cuando cambian las filas
  useEffect(() => {
    setValue("dimensions", rows);
  }, [rows, setRows]);

  // Maneja el evento cuando se detiene la edición de una fila
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true; // Evita que se detenga la edición automáticamente
    }
  };

  // Activa el modo de edición para una fila específica
  const handleEditClick = (id) => {
    setRowModesModel((prevRowModes) => ({
      ...prevRowModes,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "label" },
    }));
  };

  // Valida las celdas editadas
  const handleProcessEditCellProps = async (params) => {
    const value = params.props?.value;

    if (!value || value.trim() === "") {
      return { ...params.props, error: true }; // Marca como error si el valor está vacío
    }

    return { ...params.props, error: false };
  };

  // Maneja la eliminación de una fila
  const handleDeleteClick = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Cancela la edición de una fila
  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // Actualiza una fila después de la edición
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  // Maneja los cambios en los modos de edición de las filas
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Componente personalizado para el pie de la tabla
  const CustomFooter = () => (
    <Button
      sx={{ margin: 4 }}
      onClick={submitForm}
      variant="contained"
      color="success"
    >
      Guardar
    </Button>
  );

  // Configuración de las columnas de la tabla
  const columns = [
    {
      field: "label",
      headerName: "Talla (Etiqueta)",
      width: 180,
      editable: true,
      preProcessEditCellProps: handleProcessEditCellProps,
    },
    {
      field: "equivalence",
      headerName: "Equivalencia",
      width: 100,
      editable: true,
      preProcessEditCellProps: handleProcessEditCellProps,
    },
    // Columnas adicionales para las medidas
    {
      field: "waist",
      headerName: "Busto(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "height",
      headerName: "Alto(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "hips",
      headerName: "Caderas(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "inseam",
      headerName: "Entrepierna(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "shoulder",
      headerName: "Ancho de hombros(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "sleeveLength",
      headerName: "Largo de mangas(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "neckCircumference",
      headerName: "Cuello(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "thigh",
      headerName: "Muslo(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "calf",
      headerName: "Pantorrilla(cm)",
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
              icon={<CancelIcon />}
              label="Cancelar"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // Maneja el envío del formulario
  const submitForm = handleSubmit((data) => {
    loadAddOneSizeGuide(data); // Llama a la función para guardar la guía de tallas
  });

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "400px",
      }}
      component="form"
      onSubmit={(e) => submitForm(e)}
    >
      {/* Campo de texto para el nombre de la guía */}
      <Controller
        control={control}
        name="name"
        rules={{
          required: { message: "Campo requerido", value: true },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            id="name"
            fullWidth
            label="Nombre de la guía"
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
            autoComplete="off"
            placeholder="Ej. Blusas sanhoo mujer"
          />
        )}
      />

      {/* Tabla de datos */}
      <DataGrid
        sx={{
          "& .actions": { color: "text.secondary" },
          "& .Mui-error": {
            bgcolor: red[100], // Color de fondo cuando hay error
            color: red[700], // Color de texto cuando hay error
            border: "solid 2px red",
            width: "100%",
            height: "100%",
          },
        }}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar, // Barra de herramientas personalizada
          footer: CustomFooter, // Pie de tabla personalizado
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export default TableClothes;
