import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
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
import { useParams } from "react-router-dom";

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
        Agregar
      </Button>
    </GridToolbarContainer>
  );
}

const TableOthers = ({initialRows = [], sizeGuide, fromVariants = false}) => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] =useState({});
  const {loadAddOneSizeGuide, updateSizeGuide} =  useSizeGuide();
  const {id} = useParams();
  
  const DefaultValues = (data)=>({
    name : data?.name || "",
    type : "others",
    dimensions : data?.dimensions|| [],
})
    const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: DefaultValues(sizeGuide) ,
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
    {
      field: "height",
      headerName: "Alto(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "width",
      headerName: "Ancho(cm)",
      width: 100,
      editable: true,
    },
    {
      field: "lenght",
      headerName: "Largo(cm)",
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
    if (!!id && fromVariants === false) {
      updateSizeGuide(id, data);
    } else if (fromVariants === true) {
      loadAddOneSizeGuide(data);
    }else{
      loadAddOneSizeGuide(data);
    }
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
            placeholder="Ej. Sabanas sanhoo "
          />
        )}
      />

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

export default TableOthers;
