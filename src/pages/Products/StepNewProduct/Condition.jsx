import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../../../hooks/useProducts";

const Condition = ({ handleNext, handleBack, index, isLastStep }) => {
  const { dataProduct, dataStep2 } = useProducts();

  const DefaultValues = (data) => {
    return {
      condition: data?.condition || "",
    };
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: DefaultValues(dataProduct),
  });

  const onSubmit = (data) => {
    dataStep2(data);
    handleNext();
  };

  return (
    <Card
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      variant="elevation"
    >
      <CardHeader
        title="Condición"
        subheader="Indica el estado en que se encuentra el producto."
      />
      <CardContent>
        <Controller
          control={control}
          name="condition"
          rules={{
            required: { value: true, message: "Campo obligatorio*" },
          }}
          render={({ field }) => (
            <FormControl error={!!errors.condition}>
              <FormLabel id="condition-form">
                Indica el estado del producto.
              </FormLabel>
              <RadioGroup
                {...field}
                name="condition"
                aria-labelledby="condition-form"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              >
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="Nuevo"
                />
                <FormControlLabel
                  value="used"
                  control={<Radio />}
                  label="Usado"
                />
              </RadioGroup>
              <FormHelperText>{errors.condition?.message}</FormHelperText>
            </FormControl>
          )}
        />
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
  );
};

export default Condition;
