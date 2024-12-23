import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useProductOrder } from '../../../hooks/useProductOrder';
import { useAuthStore } from '../../../hooks';
import { AppBar, Button, Grid2, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import ReadyToSend from '../ReadyToSend';
import { useTheme } from '@mui/material/styles';
import { localDate } from '../../../Utils/ConvertIsoDate';
import LoadingScreenBlue from '../../../components/ui/LoadingScreenBlue';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{width:'100%'}}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
         {children}
        </>
      )}
    </div>
  );
}
const MainToSend = () => {
  const { user } = useAuthStore();
   const theme = useTheme();
      const { loadProductOrdersPaidAndFill, productOrders, loading } =
        useProductOrder();
  const [value, setValue] = useState({data:[], value:0});

  useEffect(() => {
      loadProductOrdersPaidAndFill();
    }, [user]);

    const rowsAllPO = productOrders?.map((item, index) => ({
        id: index,
        date: localDate(item.createdAt),
        supply_date: localDate(item.supply_detail?.date),
        ...item,
      }));


  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  if (loading) return <LoadingScreenBlue />;

  return (
    <Grid2 container gap={2} width={'100%'}>   
     <Grid2
        item
        marginTop={{ xs: "-30px" }}
        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Pedidos para envío
        </Typography>
      </Grid2>
      <Grid2
        item
        display={"flex"}
        justifyContent={"end"}
        rowSpacing={2}
        size={12}
      >
        <Button
          size="small"
          startIcon={<Refresh />}
          variant="contained"
          color="primary"
          onClick={loadProductOrdersPaidAndFill}
        >
          Recargar
        </Button>
      </Grid2>
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
    <AppBar position="static">
        <Tabs
          value={value.value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Todos"  />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
       <ReadyToSend rows={rowsAllPO}/> 
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </Box>
    </Grid2>
  );
}


export default MainToSend

