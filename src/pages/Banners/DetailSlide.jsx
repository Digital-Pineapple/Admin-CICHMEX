import { Grid2, Typography, Card, CardContent, CardActions, Button } from '@mui/material'

const DetailSlide = ({slide}) => {
    const {no_slide,is_active, for_discount, discount, title, description, type_event, image_slide, image_slide_movil} = slide
  return (
    <Grid2 container>
        <Grid2 size={12} className="Titles" minHeight="80px">
                <Typography
                    textAlign="center"
                    variant="h1"
                    fontSize={{ xs: '20px', sm: '30px', lg: '40px' }}
                >
                    Slide No. {no_slide}
                </Typography>
            </Grid2>
            <Grid2 size={12}>
                
               
            </Grid2>

    </Grid2>
  )
}

export default DetailSlide
