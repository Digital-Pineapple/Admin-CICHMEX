import { Grid, Typography, Card, CardContent, CardActions, Button, Icon, IconButton } from "@mui/material"
import { useAuthStore } from "../hooks"
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link } from "react-router-dom";
import { useProductOrder } from "../hooks/useProductOrder";
import { useEffect } from "react";

const Principal = () => {
  const {user} = useAuthStore()
  const {loadResumeProductOrder, resumeOrders} = useProductOrder()
  useEffect(() => {
    loadResumeProductOrder()
  }, [user])
  
console.log(resumeOrders);
  const cards =[
    {
      title:'Ventas por Día',
      icon:<EventIcon/>,
      number:resumeOrders.ordersDay,
      path:''
    },
    {
      title:'Ventas por Mes',
      icon:<CalendarMonthIcon/>,
      number:resumeOrders.ordersMonth,
      path:''
    },
    {
      title:'Ingresos por día',
      icon:<TrendingUpIcon/>,
      number:`$ ${resumeOrders.cashDay}`,
      path:''
    },
    {
      title:'Ingresos por Més',
      icon:<TrendingUpIcon/>,
      number:`$ ${resumeOrders.cashMonth}`,
      path:''
    },

  ]
  
  
  
  return (
    <>
     <Grid contsianer display={'flex'} flexDirection={'column'} sx={{marginX:'10%'}}>
      
      <Grid item xs={12} width={'100%'} boxSizing={'border-box'} padding={2} borderRadius={'20px'}  bgcolor={'#0E4E73'}>
        
     <Typography variant="h1" fontSize={{xs:'40px'}} color="#fff">Bienvenido {user?.fullname}</Typography>
      </Grid>

      <Grid container spacing={2}  marginY={'20px'}>

        {
          cards.map((item, index)=>{
            return(
              <Grid key={index}  item xs={6} lg={3}>
                <Link to={item.path} style={{textDecoration:'none'}}  >
              <Card variant="outlined">
              <CardContent>
             {item.icon}
                <Typography variant="h2" fontSize={{xs:'20px', md:'25px'}} color="initial">{item.title}</Typography>
                <br />
                <Typography variant="h2" color="initial">{item.number}</Typography>
              </CardContent>
              
            </Card>
                </Link>
              </Grid>
            )
          })
        }
        
      </Grid>

    </Grid>
    </>
  )
}


export default Principal