import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import {
  FormControl,
  FormLabel,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Typography,
  Select,
  FormHelperText,
  Modal,
  Box, Fab,
} from "@mui/material";
import { useSizeGuide } from "../../../hooks/useSizeGuide";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../../../hooks";
import { startSelectSizeGuide } from "../../../store/actions/sizeGuideActions";
import TableGuides from "../../SizeDimensions/TableGuides";
import { Close } from "@mui/icons-material";

// Estilo para el modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DimensionsGuide = ({ handleNext, handleBack, index, isLastStep }) => {
  // Hook personalizado para manejar las guías de tallas
  const { loadSizeGuides, sizeGuides, navigate, dispatch } = useSizeGuide();
  const [stateAddNewGuide, setStateAddNewGuide] = useState(false);
  const { dataStep3, dataProduct } = useProducts();

  // Estado para manejar la apertura y cierre del modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    loadSizeGuides(); // Recargar las guías de tallas al cerrar el modal
  };

  // Cargar las guías de tallas al montar el componente o cuando cambia el estado `stateAddNewGuide`
  useEffect(() => {
    loadSizeGuides();
  }, [stateAddNewGuide]);

  // Configuración del formulario con react-hook-form
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      size_guide: dataProduct?.size_guide || "", // Valor inicial del campo `size_guide`
    },
  });

  // Función para manejar el envío del formulario
  const onAddSizeGuide = (values) => {
    dataStep3(dataProduct._id, values, handleNext); // Guardar los datos y avanzar al siguiente paso
    const info = sizeGuides?.filter((i) => i._id === values.size_guide); // Buscar la guía seleccionada
    dispatch(startSelectSizeGuide(info)); // Guardar la guía seleccionada en el estado global
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          component={"form"}
          onSubmit={handleSubmit(onAddSizeGuide)} // Manejar el envío del formulario
        >
          <Card variant="elevation">
            <CardHeader
              action={
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleOpen()} // Abrir el modal para agregar una nueva guía
                >
                  Agregar nueva guia
                </Button>
              }
              title="Guia de dimensiones"
              subheader="Asocia una guía que contenga las medidas necesarias y evita preguntas o devoluciones"
            />
            <CardContent>
              <Card
                variant="elevation"
                sx={{ backgroundColor: "primary.light" }}
              >
                <CardContent>
                  <Typography variant="body2" color="primary.contrastText">
                    <strong>
                      Asocia una guía de tallas que aplique a tu producto para
                      evitar devoluciones
                    </strong>
                    <br />
                    Asegúrate de incluir todas las tallas de tus variantes en la
                    guía que crees y ayuda a tu comprador a elegir el producto
                    de acuerdo a sus medidas.
                  </Typography>
                  <FormControl
                    fullWidth
                    color="info"
                    error={!!errors.size_guide} // Mostrar error si el campo no es válido
                  >
                    <FormLabel>Guia de medidas</FormLabel>

                    {/* Controller de react-hook-form para el Select */}
                    <Controller
                      name="size_guide" // Nombre del campo que va a controlar el select
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Campo requerido", // Mensaje de error si el campo está vacío
                        },
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          size="small"
                          onChange={(e) => {
                            field.onChange(e.target.value); // Actualiza el valor en react-hook-form
                          }}
                        >
                          {sizeGuides.map((i) => (
                            <MenuItem key={i._id} value={i._id}>
                              {i.name} {/* Mostrar el nombre de cada guía */}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />

                    <FormHelperText>
                      {errors.size_guide
                        ? errors.size_guide.message // Mostrar mensaje de error si existe
                        : "Seleccione una guia"}{" "}
                    </FormHelperText>
                  </FormControl>
                </CardContent>
              </Card>
            </CardContent>
            <CardActions>
              <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
                {isLastStep ? "Guardar" : "Continuar"} {/* Texto dinámico según el paso */}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <div>
        {/* Modal para agregar una nueva guía */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            {/* Botón para cerrar el modal */}
            <Fab
              color="primary"
              sx={{ top: 0, left: '90%' }}
              onClick={handleClose}
            >
              <Close />
            </Fab>
            <TableGuides /> {/* Tabla de guías de dimensiones */}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default DimensionsGuide;
