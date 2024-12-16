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
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const initialRows = [];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
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

const TableFoods = () => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] =useState({});
  const {loadAddOneSizeGuide} =  useSizeGuide()
  const [selectedPackage, setSelectedPackage] = useState(0);
    const {
    control,
    formState: { errors },
    setValue,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      typePackage:"",
      dimensions: [],
    },
  });

  useEffect(() => {
  setValue('dimensions', rows)
  }, [rows, setRows])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => {
    setRowModesModel((prevRowModes) => ({
      ...prevRowModes,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "label" },
    }));
  };

  const handleProcessEditCellProps = async (params) => {
    const value = params.props?.value;

    if (!value || value.trim() === "") {
      return { ...params.props, error: true };
    }

    return { ...params.props, error: false };
  };

  

  const handleDeleteClick = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

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

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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

  const submitForm = handleSubmit((data) => {
     loadAddOneSizeGuide(data)
  });
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "400px",
      }}
      component="form"
      onSubmit={(e)=>submitForm(e)}
    >
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
     <FormControl variant="outlined">
        <FormLabel id="type-package">Tipo de empaque</FormLabel>
        <RadioGroup
          row
          aria-labelledby="radio-button-type-package"
          defaultValue="Granel" // Puedes establecer un valor por defecto
          {...register("typePackage")} // Registra el RadioGroup
        >
          <FormControlLabel value="Granel" control={<Radio />} label="Granel" />
          <FormControlLabel value="Envasado" control={<Radio />} label="Envasado" />
        </RadioGroup>
      </FormControl>

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
          toolbar: EditToolbar,
          footer: CustomFooter,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export default TableFoods
