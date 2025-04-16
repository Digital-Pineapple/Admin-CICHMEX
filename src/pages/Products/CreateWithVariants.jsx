import { Typography } from "@mui/material";
import MainFeatures from "./StepNewProduct/MainFeatures";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Condition from "./StepNewProduct/Condition";
import DimensionsGuide from "./StepNewProduct/DimensionsGuide";
import Variants from "./StepNewProduct/Variants";
import DescriptionsAndVideo from "./StepNewProduct/DescriptionsAndVideo";
import { useProducts } from "../../hooks";
import { useSizeGuide } from "../../hooks/useSizeGuide";
import VariantsClothesAndShoes from "./StepNewProduct/VariantsClothesAndShoes";

const CreateWithVariants = () => {
  // Estado para controlar el paso activo en el Stepper
  const [activeStep, setActiveStep] = useState(0);

  // Hook para obtener la guía de tamaños
  const { sizeGuide } = useSizeGuide();

  // Determinar el tipo de producto (ropa, zapatos u otros)
  const type = sizeGuide[0]?.type || "others";

  // Avanzar al siguiente paso
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Retroceder al paso anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Reiniciar el Stepper al paso inicial
  const handleReset = () => {
    setActiveStep(0);
  };

  // Función para evaluar el tipo de variante y renderizar el componente correspondiente
  const valuateTypeVariant = (type) => {
    return type === "clothes" || type === "shoes" ? (
      <Step key={"Variantes y fotos"}>
        <StepLabel>Variantes y fotos</StepLabel>
        <StepContent>
          <VariantsClothesAndShoes
            handleNext={handleNext}
            handleBack={handleBack}
            index={2}
            isLastStep={false}
          />
        </StepContent>
      </Step>
    ) : (
      <Step key={"Variantes y fotos"}>
        <StepLabel>Variantes y fotos</StepLabel>
        <StepContent>
          <Variants
            handleNext={handleNext}
            handleBack={handleBack}
            index={2}
            isLastStep={false}
          />
        </StepContent>
      </Step>
    );
  };

  return (
    <Grid2 container spacing={0}>
      {/* Título principal de la página */}
      <Grid2
        size={12}
        marginTop={{ xs: "-30px" }}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Agregar producto
        </Typography>
      </Grid2>

      {/* Contenedor del Stepper para los pasos del formulario */}
      <Grid2 size={12}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {/* Paso 1: Características principales */}
          <Step key={"Características principales"}>
            <StepLabel>Características principales</StepLabel>
            <StepContent>
              <MainFeatures
                handleNext={handleNext}
                handleBack={handleBack}
                index={3}
                isLastStep={false}
              />
            </StepContent>
          </Step>

          {/* Paso 2: Guía de dimensiones */}
          <Step key={"Guia de Dimensiones"}>
            <StepLabel>Guia de Dimensiones</StepLabel>
            <StepContent>
              <DimensionsGuide
                handleNext={handleNext}
                handleBack={handleBack}
                index={1}
                isLastStep={false}
              />
            </StepContent>
          </Step>

          {/* Paso 3: Variantes y fotos (según el tipo de producto) */}
          {valuateTypeVariant(type)}

          {/* Paso 4: Descripción y video */}
          <Step key={"Descripción y video"}>
            <StepLabel>Descripción y video</StepLabel>
            <StepContent>
              <DescriptionsAndVideo
                handleNext={handleNext}
                handleBack={handleBack}
                index={3}
                isLastStep={true}
                handleReset={handleReset}
              />
            </StepContent>
          </Step>
        </Stepper>
      </Grid2>
    </Grid2>
  );
};

export default CreateWithVariants;
