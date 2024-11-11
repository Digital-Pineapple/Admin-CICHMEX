import { replace, useFormik } from "formik";
import {
  Grid,
  Badge,
  IconButton,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  InputAdornment,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  ButtonGroup,
  Box,
  Chip,
} from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import useImages from "../../hooks/useImages";
import FilterIcon from "@mui/icons-material/Filter";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { AttachMoney } from "@mui/icons-material";
import VideoUploadField from "../../components/Forms/VideoUploadField";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import TextAreaInput from "../../components/inputs/TextAreaInput";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";
import WordsInput from "../../components/inputs/WordsInput";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import useVideos from "../../hooks/useVideos";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 1,
  },
}));

const CreateProduct = () => {
  const { user } = useAuthStore();
  const { createProduct, navigate, loading, newProduct } = useProducts();
  const {
    loadSubCategories,
    subCategoriesByCategory,
    loadSubCategoriesByCategory,
  } = useSubCategories();
  const { categories, loadCategories } = useCategories();
  const { images, handleImageChange2, deleteImage, imagesFiles } = useImages();
  const [verticalVideo, setVerticalVideo] = useState(null);
  const [horizontalVideo, setHorizontalVideo] = useState(null);
  

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, [user]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre del producto es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    price: Yup.number()
      .required("El precio es obligatorio")
      .min(1, "El precio debe ser mayor o igual a 0"),
    porcentDiscount: Yup.number()
      .min(0, "El descuento no puede ser negativo")
      .max(100, "El descuento no puede ser mayor al 100"),
    description: Yup.string().required("La descripción es obligatoria"),
    brand: Yup.string().required("La marca es obligatoria"),
    tag: Yup.string().required("El código es obligatorio"),
    category: Yup.string().required("La categoría es obligatoria"),
    subCategory: Yup.string().required("La subcategoría es obligatoria"),
    // dimensions: Yup.string().required("Las dimensiones son obligatorias"),
    weight: Yup.number()
      .required("El peso es obligatorio")
      .min(1, "El peso debe ser mayor a 0"),
    // seoDescription: Yup.string()
    //   .required("La descripción SEO es obligatoria")
    //   .max(160, "La descripción SEO no puede tener más de 160 caracteres"),
    // seoKeywords: Yup.string().required("Las palabras clave son obligatorias"),
  });

  const formik = useFormik({
    initialValues: {
      name: newProduct.name || "",
      price: newProduct.price || "",
      porcentDiscount: newProduct.porcentDiscount || "",
      discountPrice: newProduct.discountPrice || "",
      product_key: newProduct.product_key || "",
      description: newProduct.description || "",
      shortDescription : newProduct.shortDescription || "",
      dimensions : newProduct.dimensions || "",
      brand: newProduct.brand || "",
      tag: newProduct.tag || "",
      category: newProduct.category || "",
      subCategory: newProduct.subCategory || "",
      weight: newProduct.weight || "",
      seoDescription: newProduct.seoDescription || '',
      seoKeywords: newProduct.seoKeywords || [],
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        const valuesWithImages = {
          ...values,
          images: imagesFiles(images),
        };
        createProduct(valuesWithImages);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Previene que el Enter envíe el formulario
    }
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      event.preventDefault();
      const newChips = [...formik.values.seoKeywords, event.target.value.trim()];
      formik.setFieldValue("seoKeywords", newChips);
      event.target.value = ""; // Limpiar input
    }
  };

  const handleDelete = (chipToDelete) => () => {
    const newChips = formik.values.seoKeywords.filter((chip) => chip !== chipToDelete);
    formik.setFieldValue("seoKeywords", newChips);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseFloat(value) || "";

    let newPrice = formik.values.price;
    let newPorcentDiscount = formik.values.porcentDiscount;
    let newTotalPrice = formik.values.totalPrice;

    if (name === "price") {
      newPrice = newValue;
      if (newPorcentDiscount > 0) {
        newTotalPrice = newPrice - (newPrice * newPorcentDiscount) / 100;
      } else {
        newTotalPrice = newPrice;
      }
    } else if (name === "porcentDiscount") {
      newPorcentDiscount = newValue;
      if (newPorcentDiscount > 0) {
        newTotalPrice = newPrice - (newPrice * newPorcentDiscount) / 100;
      } else {
        newTotalPrice = newPrice;
      }
    }

    formik.setValues({
      ...formik.values,
      price: newPrice,
      porcentDiscount: newPorcentDiscount,
      discountPrice: newTotalPrice,
    });
  };

  return (
    <Grid
      component="form"
      onSubmit={formik.handleSubmit}
      display={"flex"}
      container
      gap={2}
    >
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Registar nuevo producto
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        sx={{
          gridColumn: "span 2",
          gridRow: "span 4",
        }}
      >
        <Card variant="outlined">
          <CardHeader title="Detalles" />
          <CardContent
            sx={{ display: "flex", gap: 2, flexDirection: "column" }}
          >
            <TextField
              size="small"
              fullWidth
              id="name"
              name="name"
              label="Nombre del producto "
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)} // Añade el atributo error
              helperText={formik.errors.name} // Muestra el mensaje de error
            />
            <TextField
              fullWidth
              size="small"
              id="brand"
              name="brand"
              label="Marca"
              variant="outlined"
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.brand)} // Añade el atributo error
              helperText={formik.errors.brand} // Muestra el mensaje de error
            />
            <TextField
              fullWidth
              size="small"
              id="tag"
              name="tag"
              label="Código"
              variant="outlined"
              value={formik.values.tag}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
              error={Boolean(formik.errors.tag)} // Añade el atributo error
              helperText={formik.errors.tag} // Muestra el mensaje de error
            />
            <FormControl fullWidth>
              <FormLabel>Categoría</FormLabel>
              <Select
                id="category"
                name="category"
                size="small"
                value={formik.values.category}
                label="Categoria"
                onChange={(e) => {
                  formik.setFieldValue("subCategory", "");
                  formik.handleChange(e);
                  loadSubCategoriesByCategory(e.target.value);
                }}
                error={Boolean(formik.errors.category)} // Añade el atributo error
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Selecciona una categoria</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Subcategoria</FormLabel>
              <Select
                id="subCategory"
                name="subCategory"
                size="small"
                value={formik.values.subCategory}
                label="Subcategoria"
                onChange={formik.handleChange}
                error={Boolean(formik.errors.subCategory)} // Añade el atributo error
              >
                {formik.values.category &&
                  subCategoriesByCategory.map((subCategory) => (
                    <MenuItem key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Selecciona una sub-categoria</FormHelperText>
            </FormControl>

            <TextAreaInput
              aria-label="Descripcion"
              placeholder="Descripción"
              id="description"
              name="description"
              minRows={2}
              maxRows={4}
              value={formik.values.description}
              style={{ width: "100%", marginBottom: 20 }}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <TextAreaInput
              aria-label="Descripcion corta"
              id="shortDescription"
              name="shortDescription"
              minRows={1}
              maxRows={2}
              value={formik.values.shortDescription}
              style={{ width: "100%", marginBottom: 20 }}
              onChange={formik.handleChange}
              placeholder="Descripción corta"
               error={Boolean(formik.errors.shortDescription)} 
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        lg={2}
        sx={{
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      >
        <Card variant="outlined">
          <CardHeader title="Dimensiones" />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              size="small"
              id="dimensions"
              name="dimensions"
              label="Ancho,Largo,Alto"
              variant="outlined"
              type="text"
              value={formik.values.dimensions}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.dimensions)} // Añade el atributo error
              helperText={formik.errors.dimensions} // Muestra el mensaje de error
            />
            <TextField
              fullWidth
              size="small"
              id="weight"
              name="weight"
              label="Peso"
              type="number"
              variant="outlined"
              value={formik.values.weight}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.weight)} // Añade el atributo error
              helperText={formik.errors.weight} // Muestra el mensaje de error
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">gr</InputAdornment>
                ),
              }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        sx={{
          gridColumn: "span 2",
          gridRow: "span 4",
        }}
      >
        <Card variant="outlined">
          <CardHeader title="Precio y facturación" />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              id="price"
              name="price"
              type="number"
              label="Precio neto"
              variant="outlined"
              value={formik.values.price}
              onChange={handleInputChange}
              error={Boolean(formik.errors.price)} // Añade el atributo error
              helperText={formik.errors.price} // Muestra el mensaje de error
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="porcentDiscount"
              name="porcentDiscount"
              type="number"
              label="Descuento"
              variant="outlined"
              value={formik.values.porcentDiscount}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="discountPrice"
              name="discountPrice"
              type="number"
              label="Precio con descuento"
              variant="outlined"
              value={formik.values.discountPrice}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="product_key"
              name="product_key"
              type="number"
              label="Clave SAT"
              variant="outlined"
              value={formik.values.product_key}
              onChange={formik.handleChange}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        sx={{
          gridColumn: "span 2",
          gridRow: "span 3",
        }}
      >
        <Card variant="outlined">
          <CardHeader title="Optimización para motores de búsqueda" />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextAreaInput
              aria-label="Descripcion optimizada"
              id="seoDescription"
              name="seoDescription"
              minRows={1}
              maxRows={2}
              value={formik.values.seoDescription}
              style={{ width: "100%", marginBottom: 20 }}
              onChange={formik.handleChange}
              placeholder="Descripción optimizada"
            />
            <FormControl fullWidth>
              <TextField
                id="seoKeywords"
                name="seoKeywordsInput"
                label="Palabras Clave"
                onKeyPress={handleKeyPress}
                placeholder="Añade una palabra clave y presiona Enter"
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}>
                {formik.values.seoKeywords.map((chip, index) => (
                  <Chip key={index} label={chip} onDelete={handleDelete(chip)} />
                ))}
              </Box>
              {formik.touched.seoKeywords && Boolean(formik.errors.seoKeywords) && (
                <FormHelperText error>{formik.errors.seoKeywords}</FormHelperText>
              )}
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          gridColumn: "span 6",
          gridRow: "span 3",
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <CardHeader title="Multimedia" />
            <VideoUploadField
              setVerticalVideo={setVerticalVideo}
              setHorizontalVideo={setHorizontalVideo}
              initialVerticalVideo={verticalVideo}
              initialHorizontalVideo={horizontalVideo}
            />

            <Typography marginTop={"10px"}>
              {" "}
              Imagenes de detalle (peso max de imagen:500 kb)
            </Typography>
            {images.length > 0 && (
              <Grid item xs={12}>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg, image/wpeg, image/png"
                  onChange={handleImageChange2}
                  hidden
                />
                <label htmlFor={"image"}>
                  <Button
                    fullWidth
                    component="span"
                    color="primary"
                    variant="contained"
                  >
                    Agrega Fotos
                  </Button>
                </label>
              </Grid>
            )}
            {images.length ? (
              <>
                <Grid
                  container
                  display={"flex"}
                  justifyContent={"center"}
                  padding={"10px"}
                  marginTop={"20px"}
                  sx={{ backgroundColor: "#cfd8dc" }}
                  gap={2}
                >
                  {images.map(({ id, filePreview }) => (
                    <Grid item xs={12} sm={3} key={id}>
                      <StyledBadge
                        badgeContent={
                          <IconButton
                            sx={{ backgroundColor: "black", color: "black" }}
                            onClick={() => deleteImage(id)}
                          >
                            {" "}
                            <DeleteIcon
                              sx={{ color: "white", fontSize: "20px" }}
                            />{" "}
                          </IconButton>
                        }
                      >
                        <Avatar
                          src={filePreview}
                          variant="square"
                          sx={{ width: "100%", height: "200px" }}
                        />
                      </StyledBadge>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Grid
                container
                sx={{ backgroundColor: "#cfd8dc" }}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                marginTop={"20px"}
                height={"300px"}
                borderRadius={"5px"}
              >
                <FilterIcon
                  style={{
                    fontSize: "40px",
                    alignSelf: "center",
                    marginBottom: "10px",
                  }}
                />

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg, image/wpeg, image/png"
                  onChange={handleImageChange2}
                  hidden
                />
                <label htmlFor={"image"}>
                  <Button component="span" color="primary" variant="contained">
                    Agregar Fotos
                  </Button>
                </label>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <ButtonGroup fullWidth>
          <Button type="submit" variant="contained" color="success">
            Crear
          </Button>
          <Button
            onClick={() => navigate("/mi-almacen/productos", { replace: true })}
            variant="contained"
            color="warning"
          >
            Salir
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
