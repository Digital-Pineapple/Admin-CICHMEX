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
  Grid2,
} from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import useImages from "../../hooks/useImages";
import FilterIcon from "@mui/icons-material/Filter";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import {
  ArrowDownward,
  ArrowUpward,
  AttachMoney,
  NavigateBefore,
  NavigateNext,
  VideoCallSharp,
} from "@mui/icons-material";
import VideoUploadField from "../../components/Forms/VideoUploadField";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import TextAreaInput from "../../components/inputs/TextAreaInput";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";
import WordsInput from "../../components/inputs/WordsInput";
import * as Yup from "yup";
import useVideos from "../../hooks/useVideos";
import { Link } from "react-router-dom";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 1,
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateOneProduct = () => {
  const { user } = useAuthStore();
  const { createProduct, navigate, loading } = useProducts();
  const {
    loadSubCategories,
    subCategoriesByCategory,
    loadSubCategoriesByCategory,
  } = useSubCategories();
  const { categories, loadCategories } = useCategories();
  const {
    images,
    handleImageChange,
    deleteImage,
    imagesFiles,
    moveImage,
    selectMainImage,
    mainImageId,
  } = useImages();

  const { videoFiles } = useVideos();

  const valuateVideo = (videos) => {
    if (videos?.length > 0) {
      const videoVertical = videos.find((i) => i.type === "vertical");
      const videoHorizontal = videos.find((i) => i.type === "horizontal");
      return { videoVertical, videoHorizontal };
    }

    // Retornar valores nulos si no hay videos
    return { videoVertical: null, videoHorizontal: null };
  };

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, [user]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre del producto es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    porcentDiscount: Yup.number()
      .min(0, "El descuento no puede ser negativo")
      .max(100, "El descuento no puede ser mayor al 100"),
    description: Yup.string().required("La descripción es obligatoria"),
    brand: Yup.string().required("La marca es obligatoria"),
    tag: Yup.string().required("El código es obligatorio"),
    category: Yup.string().required("La categoría es obligatoria"),
    subCategory: Yup.string().required("La subcategoría es obligatoria"),
    product_key: Yup.string().required("La clave sat es obligatoria"),
    price: Yup.number()
      .required("El precio es obligatorio")
      .min(1, "El precio debe ser mayor o igual a 1"), // Se corrige el valor mínimo
    purchase_price: Yup.number()
      .required("El precio de compra es obligatorio")
      .test(
        "is-less-than-price", // Nombre del test
        "El precio de compra debe ser menor o igual que el precio neto", // Mensaje de error
        function (value) {
          const { price } = this.parent; // Accede al campo `price`
          return value <= price; // Valida que sea menor
        }
      ),
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
      name: "",
      price: "",
      porcentDiscount: "",
      discountPrice: "",
      product_key: "",
      description: "",
      shortDescription: "",
      brand: "",
      dimensions: "",
      tag: "",
      subCategory: "",
      category: "",
      weight: "",
      thumbnail: "",
      seoDescription: "",
      seoKeywords: [],
      images: "",
      purchase_price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        const values2 = {
          ...values,
          videos: videoFiles(),
          thumbnail: formik.values?.profile_image,
          // images: imagesFiles(),
        };
        createProduct(values2, imagesFiles());
      } catch (error) {
        return enqueueSnackbar(error, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
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
      const newChips = [
        ...formik.values.seoKeywords,
        event.target.value.trim(),
      ];
      formik.setFieldValue("seoKeywords", newChips);
      event.target.value = ""; // Limpiar input
    }
  };

  const handleDelete = (chipToDelete) => () => {
    const newChips = formik.values.seoKeywords.filter(
      (chip) => chip !== chipToDelete
    );
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

  const paths = [
    { path: `/mi-almacen/productos`, name: "Todos mis productos" },
    { path: `/mi-almacen/producto/agregar`, name: "Crear producto único" },
  ];
  return (
    <Grid2
      component="form"
      onSubmit={formik.handleSubmit}
      display={"flex"}
      container
      paddingX={{ xs: 0, lg: 10 }}
      gap={1}
    >
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: "16px", lg: "25px" } }}>
          <strong>Crear producto único</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
        <Grid2 />
      </Grid2>
      <Grid2
        display={"grid"}
        gridTemplateColumns={"repeat(3,1fr)"}
        gridTemplateRows={"repeat(2, 1fr)"}
        sx={{gridColumnGap:"10px", gridTemplateRows: { xs: "auto auto auto auto", lg: "repeat(6, auto)" },}}
      >
        <Grid2 gridArea={"1 / 1 / 3 / 2"}>
          <Card variant="outlined" sx={{borderRadius:'20px'}}>
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
                  formik.touched.description &&
                  Boolean(formik.errors.description)
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
                // error={Boolean(formik.errors.shortDescription)} // Añade el atributo error
              />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 gridArea={"1 / 3 / 3 / 4"}>
          <Card variant="outlined" sx={{borderRadius:'20px'}}>
            <CardHeader title="Precio y facturación" />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                fullWidth
                id="purchase_price"
                name="purchase_price"
                type="number"
                label="Precio de compra"
                variant="outlined"
                value={formik.values.purchase_price}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.purchase_price)} // Añade el atributo error
                helperText={formik.errors.purchase_price} // Muestra el mensaje de error
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
                error={Boolean(formik.errors.porcentDiscount)} // Añade el atributo error
                helperText={formik.errors.porcentDiscount}
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
                error={Boolean(formik.errors.discountPrice)} // Añade el atributo error
                helperText={formik.errors.discountPrice}
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
                error={Boolean(formik.errors.product_key)} // Añade el atributo error
                helperText={formik.errors.product_key}
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
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 gridArea={"1 / 2 / 2 / 3"}>
          <Card variant="outlined" sx={{borderRadius:'20px'}}>
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
        </Grid2>
        <Grid2 gridArea={"2 / 2 / 3 / 3"}>
          <Card variant="outlined" sx={{borderRadius:'20px'}}>
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
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}
                >
                  {formik.values.seoKeywords.map((chip, index) => (
                    <Chip
                      key={index}
                      label={chip}
                      onDelete={handleDelete(chip)}
                    />
                  ))}
                </Box>
                {formik.touched.seoKeywords &&
                  Boolean(formik.errors.seoKeywords) && (
                    <FormHelperText error>
                      {formik.errors.seoKeywords}
                    </FormHelperText>
                  )}
              </FormControl>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Grid2
        size={12}

      >
        <Card variant="outlined" sx={{borderRadius:'20px'}}>
          <CardContent>
            <CardHeader title="Multimedia" />

            <Typography marginTop={"10px"}>
              Imagenes de detalle (peso max de imagen: 500 kb)
            </Typography>
            <Grid2 size={12}>
              <input
                id="image"
                name="image"
                type="file"
                multiple
                accept="image/jpeg, image/png, image/webp"
                onChange={handleImageChange}
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
            </Grid2>

            {images.length > 0 && (
              <Grid2
                container
                display={"flex"}
                justifyContent={"center"}
                padding={"10px"}
                marginTop={"20px"}
                sx={{ backgroundColor: "#cfd8dc" }}
                gap={2}
              >
                {images.map(({ id, filePreview }, index) => (
                  <Grid2 size={{ xs: 12, sm: 3 }} key={id}>
                    <StyledBadge
                      badgeContent={
                        <IconButton
                          sx={{ backgroundColor: "black", color: "black" }}
                          onClick={() => deleteImage(id)}
                        >
                          <DeleteIcon
                            sx={{ color: "white", fontSize: "20px" }}
                          />
                        </IconButton>
                      }
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "200px",
                          border:
                            mainImageId === id
                              ? "3px solid #1976d2" // Destacar la imagen principal.
                              : "none",
                        }}
                      >
                        <Avatar
                          src={filePreview}
                          variant="square"
                          sx={{ width: "100%", height: "100%" }}
                        />
                      </Box>
                    </StyledBadge>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <IconButton
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0}
                      >
                        <NavigateBefore />
                      </IconButton>
                      <IconButton
                        onClick={() => moveImage(index, 1)}
                        disabled={index === images.length - 1}
                      >
                        <NavigateNext />
                      </IconButton>
                    </Box>
                    <Box mt={1} display="flex" justifyContent="center">
                      <Chip
                        label={
                          mainImageId === id
                            ? "Imagen Principal"
                            : "Hacer imagen principal"
                        }
                        color={mainImageId === id ? "primary" : "default"}
                        onClick={() => selectMainImage(id)}
                        clickable
                      />
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            )}
          </CardContent>
        </Card>
      </Grid2>

      <Grid2 size={12} display={"flex"} gap={2}>
        <Button
          fullWidth
          onClick={() => navigate("/mi-almacen/productos", { replace: true })}
          variant="outlined"
          color="warning"
        >
          Salir
        </Button>
        <Button fullWidth type="submit" variant="contained" color="success">
          Crear
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default CreateOneProduct;
