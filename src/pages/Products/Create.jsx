import { replace, useFormik } from "formik";
import {
  Grid,
  Badge,
  IconButton,
  Avatar,
  TextareaAutosize,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  InputAdornment,
  TextField,
  
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 1,
  },
}));

const CreateProduct = () => {
  const { createProduct, navigate } = useProducts();
  const { loadSubCategories, loadSubcategoriesByCategory, subCatByCategory } = useSubCategories()
  const { categories, loadCategories } = useCategories();
  const { images, handleImageChange, deleteImage, imagesFiles } =
    useImages();
  const [video, setVideo] = useState(null)

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      size: "",
      tag: "",
      subCategory:"",
      category:"",
      weight:"" 
    },
    onSubmit: (values) => {
      try {
        const values2 ={
          ...values,
          video:video
        }
        createProduct(values2, imagesFiles());
  
      } catch (error) {
        return enqueueSnackbar(`Error: ${error.data.response?.message}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  useEffect(() => {
    loadSubCategories()
    loadCategories()
  }, [])
  

  return (
    <Grid component="form" gap={2} container onSubmit={formik.handleSubmit} >
      <Grid item marginTop={{xs:'-30px'}} xs={12} minHeight={'100px'} className="Titles">   
      <Typography textAlign={'center'} variant="h1" fontSize={{xs:'20px', sm:'30px', lg:'40px'}} >
        Registar nuevo producto
      </Typography>
      </Grid>
     <Grid item xs={12} sm={6.5} md={4}>
        <TextField
          focused
          fullWidth
          id="name"
          name="name"
          label="Nombre del producto "
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
     </Grid>
     <Grid item xs={12} sm={5} md={3} lg={3.6}>
        <TextField
          focused
          fullWidth
          id="price"
          name="price"
          type="number"
          label="Precio del producto"
          variant="outlined"
          value={formik.values.price}
          onChange={formik.handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
          }}
        />
     </Grid>
     <Grid item xs={12} sm={4} md={4}>
        <TextField
          focused
          fullWidth
          id="size"
          name="size"
          label="Tamaño del producto"
          variant="outlined"
          value={formik.values.size}
          onChange={formik.handleChange}
        />
     </Grid>
     <Grid item xs={12} sm={3.5} md={6}>
        <TextField
          focused
          fullWidth
          id="weight"
          name="weight"
          label="Peso del producto"
          type="number"
          variant="outlined"
          value={formik.values.weight}
          onChange={formik.handleChange}
        />
     </Grid>
     <Grid item xs={12} sm={3.5} md={5.2} lg={5.7} > 
        <TextField
          focused
          fullWidth
          id="tag"
          name="tag"
          label="Código"
          variant="outlined"
          type="number"
          value={formik.values.tag}
          onChange={formik.handleChange}
        />
     </Grid>
   
     <Grid item xs={12} sm={6}lg={3} >
         <FormControl fullWidth >
            <FormLabel>Categoría</FormLabel>
            <Select
              id="category"
              name="category"
              value={formik.values.category}
              label="Categoria"
              onChange={(e)=>{
                formik.setFieldValue('subCategory','');
                formik.handleChange(e)
                loadSubcategoriesByCategory(e.target.value);
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Selecciona una categoria</FormHelperText>
          </FormControl>
     </Grid>
     <Grid item xs={12} sm={5} lg={3} >
         <FormControl fullWidth>
            <FormLabel>Subcategoria</FormLabel>
            <Select
              id="subCategory"
              name="subCategory"
              value={formik.values.subCategory}
              label="Subcategoria"
              onChange={formik.handleChange}
            >
              { formik.values.category && subCatByCategory.map((subCategory) => (
                <MenuItem key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Selecciona una sub-categoria</FormHelperText>
          </FormControl>
     </Grid>
     <Grid item xs={12} lg={5.6}>
        <Typography>Descipcion del Producto</Typography>
        <TextareaAutosize
          aria-label="Descripcion"
          id="description"
          name="description"
          minRows={3}
          label="Descripcion"
          value={formik.values.description}
          style={{ width: "100%", fontFamily: "BikoBold", marginBottom: 20 }}
          onChange={formik.handleChange}
        />
     </Grid>


        
         <Grid item xs={12}  > 
       <VideoUploadField setVideo={setVideo} label={'Subir video'}/>
     </Grid>

        <Typography marginTop={"10px"}> peso max de imagen(500 kb)</Typography>
        {images.length > 0 && (
          <Grid item xs={12}>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpg"
              onChange={handleImageChange}
              hidden
            />
            <label htmlFor={"image"}>
              <Button fullWidth component="span" color="primary" variant="contained">
                Agrega Fotos
              </Button>
            </label>
          </Grid>
        )}
          {
            images.length ? (
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
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  hidden
                />
                <label htmlFor={"image"}> 
                  <Button  component="span" color="primary" variant="contained">
                    Agregar Fotos
                  </Button>
                </label>
              </Grid>
            )
          }
           
       
      
<Grid item xs={12} minHeight={'130px'}   >
      <Button  type="submit" sx={{minHeight:'60px'}} fullWidth variant="contained" color="success">
        Crear
      </Button>
      <Button  sx={{minHeight:'50px',mt:2}} onClick={()=>navigate('/auth/Productos', {replace:true})} fullWidth variant="contained" color="warning">
        Salir
      </Button>
</Grid>
    </Grid>
  );
};

export default CreateProduct;
