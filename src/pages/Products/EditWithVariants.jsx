import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks';
import MainFeaturesEdit from './EditProductTabs/MainFeaturesEdit';
import DimensionsGuide from './StepNewProduct/DimensionsGuide';
import SizeGuideEdit from './EditProductTabs/SizeGuideEdit';
import VariantsAndPhotos from './EditProductTabs/VariantsAndPhotos';
import DescriptionAndVideosEdit from './EditProductTabs/DescriptionAndVideosEdit';

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
const EditWithVariants = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { product} = useProducts()

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
        Editar Producto {product?.name}
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
          <Tab label="Características Principales"  />
          <Tab label="Guía de dimensiones"/>
          <Tab label="Variantes"/>
          <Tab label="Descripción y video"/>
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
         <MainFeaturesEdit/>
        </TabPanel> 
        <TabPanel value={value} index={1} dir={theme.direction}>
        <SizeGuideEdit/>
        </TabPanel> 
        <TabPanel value={value} index={2} dir={theme.direction}>
        <VariantsAndPhotos/>
        </TabPanel> 
        <TabPanel value={value} index={3} dir={theme.direction}>
        <DescriptionAndVideosEdit/>
        </TabPanel> 
    </Grid>
  );
}


export default EditWithVariants
