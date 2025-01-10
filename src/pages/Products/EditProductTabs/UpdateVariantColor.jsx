import { Grid2, TextField, Button, Typography, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../../../hooks";
import ColorSelector from "../../../components/inputs/ColorSelector";

const UpdateVariantColor = ({ values =[],color,  handleClose }) => {
  const dataVariant = values.find(i=>i.color === color)
  const DefaultValues = (data) => ({
    color: data?.color || "",
    design: { textInput: data?.design, checkbox: false } || {
      textInput: "",
      checkbox: true,
    },
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: DefaultValues(dataVariant),
  });

  const handleCheckboxChange = (checked) => {
    setValue(`design.checkbox`, checked);

    if (checked) {
      setValue(`design.textInput`, ""); // Limpia el campo relacionado
    }
  };

  const onSubmit = (e) => {
    console.log(e, "valores");
  };
  return (
    <Grid2
      component={"form"}
      display={"flex"}
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
      container
    >
      <Grid2 size={12} minHeight={"100px"} className="Titles">
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px" }}
        >
          Editar color o diseño
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Controller
          control={control}
          name={`color`}
          rules={{
            required: {
              value: !watch(`color`),
              message: "Campo requerido",
            },
          }}
          render={({ field }) => (
            <ColorSelector
              {...field}
              fullWidth
              value={watch(`color`)}
              label="Color"
              error={!!errors.color}
              helperText={errors.color?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          control={control}
          name={`design.textInput`}
          rules={{
            required: {
              value: !watch(`design.checkbox`),
              message: "Campo requerido",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              disabled={watch(`design.checkbox`)}
              label="Diseño"
              error={!!errors.design?.textInput}
              helperText={errors.design?.textInput?.message}
            />
          )}
        />

        <Controller
          name={`design.checkbox`}
          control={control}
          render={({ field: { onChange, name } }) => (
            <FormControlLabel
              componentsProps={{
                typography: { variant: "body2" },
              }}
              control={
                <Checkbox
                  sx={{ marginLeft: "10px" }}
                  checked={watch(`design.checkbox`)}
                  size="small"
                  onChange={(e) => {
                    onChange(e.target.checked);
                    handleCheckboxChange(e.target.checked);
                  }}
                />
              }
              label="No aplica *"
            />
          )}
        />
      </Grid2>
      <Grid2 display={"flex"} gap={2} size={12}>
        <Button
          fullWidth
          onClick={() => handleClose()}
          variant="contained"
          color="warning"
        >
          Cancelar
        </Button>
        <Button fullWidth type="submit" variant="contained" color="success">
          Guardar Cambios
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default UpdateVariantColor;
