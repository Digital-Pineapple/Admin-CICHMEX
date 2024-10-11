import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
const Condition = ({handleNext, handleBack, index, isLastStep}) => {
  return (
   <Card variant="elevation">
    <CardHeader
      title="Condición"
      subheader="Indica el estado del producto"
    />
     <CardContent>
       
     </CardContent>
     <CardActions>
     <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 1, mr: 1 }}
          >
            {isLastStep ? 'Completar' : 'Guardar'}
          </Button>
          <Button
            disabled={index === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Cancelar
          </Button>
     </CardActions>
   </Card>
  )
}

export default Condition
