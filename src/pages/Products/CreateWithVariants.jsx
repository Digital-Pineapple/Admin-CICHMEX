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
  const [activeStep, setActiveStep] = useState(0);
  const { sizeGuide } = useSizeGuide();

  const type = sizeGuide[0]?.type || "others";

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
      <Grid2 size={12}>
        <Stepper activeStep={activeStep} orientation="vertical">
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
          {valuateTypeVariant(type)}
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
