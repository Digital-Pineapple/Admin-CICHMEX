import React, { useEffect, useState } from "react";
import {
  Grid,
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
  const { loadSizeGuides, sizeGuides, navigate, dispatch } = useSizeGuide();
  const { dataStep3, product, loading, loadProduct, updateSizeGuide } = useProducts();
  const [open, setOpen] = useState(false);
  const [selectedSizeGuide, setSelectedSizeGuide] = useState(product?.size_guide || ""); // Estado para almacenar la guía seleccionada

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    loadSizeGuides();
  };

  const { id } = useParams();

  useEffect(() => {
    loadSizeGuides();
    loadProduct(id);
  }, [id]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      size_guide: product?.size_guide || "",
    },
  });

  const onAddSizeGuide = (values) => {
    updateSizeGuide(id, values)
  };

  // Si está cargando
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Obtener la guía seleccionada desde el estado
  const selectedGuide = sizeGuides.find((guide) => guide._id === selectedSizeGuide);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => loadProduct(id)}
            color="primary"
            startIcon={<Refresh />}
          >
            Recargar
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          component={"form"}
          onSubmit={handleSubmit(onAddSizeGuide)}
        >
          <Card variant="elevation">
            <CardHeader
              action={
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleOpen}
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
                  <FormControl
                    fullWidth
                    color="info"
                    error={!!errors.size_guide}
                  >
                    <FormLabel>Guía de medidas</FormLabel>
                    <Controller
                      name="size_guide"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Campo requerido",
                        },
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          size="small"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setSelectedSizeGuide(e.target.value); // Actualiza la guía seleccionada
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
              <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              {/* Cabecera de la tabla */}
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
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Fab
            color="primary"
            sx={{ top: 0, left: "90%" }}
            onClick={handleClose}
          >
            <Close />
          </Fab>
          <TableGuides />
        </Box>
      </Modal>
    </>
  );
};

export default SizeGuideEdit;
