import Titles from "../../components/ui/Titles";

import Box from "@mui/material/Box";

import { useFormik } from "formik";
import TextField from '@mui/material/TextField'
import { Grid, TextareaAutosize, Button, styled, Badge, IconButton, Avatar } from "@mui/material";
import { Typography } from "antd";
import { useCategories } from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import useImages from "../../hooks/useImages";
import { Delete, Filter } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 1,
  },
}));

const CreateCategory = () => {
  const { addCategory, loadCategories }= useCategories();
  const navigate = useNavigate();
  const { images, handleImageChange, deleteImage, imagesPreview, imagesFiles } =
  useImages();
  const formik = useFormik({
    initialValues: {
      image:"",
      name: "",
    },
    onSubmit: (values) => {
      try {
        addCategory(values, imagesFiles())
        navigate('/auth/CategoriaServicios', {replace:true})
        loadCategories()
      } catch (error) {
        return enqueueSnackbar(`Error: ${error.response}`, {variant:'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }}, )
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Crear Categoria</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
         <Grid
          className="image-branch-container"
          item
          xs={12}
          display={"flex"}
          justifyContent={"flex-start"}
        >
          {/* <ImagesBranchComponent /> */}
          {
            images.length ? (
              <>
                <Grid
                  container
                  xs={12}
                  md={12}
                  spacing={1}
                  item
                  display={"flex"}
                  justifyContent={"flex-start"}
                  padding={"10px"}
                  marginTop={"20px"}
                  sx={{ backgroundColor: "#F7F7F7" }}
                >
                  {images.map(({ id, filePreview }) => (
                    <Grid item xs={12} md={6} key={id}>
                      <StyledBadge
                        badgeContent={
                          <IconButton
                            sx={{ backgroundColor: "black", color: "black" }}
                            onClick={() => deleteImage(id)}
                          >
                            {" "}
                            <Delete
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
                item
                xs={12}
                md={12}
                sx={{ backgroundColor: "#F7F7F7" }}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                marginTop={"20px"}
                height={"300px"}
                borderRadius={"5px"}
              >
                <Filter
                  style={{
                    fontSize: "40px",
                    alignSelf: "center",
                    marginBottom: "10px",
                  }}
                />
                {/* <Typography>Agrega imagenes de tu sucursal</Typography> */}
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  hidden
                />
                <label htmlFor={"image"}>
                  <Button component="span" color="primary" variant="outlined">
                    Agrega Foto
                  </Button>
                </label>
              </Grid>
            )
            // <Grid></Grid>
          }
        </Grid>
        <TextField
            focused
            fullWidth
            id="name"
            name="name"
            label="Nombre de la categoria"
            variant="outlined"
            value={formik.values.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
      </Grid>
      <Button type="submit" variant="contained" color="secondary">
        Crear
        
      </Button>
    </Box>
  );
};

export default CreateCategory;
