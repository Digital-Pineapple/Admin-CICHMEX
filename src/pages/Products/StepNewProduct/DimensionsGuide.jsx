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
} from "@mui/material";
import { useSizeGuide } from "../../../hooks/useSizeGuide";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../../../hooks";
import { startSelectSizeGuide } from "../../../store/actions/sizeGuideActions";

const DimensionsGuide = ({ handleNext, handleBack, index, isLastStep }) => {
  const { loadSizeGuides, sizeGuides, navigate, dispatch } = useSizeGuide();
  const [stateAddNewGuide, setStateAddNewGuide] = useState(false);
  const { dataStep3, dataProduct } = useProducts();

  useEffect(() => {
    loadSizeGuides();
  }, [stateAddNewGuide]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      size_guide: dataProduct?.size_guide || "",
    },
  });

  const onAddSizeGuide = (values) => {
    dataStep3(values);
    const info = sizeGuides?.filter((i) => i._id === values.size_guide);
    dispatch(startSelectSizeGuide(info));
    handleNext();
  };

  return (
    <>
      <Grid container spacing={0}>
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
                  onClick={() =>
                    navigate("/guia-dimensiones/agregar", { replace: true })
                  }
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
                    error={!!errors.size_guide}
                  >
                    <FormLabel>Guia de medidas</FormLabel>

                    {/* Controller de react-hook-form para el Select */}
                    <Controller
                      name="size_guide" // Nombre del campo que va a controlar el select
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
                            field.onChange(e.target.value); // Actualiza el valor en react-hook-form
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
                        : "Seleccione una guia"}{" "}
                    </FormHelperText>
                  </FormControl>
                </CardContent>
              </Card>
            </CardContent>
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
        </Grid>
      </Grid>
    </>
  );
};

export default DimensionsGuide;
