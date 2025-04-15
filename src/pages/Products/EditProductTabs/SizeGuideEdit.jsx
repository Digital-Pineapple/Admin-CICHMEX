import React, { useCallback, useEffect, useState } from "react";
import {
  Grid2,
  MenuItem,
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
  Box,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSizeGuide } from "../../../hooks/useSizeGuide";
import { useProducts } from "../../../hooks";
import LoadingScreenBlue from "../../../components/ui/LoadingScreenBlue";
import { Close, Refresh } from "@mui/icons-material";
import TableGuides from "../../SizeDimensions/TableGuides";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SizeGuideEdit = () => {
  // Hooks personalizados para manejar guías de tallas y productos
  const { loadSizeGuides, sizeGuides, navigate, dispatch } = useSizeGuide();
  const { dataStep3, product, loading, loadProduct, updateSizeGuide } =
    useProducts();

  // Estado para manejar la apertura del modal y la guía seleccionada
  const [open, setOpen] = useState(false);
  const [selectedSizeGuide, setSelectedSizeGuide] = useState(
    product?.size_guide?._id || {}
  );

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    loadSizeGuides(); // Recargar las guías de tallas al cerrar el modal
  };

  // Obtener el ID del producto desde los parámetros de la URL
  const { id } = useParams();

  // Callback para cargar el producto y las guías de tallas
  const callbackSizeGuide = useCallback(() => {
    loadProduct(id); // Cargar los datos del producto
    loadSizeGuides(); // Cargar las guías de tallas
  }, [id]);

  // Efecto para ejecutar el callback al montar el componente
  useEffect(() => {
    callbackSizeGuide();
  }, [callbackSizeGuide]);

  // Configuración del formulario con react-hook-form
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      size_guide: product?.size_guide?._id || "", // Valor inicial del formulario
    },
  });

  // Función para asociar una guía de tallas al producto
  const onAddSizeGuide = (values) => {
    updateSizeGuide(id, values); // Actualizar la guía de tallas del producto
  };

  // Mostrar pantalla de carga si los datos están cargando
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Obtener la guía seleccionada desde el estado
  const selectedGuide = sizeGuides.find(
    (guide) => guide._id === selectedSizeGuide
  );

  return (
    <>
      <Grid2 container spacing={0}>
        <Grid2 size={12}>
          {/* Botón para recargar los datos del producto (comentado) */}
          {/* <Button
            variant="contained"
            onClick={() => loadProduct(id)}
            color="primary"
            startIcon={<Refresh />}
          >
            Recargar
          </Button> */}
        </Grid2>
        <Grid2
          item
          size={12}
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
                  onClick={handleOpen} // Abrir el modal para agregar una nueva guía
                >
                  Agregar nueva guía
                </Button>
              }
              title="Guía de dimensiones"
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
                  {/* Selector para elegir una guía de tallas */}
                  <FormControl
                    fullWidth
                    color="info"
                    error={!!errors.size_guide} // Mostrar error si el campo es inválido
                  >
                    <FormLabel>Guía de medidas</FormLabel>
                    <Controller
                      name="size_guide"
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
                            field.onChange(e.target.value); // Actualizar el valor del formulario
                            setSelectedSizeGuide(e.target.value); // Actualizar la guía seleccionada
                          }}
                        >
                          {sizeGuides.map((i) => (
                            <MenuItem key={i._id} value={i._id}>
                              {i.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {errors.size_guide
                        ? errors.size_guide.message
                        : "Seleccione una guía"}
                    </FormHelperText>
                  </FormControl>
                </CardContent>
              </Card>
            </CardContent>
            <CardActions>
              {/* Botón para guardar la guía seleccionada */}
              <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid2>
        <Grid2 size={12}>
          {/* Tabla para mostrar las dimensiones de la guía seleccionada */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Etiqueta</TableCell>
                  <TableCell>Equivalencia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedGuide?.dimensions?.map((dimension) => (
                  <TableRow key={dimension.id}>
                    <TableCell>{dimension.label}</TableCell>
                    <TableCell>{dimension.equivalence}</TableCell>
                  </TableRow>
                )) || (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No hay dimensiones disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      </Grid2>
      {/* Modal para agregar una nueva guía */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Fab
            color="primary"
            sx={{ top: 0, left: "90%" }}
            onClick={handleClose} // Cerrar el modal
          >
            <Close />
          </Fab>
          <TableGuides /> {/* Componente para gestionar las guías */}
        </Box>
      </Modal>
    </>
  );
};

export default SizeGuideEdit;
