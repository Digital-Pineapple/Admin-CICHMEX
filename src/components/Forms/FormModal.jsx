import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";

const FormModal = ({ setValuesCar, id, setReload }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false)


  const ValidateSchema = Yup.object().shape({
    plate_number: Yup.string()
      .min(7, "Introduce una placa valida")
      .max(7, "Introduce una placa valida")
      .required("Informacion requerida"),
  });

  const handleImage = ({ target }) => {
    setPreviewImage(URL.createObjectURL(target.files[0]));
    setSelectedFile(target.files[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      customer_id: id,
      plate_number: "",
      carDetail_image: "",
      status: true,
    },
    validationSchema: ValidateSchema,
    onSubmit: (values) => {
      try {
        values.carDetail_image = selectedFile;
        setLoading(true);
        setTimeout(() => {
          setLoading(false)
          setOpen(false)
          setValuesCar(values)
          setReload(true)
        }, 2000)

      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>

      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Auto
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Agregar auto</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Llena todos los campos para agregar tu auto
            </DialogContentText>
            <Grid
              color="#F7BFBF"
              borderRadius={5}
              mt={3}
              sx={{ border: 4, p: 5 }}
              container
              spacing={4}
            >
              <Grid
                item
                sm={8}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Grid item>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={previewImage ? previewImage : ""}
                        title={
                          selectedFile ? selectedFile.name : "Selecciona imagen"
                        }
                      />

                      <Typography gutterBottom variant="h5" component="div">
                        {selectedFile
                          ? selectedFile.name
                          : previewImage
                            ? "Cambiar imagen"
                            : "Elige una imagen"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <input
                        type="file"
                        id="carDetail_image"
                        name="carDetail_image"
                        accept="image/png, image/jpeg"
                        onChange={(e) => handleImage(e)}
                      />
                    </CardActions>
                  </Card>
                </Grid>
                <TextField
                  focused
                  fullWidth
                  id="plate_number"
                  name="plate_number"
                  type="text"
                  label="Placa"
                  variant="outlined"
                  value={formik.values.plate_number}
                  sx={{ margin: 2 }}
                  onChange={formik.handleChange}
                  helperText={formik.errors.plate_number ? formik.errors.plate_number : ""}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<Save />}
              variant="outlined"
              type='submit'
              
            >
              Guardar
            </LoadingButton>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Salir
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default FormModal;
