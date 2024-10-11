import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Grid } from '@mui/material';
import PaidProductOrders from './PaidProductOrders';
import ShippingOutOfRegions from '../Logistic/ShippingOutOfRegions';

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
          <Tab label="Envios fuera de región"  />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PaidProductOrders/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ShippingOutOfRegions/>
        </TabPanel>
    </Grid>
  );
}
