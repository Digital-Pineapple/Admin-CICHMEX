import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Grid } from '@mui/material';
import PaidProductOrders from './PaidProductOrders';
import ShippingDeliveryPoint from '../Logistic/ShippingDeliveryPoint';
import ShippingDelivery from '../Logistic/ShippingDelivery';

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

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Grid container display={'flex'}gap={2} >
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
         Mi almacén
        </Typography>
      </Grid>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Pedidos pendientes por surtir"  />
          <Tab label="Envios a domicilio"  />
          <Tab label="Envios a punto de entrega" />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PaidProductOrders/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ShippingDelivery/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ShippingDeliveryPoint/>
        </TabPanel>
    </Grid>
  );
}
