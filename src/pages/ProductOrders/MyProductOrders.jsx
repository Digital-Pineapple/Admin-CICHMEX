import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import PaidProductOrders from "./PaidProductOrders";
import CompletedOrders from "../MyStoreHouse/CompletedOrders";
import { Grid2 } from "@mui/material";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ width: "100%" }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paths = [{ path: `/almacenista/mis-ventas`, name: "Pedidos" }];

  return (
    <Grid2 container paddingX={10} display={"flex"} gap={2}>
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4">
          <strong>Pedidos</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <AppBar position="static" sx={{ borderRadius: "10px", bgcolor:'#fff', color:'#000', fontWeight:'Bold' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"

        >
          <Tab label="Pedidos pendientes por surtir"  sx={{fontWeight:'Bold'}}/>
          <Tab label="Pedidos ya surtidos" sx={{fontWeight:'Bold'}} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <PaidProductOrders />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <CompletedOrders />
      </TabPanel>
    </Grid2>
  );
}
