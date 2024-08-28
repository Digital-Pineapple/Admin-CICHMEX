import {
  Grid,
  Typography,
  Card,
  CardContent,
  SvgIcon,
} from "@mui/material";
import { useAuthStore } from "../hooks";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Link } from "react-router-dom";
import { useProductOrder } from "../hooks/useProductOrder";
import { useEffect } from "react";
import { LineChartCustom } from "../components";
import { DonutChartCustom } from "../components/Charts/DonutChartCustom";
import LoadingScreenBlue from '../components/ui/LoadingScreenBlue'
import BarTopTenProducts from "../components/Charts/BarTopTenProducts";
import LastTenTable from "../components/Tables/LastTenTable";
const Principal = () => {
  const { logged } = useAuthStore();
  const { loadResumeProductOrder, resumeOrders, loading } = useProductOrder();
  useEffect(() => {
    loadResumeProductOrder();
  }, [logged]);

  const cards = [
    {
      title: "Ingresos por día",
      icon: <EventIcon />,
      number: `$${resumeOrders.recivedCashDay}`,
      path: "",
      color: "secondary.main",
      textColor: "secondary.contrastText",
    },
    
    {
      title: "Ingresos por semana",
      icon: <CalendarMonthIcon />,
      number: `$ ${resumeOrders.recivedCashWeek}`,
      path: "",
    },
   {
      title: "Ingresos por mes",
      icon: <CalendarMonthIcon />,
      number: `$${resumeOrders.recivedCashMonth}`,
      path: "",
    },
  ];

  const cards2 =[
 {
      title: "Ventas del día",
      icon: <TrendingUpIcon />,
      number: `${resumeOrders.ordersDay}`,
      path: "",
      color: "secondary.main",
      textColor: "secondary.contrastText",
    },
    {
      title: "Ventas de la semana",
      icon: <TrendingUpIcon />,
      number: `${resumeOrders.ordersWeek}`,
      path: "",
    },
    {
      title: "Ventas del mes",
      icon: <TrendingUpIcon />,
      number: `${resumeOrders.ordersMonth}`,
      path: "",
    },
  ]
  
  if (loading) {
    return ( <LoadingScreenBlue/>)
  }

  return (
    <>
      <Grid
        contaianer
        sx={{ padding: { xs: 0, md: 4 } }}
        maxWidth={'85vw'}
        gap={2}
      >
        <Grid container spacing={2}>  
          {cards.map((item, index) => {
            return (
              <Grid key={index} item xs={6} lg={4}>
                <Link to={item.path} style={{ textDecoration: "none" }}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: "20px",
                      height: "150px",
                      padding: "10px",
                      backgroundColor: item?.color,
                      color: item?.textColor,
                    }}
                  >
                    <CardContent>
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography
                            variant="h6"
                            fontWeight={"Bold"}
                            fontSize={{ xs: "15px", md: "20px" }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight={"Bold"}
                            fontSize={{ xs: "30px", md: "50px" }}
                          >
                            {item.number}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <SvgIcon sx={{ width: "40px", height: "70px" }}>
                            {item.icon}
                          </SvgIcon>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
      
        </Grid>


  <Grid container marginY={2} spacing={2}>
          <Grid item xs={7}>  
              <LineChartCustom salesDay={resumeOrders?.salesDayByHour}/>
          </Grid>
          <Grid item xs={4}padding={6} >
              <DonutChartCustom commissionPayedDay={resumeOrders?.commissionPayedDay}recivedCashDay={resumeOrders?.recivedCashDay} cashDay={resumeOrders?.cashDay} />
          </Grid>
  </Grid>
   
      <Grid container marginY={2} spacing={2}>
          {cards2.map((item, index) => {
            return (
              <Grid key={index} item xs={6} lg={4}>
                <Link to={item.path} style={{ textDecoration: "none" }}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: "20px",
                      height: "150px",
                      padding: "10px",
                      backgroundColor: item?.color,
                      color: item?.textColor,
                    }}
                  >
                    <CardContent>
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography
                            variant="h6"
                            fontWeight={"Bold"}
                            fontSize={{ xs: "15px", md: "20px" }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight={"Bold"}
                            fontSize={{ xs: "30px", md: "50px" }}
                          >
                            {item.number}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <SvgIcon sx={{ width: "40px", height: "70px" }}>
                            {item.icon}
                          </SvgIcon>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
      </Grid>
       

<Grid container alignItems={'center'} spacing={2}>
  
        <Grid item xs={6} >
              <BarTopTenProducts topProducts={resumeOrders?.topProductsMonth} />
          </Grid>

          <Grid item xs={5}  >
              <LastTenTable rows={resumeOrders?.lastTen}/>
          </Grid>
</Grid>
      </Grid>
    </>
  );
};

export default Principal;
