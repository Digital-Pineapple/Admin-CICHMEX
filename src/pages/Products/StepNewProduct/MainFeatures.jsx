// /src/components/MainFeatures.jsx
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  Checkbox,
  Grid2,
  TextField,
  FormControlLabel,
  CardHeader,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { useSubCategories } from "../../../hooks/useSubCategories";
import { useCategories } from "../../../hooks/useCategories";
import { useProducts } from "../../../hooks/useProducts";
import { name } from "dayjs/locale/es";
import { Link } from "react-router-dom";

const MainFeatures = ({ handleNext, handleBack, index, isLastStep }) => {
  const {
    loadSubCategories,
    subCategoriesByCategory,
    loadSubCategoriesByCategory,
  } = useSubCategories();

  const { categories, loadCategories } = useCategories();
  const { dataProduct, dataStep1 } = useProducts();

  // Carga las categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, []);

  // Función para definir los valores por defecto del formulario
  const DefaultValues = (data) => {
    return {
      fields: [
        {
          id: "name",
          name: "Nombre del producto *",
          textInput: data?.name || "",
        },
        { id: "brand", name: "Marca*", textInput: data?.brand || "" },
        {
          id: "model",
          name: "Modelo",
          textInput: data?.model || "",
          checkbox: false,
        },
        {
          id: "gender",
          name: "Genero",
          textInput: data?.gender || "",
          checkbox: false,
          values: ["Mujer", "Hombre", "Niñas", "Niños", "Bebes", "Sin Genero"],
        },
      ],
      category: data?.category || "",
      subCategory: data?.subCategory || "",
      name: data?.name || "",
      product_key: data?.product_key || "",
    };
  };

  // Configuración del formulario con react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: DefaultValues(dataProduct) });

  const fieldValues = watch("fields"); // Observa los valores de los campos dinámicos
  const selectedCategory = watch("category"); // Observa la categoría seleccionada

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    dataStep1(data, handleNext);
  };

  // Maneja el cambio del checkbox para deshabilitar el campo correspondiente
  const handleCheckboxChange = (checked, index) => {
    if (checked) {
      setValue(`fields.${index}.textInput`, ""); // Borra el valor del input en el índice correspondiente
    }
  };

  return (
    <Card
      variant="elevation"
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ paddingX: 2 }}
    >
      {/* Encabezado del formulario */}
      <CardHeader
        title="Características principales"
        subheader="Completa estos datos con las especificaciones del la tienda"
      />

      {/* Campos dinámicos */}
      <Grid2 container gap={2} padding={2}>
        {fieldValues?.map(
          (field, index) =>
            field && (
              <Grid2 size={{ xs: 12, sm: 5 }} key={index}>
                {/* Si el campo tiene "values", renderiza el Select, si no tiene, renderiza el TextField */}
                {field.hasOwnProperty("values") ? (
                  <Controller
                    name={`fields.${index}.textInput`}
                    control={control}
                    rules={{
                      required: {
                        value: !fieldValues[index]?.checkbox, // Requerido si el checkbox NO está marcado
                        message: `${field.name} es requerido`,
                      },
                    }}
                    render={({ field: valuesField }) => (
                      <FormControl fullWidth>
                        <InputLabel id="SelectedLabel">Género</InputLabel>
                        <Select
                          {...valuesField}
                          fullWidth
                          labelId="SelectedLabel"
                          label="Género"
                          size="small"
                          disabled={fieldValues[index]?.checkbox} // Deshabilita el Select si el checkbox está activo
                          onChange={(e) => {
                            valuesField.onChange(e.target.value);
                          }}
                          error={!!errors.fields?.[index]?.textInput}
                        >
                          {field.values.map((valueOption, idx) => (
                            <MenuItem key={idx} value={valueOption}>
                              {valueOption}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                ) : (
                  <Controller
                    name={`fields.${index}.textInput`}
                    control={control}
                    rules={{
                      required: {
                        value: !fieldValues[index]?.checkbox, // Requerido si el checkbox NO está marcado
                        message: `${field.name} es requerido`,
                      },
                    }}
                    render={({ field: textField }) => (
                      <TextField
                        {...textField}
                        fullWidth
                        size="small"
                        disabled={fieldValues[index]?.checkbox} // Deshabilita el TextField si el checkbox está activo
                        label={field.name}
                        error={!!errors.fields?.[index]?.textInput}
                        helperText={errors.fields?.[index]?.textInput?.message}
                        autoComplete="off"
                      />
                    )}
                  />
                )}

                {/* Control del Checkbox (si existe) */}
                {field.hasOwnProperty("checkbox") && (
                  <Controller
                    name={`fields.${index}.checkbox`}
                    control={control}
                    render={({ field: checkboxField }) => (
                      <FormControlLabel
                        componentsProps={{
                          typography: { variant: "body2" },
                        }}
                        control={
                          <Checkbox
                            {...checkboxField}
                            checked={checkboxField.value}
                            size="small"
                            onChange={(e) => {
                              checkboxField.onChange(e.target.checked);
                              handleCheckboxChange(e.target.checked, index);
                            }}
                          />
                        }
                        label={`No aplica *`}
                      />
                    )}
                  />
                )}
              </Grid2>
            )
        ) || []}
      </Grid2>

      <Grid2 container spacing={2} padding={2}>
        {/* Select de categoría */}
        <FormControl fullWidth error={!!errors.category}>
          <FormLabel>Categoría</FormLabel>

          {/* Controller de react-hook-form para el Select */}
          <Controller
            name="category" // Nombre del campo que va a controlar el select
            control={control}
            rules={{
              required: "Seleccionar una categoría es obligatorio", // Regla de validación
            }}
            render={({ field }) => (
              <Select
                {...field}
                size="small"
                onChange={(e) => {
                  field.onChange(e.target.value); // Actualiza el valor en react-hook-form
                  setValue("subCategory", ""); // Reinicia el valor de subcategoría
                  loadSubCategoriesByCategory(e.target.value); // Carga las subcategorías según la categoría seleccionada
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <FormHelperText>
            {errors.category
              ? errors.category.message
              : "Selecciona una categoría"}{" "}
          </FormHelperText>
        </FormControl>

        {/* Select de subcategoría */}
        <FormControl
          fullWidth
          error={!!errors.subCategory}
          disabled={!selectedCategory}
        >
          <FormLabel>Subcategoría</FormLabel>

          {/* Controller de react-hook-form para el Select de subcategoría */}
          <Controller
            name="subCategory" // Nombre del campo controlado
            control={control}
            rules={{
              required: "Seleccionar una subcategoría es obligatorio", // Regla de validación
            }}
            render={({ field }) => (
              <Select
                {...field}
                size="small"
                onChange={(e) => {
                  field.onChange(e.target.value); // Actualiza el valor en react-hook-form
                }}
                disabled={!selectedCategory} // Deshabilita el select si no hay categoría seleccionada
              >
                {selectedCategory &&
                  subCategoriesByCategory.map((subCategory) => (
                    <MenuItem key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />

          <FormHelperText>
            {errors.subCategory
              ? errors.subCategory.message
              : "Selecciona una subcategoría"}
          </FormHelperText>
        </FormControl>

        {/* Campo para la clave SAT */}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Campo requerido *" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="Clave SAT"
              type="number"
              size="small"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={errors.product_key ? true : false}
              helperText={
                errors.product_key?.message ? errors.product_key.message : ""
              }
            />
          )}
          name="product_key"
        />
        <Link
          to={
            "https://www.sat.gob.mx/consultas/53693/catalogo-de-productos-y-servicios"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Buscar código
        </Link>
      </Grid2>

      {/* Botones de acción */}
      <CardActions>
        <Button
          disabled={index === 0}
          onClick={handleBack}
          sx={{ mt: 1, mr: 1 }}
        >
          Cancelar
        </Button>
        <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
          {isLastStep ? "Guardar" : "Continuar"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MainFeatures;
