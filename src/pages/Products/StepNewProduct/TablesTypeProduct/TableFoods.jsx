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
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useParams } from "react-router-dom";

// Componente para la barra de herramientas de edición
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  // Maneja el evento de agregar una nueva fila
  const handleClick = () => {
    const id = randomId(); // Genera un ID único
    setRows((oldRows) => [
      ...oldRows,
      { id, label: "", equivalence: "", isNew: true }, // Agrega una nueva fila vacía
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "label" }, // Activa el modo de edición para la nueva fila
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
        Agregar
      </Button>
    </GridToolbarContainer>
  );
}

// Componente principal de la tabla
const TableFoods = ({ initialRows = [], sizeGuide, fromVariants = false }) => {
  const [rows, setRows] = useState(initialRows); // Estado para las filas de la tabla
  const [rowModesModel, setRowModesModel] = useState({}); // Estado para los modos de edición de las filas
  const { loadAddOneSizeGuide, updateSizeGuide } = useSizeGuide(); // Hooks personalizados para manejar la lógica de negocio
  const { id } = useParams(); // Obtiene parámetros de la URL

  // Valores predeterminados para el formulario
  const DefaultValues = (data) => ({
    name: data?.name || "",
    type: "foods",
    typePackage: data?.typePackage || "",
    dimensions: data?.dimensions || [],
  });

  // Configuración del formulario con react-hook-form
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: DefaultValues(sizeGuide),
  });

  // Actualiza el valor de "dimensions" en el formulario cuando cambian las filas
  useEffect(() => {
    setValue("dimensions", rows);
  }, [rows, setRows]);

  // Maneja el evento de detener la edición de una fila
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

  // Valida los valores de las celdas editadas
  const handleProcessEditCellProps = async (params) => {
    const value = params.props?.value;

    if (!value || value.trim() === "") {
      return { ...params.props, error: true }; // Marca la celda como inválida si está vacía
    }

    return { ...params.props, error: false }; // Marca la celda como válida
  };

  // Maneja el evento de eliminar una fila
  const handleDeleteClick = (id) => {
    setRows(rows.filter((row) => row.id !== id)); // Elimina la fila del estado
  };

  // Maneja el evento de cancelar la edición de una fila
  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id)); // Elimina la fila si es nueva
    }
  };

  // Actualiza una fila después de la edición
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row))); // Actualiza la fila en el estado
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

  // Definición de las columnas de la tabla
  const columns1 = [
    {
      field: "label",
      headerName: "Etiqueta",
      width: 180,
      editable: true,
      preProcessEditCellProps: handleProcessEditCellProps,
    },
    {
      field: "weight",
      headerName: "Peso",
      width: 100,
      editable: true,
    },
    {
      field: "units",
      headerName: "Unidades",
      width: 100,
      editable: true,
    },
    {
      field: "flavor",
      headerName: "Sabor",
      width: 100,
      editable: true,
    },
    {
      field: "typeContainer",
      headerName: "Contenedor",
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
    if (!!id && fromVariants === false) {
      updateSizeGuide(id, data); // Actualiza la guía de tallas si existe un ID
    } else if (fromVariants === true) {
      loadAddOneSizeGuide(data); // Carga una nueva guía de tallas si es desde variantes
    } else {
      loadAddOneSizeGuide(data); // Carga una nueva guía de tallas
    }
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
            placeholder="Ej. Pan Bimbo"
          />
        )}
      />

      {/* Radio buttons para seleccionar el tipo de empaque */}
      <Controller
        control={control}
        rules={{ required: { value: true, message: "Campo requerido" } }}
        name="typePackage"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <FormControl error={!!errors.typePackage} variant="outlined">
            <FormLabel id="type-package">Tipo de empaque</FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-button-type-package"
              ref={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              <FormControlLabel
                value="Granel"
                control={<Radio />}
                label="Granel"
              />
              <FormControlLabel
                value="Envasado"
                control={<Radio />}
                label="Envasado"
              />
            </RadioGroup>
            <FormHelperText error={!!errors.typePackage}>
              {errors?.typePackage?.message}
            </FormHelperText>
          </FormControl>
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
        columns={columns1}
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

export default TableFoods;
