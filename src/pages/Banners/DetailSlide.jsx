import { Grid2, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material'
import { grey } from '@mui/material/colors';
import Image from 'mui-image';
import { localDate } from '../../Utils/ConvertIsoDate';

const DetailSlide = ({slide}) => {
  
    // Desestructuración de las propiedades del objeto slide
    const {no_slide,is_active, for_discount, discount, title, description, type_event, image_slide, image_slide_movil, } = slide;

    // Tipos de descuento disponibles
    const DISCOUNT_TYPES = [
      { value: "free_shipping", label: "Envío gratis" },
      { value: "first_buy", label: "Primera compra" },
      { value: "for_creators", label: "Creadores" },
      { value: "is_amount", label: "Monto de descuento" },
      { value: "is_percent", label: "Porcentaje" },
  ];

  return (
    <Grid2 container>
        {/* Título principal del slide */}
        <Grid2 size={12} className="Titles" minHeight="80px">
                <Typography
                    textAlign="center"
                    variant="h1"
                    fontSize={{ xs: '20px', sm: '30px', lg: '40px' }}
                >
                    Slide No. {no_slide}
                </Typography>
            </Grid2>

            {/* Información general del slide */}
            <Grid2 size={12}>
                <Typography variant="body1" color="initial">
                <strong>Titulo:</strong>{title} <br />
                <strong>Estado:</strong>{is_active ? 'activo': 'desactivo'} <br />
                   <strong>Evento : </strong>{ type_event ==='with-click' ? 'Con click': 'Sin click'} <br />
                  
                  {/* Información del descuento si aplica */}
                  <strong>Descuento:</strong>
                  { for_discount === true ? (
                     <Grid2 size={12} sx={{ backgroundColor: grey[200], padding: 2, borderRadius: '15px' }} >
                     <Typography textAlign="center" variant="h6" component="h2">
                         <strong>Nombre:</strong> {discount?.name}
                     </Typography>
                     <Typography sx={{ mt: 2 }}>
                         {/* Detalles del descuento */}
                         <strong>Descripción:</strong> {description} <br />
                         <strong>{`Tipo de descuento: ${DISCOUNT_TYPES.find((item) => item.value === discount.type_discount)?.label || "Desconocido"
                             }`}</strong>
                         <br />
                         <strong>Código:</strong> {discount.code} <br />
                         <strong>Fecha de inicio:</strong> {localDate(discount.start_date)} <br />
                         <strong>Fecha de expiración:</strong> {localDate(discount.expiration_date)} <br />
                         <strong>Monto mínimo de compra:</strong> ${discount.min_cart_amount} <br />
                         <strong>Monto máximo de compra:</strong> ${discount.max_cart_amount} <br />
                         <strong>Usos:</strong> {discount.unlimited ? "Ilimitado" : discount.maxUses} <br />
                         <strong>Estado:</strong> {discount.is_active ? "Activo" : "Desactivado"} <br />
                     </Typography>
                 </Grid2>
                  ) : 'No aplica'}
                  
                </Typography>
               
            </Grid2>

            {/* Imágenes del slide (versión escritorio y móvil) */}
            <Grid2 size={12} display={'flex'} alignItems={'center'} gap={2} justifyContent={'center'}>
              <Image width={'200px'} height={'200ox'} style={{objectFit:'contain'}} src={image_slide}/>
              <Image width={'200px'} height={'200ox'} style={{objectFit:'contain'}}  src={image_slide_movil}/>
            </Grid2>

    </Grid2>
  )
}

export default DetailSlide
