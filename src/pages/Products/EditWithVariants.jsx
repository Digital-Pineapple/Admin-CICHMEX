import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Grid2 } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks';
import MainFeaturesEdit from './EditProductTabs/MainFeaturesEdit';
import DimensionsGuide from './StepNewProduct/DimensionsGuide';
import SizeGuideEdit from './EditProductTabs/SizeGuideEdit';
import VariantsAndPhotos from './EditProductTabs/VariantsAndPhotos';
import DescriptionAndVideosEdit from './EditProductTabs/DescriptionAndVideosEdit';
import VariantsAndPhotosShoes from './EditProductTabs/VariantsAndPhotosShoes';

// Componente para manejar el contenido de cada pestaña
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ width: '100%' }}
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

// Función para determinar qué componente mostrar según el tipo de guía de tallas
const valueteTypeSizeGuide = (type) => {
  if (type === 'clothes' || type === 'shoes') {
    return <VariantsAndPhotosShoes />;
  } else {
    return <VariantsAndPhotos />;
  }
};

const EditWithVariants = () => {
  const theme = useTheme(); // Hook para obtener el tema actual de Material-UI
  const [value, setValue] = useState(0); // Estado para manejar la pestaña seleccionada
  const { product } = useProducts(); // Hook personalizado para obtener los datos del producto

  // Función para manejar el cambio de pestañas
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid2 container display={'flex'} gap={2}>
      {/* Título de la página */}
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
          Editar Producto {product?.name}
        </Typography>
      </Grid2>

      {/* Barra de pestañas */}
      <AppBar position="static" sx={{ borderRadius: '10px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Características Principales" />
          <Tab label="Guía de dimensiones" />
          <Tab label="Variantes" />
          <Tab label="Descripción y video" />
        </Tabs>
      </AppBar>

      {/* Contenido de cada pestaña */}
      <TabPanel value={value} index={0} dir={theme.direction}>
        {/* Componente para editar las características principales */}
        <MainFeaturesEdit />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {/* Componente para editar la guía de dimensiones */}
        <SizeGuideEdit />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        {/* Componente para editar las variantes y fotos según el tipo de guía de tallas */}
        {valueteTypeSizeGuide(product?.size_guide?.type)}
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        {/* Componente para editar la descripción y videos */}
        <DescriptionAndVideosEdit />
      </TabPanel>
    </Grid2>
  );
};

export default EditWithVariants;
