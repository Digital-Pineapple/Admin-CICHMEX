import { Typography } from "@mui/material";
import MainFeatures from "./StepNewProduct/MainFeatures";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import Condition from "./StepNewProduct/Condition";

const CreateProduct = () => {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Mover la definición de steps dentro del componente, para poder usar handleNext y handleBack
  const steps = [
    {
      label: 'Características principales',
      component:  <MainFeatures handleNext={handleNext} handleBack={handleBack} index={0} isLastStep={false} />
    },
    {
      label: 'Condición',
      component:  <Condition handleNext={handleNext} handleBack={handleBack} index={1} isLastStep={true} />
    },
  ];

  return (
    <Grid container spacing={0}>
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
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
      </Grid>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">Último paso</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.component}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Todos los pasos completados - has terminado</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reiniciar
            </Button>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
