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
const Principal = () => {
  const { user } = useAuthStore();
  const { loadResumeProductOrder, resumeOrders } = useProductOrder();
  useEffect(() => {
    loadResumeProductOrder();
  }, [user]);
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
      title: "Ingresos por mes",
      icon: <CalendarMonthIcon />,
      number: `$${resumeOrders.recivedCashMonth}`,
      path: "",
    },
    {
      title: "Ingresos por año",
      icon: <CalendarMonthIcon />,
      number: `$ ${resumeOrders.recivedCashYear}`,
      path: "",
    },
   
  ];

  const cards2 =[
 {
      title: "Ventas al día",
      icon: <TrendingUpIcon />,
      number: `${resumeOrders.ordersDay}`,
      path: "",
    },
    {
      title: "Ventas al mes",
      icon: <TrendingUpIcon />,
      number: `${resumeOrders.ordersMonth}`,
      path: "",
    },
    {
      title: "Ventas al año",
      icon: <TrendingUpIcon />,
      number: `${resumeOrders.ordersYear}`,
      path: "",
    },
  ]
  

  return (
    <>
      <Grid
        contaianer
        display={"flex"}
        flexDirection={"column"}
        sx={{ padding: { xs: 0, md: 4 } }}
        maxWidth={'85vw'}
      >
        <Grid container spacing={{ xs: 1, sm: 4 }}>
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


        <Grid container width={'100%'} marginTop={6} >
          <Grid item xs={7}>  
          

              <LineChartCustom salesDay={resumeOrders?.salesDayByHour}/>
            
          </Grid>
          <Grid item xs={4}padding={6} >
            <DonutChartCustom/>
          </Grid>
        </Grid>
       <Grid container spacing={{ xs: 1, sm: 4 }}>
          {cards2.map((item, index) => {
            return (
              <Grid key={index} item xs={6} lg={3}>
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
      </Grid>
    </>
  );
};

export default Principal;
