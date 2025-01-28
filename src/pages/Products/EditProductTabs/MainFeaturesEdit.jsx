// /src/components/MainFeatures.jsx
import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  Button,
  Checkbox,
  Grid2,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useSubCategories } from "../../../hooks/useSubCategories";
import { useCategories } from "../../../hooks/useCategories";
import { useProducts } from "../../../hooks/useProducts";
import { Restore } from "@mui/icons-material";
import  LoadingScreenBlue  from '../../../components/ui/LoadingScreenBlue'

const MainFeaturesEdit = () => {
  const { id } = useParams();
  const { loadSubCategories, subCategoriesByCategory, loadSubCategoriesByCategory } = useSubCategories();
  const { categories, loadCategories } = useCategories();
  const { product, loadProduct, loading, dataUpdateMainFeatures } = useProducts();

  useEffect(() => {
    loadProduct(id);
  }, [id]);

  useEffect(() => {
    loadCategories();
    loadSubCategories();
    if (product?.category?._id) loadSubCategoriesByCategory(product.category._id);
  }, [product]);

  const DefaultValues = (data) => ({
    fields: [
      { id: "name", name: "Nombre del producto *", textInput: data?.name || "" },
      { id: "brand", name: "Marca*", textInput: data?.brand || ""  },
      { id: "model", name: "Modelo", textInput: data?.model, checkbox: false },
      {
        id: "gender",
        name: "Genero",
        textInput: data?.gender || "",
        checkbox: false,
        values: ["Mujer", "Hombre", "Niñas", "Niños", "Bebes", "Sin Genero"],
      },
    ],
    category: data?.category?._id || "",
    subCategory: data?.subCategory?._id || "",
    name: data?.name || "",
    product_key: data?.product_key || "",
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: DefaultValues(product) });
  

  const fieldValues = watch("fields");
  const selectedCategory = watch("category");

  const onSubmit = async (data) => {
    dataUpdateMainFeatures(id, data)
  };

  const handleCheckboxChange = (checked, index) => {
    if (checked) {
      setValue(`fields.${index}.textInput`, "");
    }
  };

  useEffect(() => {
    if (product) {
      reset(DefaultValues(product)); // Resetea el formulario con los nuevos valores
    }
  }, [product, reset]);

  if (loading) {
    return(
      <LoadingScreenBlue/>
    )
  }
  return (
    <Card sx={{padding:1}} variant="elevation" component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader
        title="Características principales"
        subheader="Completa estos datos con las especificaciones de la tienda"
        action={
          <Button variant="contained" color="primary" onClick={()=>loadProduct(id)} startIcon={<Restore/>}>
            Recargar
          </Button>
        }
      />
      <Grid2 container gap={2} padding={2}>
        {fieldValues?.map(
          (field, index) =>
            field && (
              <Grid2 size={{xs:12,sm:5}} key={index}>
                {field.values ? (
                  <Controller
                    name={`fields.${index}.textInput`}
                    control={control}
                    rules={{
                      required: !field.checkbox && `${field.name} es requerido`,
                    }}
                    render={({ field: valuesField }) => (
                      <FormControl fullWidth>
                        <InputLabel id={`label-${index}`}>{field.name}</InputLabel>
                        <Select
                          {...valuesField}
                          label={field.name}
                          size="small"
                          
                          disabled={field.checkbox}
                          error={!!errors.fields?.[index]?.textInput}
                        >
                          {field.values.map((valueOption, idx) => (
                            <MenuItem key={idx} value={valueOption}>
                              {valueOption}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {errors.fields?.[index]?.textInput?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                ) : (
                  <Controller
                    name={`fields.${index}.textInput`}
                    control={control}
                    rules={{
                      required: !field.checkbox && `${field.name} es requerido`,
                    }}
                    render={({ field: textField }) => (
                      <TextField
                        {...textField}
                        fullWidth
                        size="small"
                        label={field.name}
                        disabled={field.checkbox}
                        error={!!errors.fields?.[index]?.textInput}
                        helperText={errors.fields?.[index]?.textInput?.message}
                      />
                    )}
                  />
                )}
                {field.checkbox !== undefined && (
                  <Controller
                    name={`fields.${index}.checkbox`}
                    control={control}
                    render={({ field: checkboxField }) => (
                      <FormControlLabel
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
                        label="No aplica"
                      />
                    )}
                  />
                )}
              </Grid2>
            )
        )}
      </Grid2>
      <Grid2 container spacing={2} gap={1} padding={2}>
        <FormControl fullWidth error={!!errors.category}>
          <FormLabel>Categoría</FormLabel>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Seleccionar una categoría es obligatorio" }}
            render={({ field }) => (
              <Select
                {...field}
                size="small"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setValue("subCategory", "");
                  loadSubCategoriesByCategory(e.target.value);
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
            {errors.category?.message || "Selecciona una categoría"}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.subCategory} disabled={!selectedCategory}>
          <FormLabel>Subcategoría</FormLabel>
          <Controller
            name="subCategory"
            control={control}
            rules={{ required: "Seleccionar una subcategoría es obligatorio" }}
            render={({ field }) => (
              <Select {...field} size="small" disabled={!selectedCategory}>
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
            {errors.subCategory?.message || "Selecciona una subcategoría"}
          </FormHelperText>
        </FormControl>
         <Controller
                control={control}
                rules={{
                  required: {value:true, message:'Campo requerido *'},
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label='Clave SAT'
                    type="number"
                    size="small"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={errors.product_key ? true : false}
                    helperText={errors.product_key?.message ? errors.product_key.message : '' }
                   
                   
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
      <CardActions>
        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </CardActions>
    </Card>
  );
};

export default MainFeaturesEdit;
