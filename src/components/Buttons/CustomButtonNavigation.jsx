
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Grid} from '@mui/material';
import ServicesCard from '../cards/ServicesCard';
import { useState, useRef, useEffect } from 'react';
import { AutoAwesomeMosaicTwoTone, HomeWorkOutlined, RemoveCircleOutline } from '@mui/icons-material';




const CustomButtonNavigation = ({available}) => {

  const [value, setValue] = useState(0);
const [refresh, setRefresh] = useState('')

  const ref = useRef(null);

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    const renderInfo ={
     0: ()=>{setRefresh(available)},
     1: ()=>{setRefresh(available)},
     2: ()=>{setRefresh(available
      )}
    }
    const defaultRender = setRefresh('Error al cargar los servicios...')
  const infoCard = renderInfo[value] || defaultRender
    infoCard()
  }, [value]);
  return (
    <Box  sx={{ pb: 7, mx:'10%' }} borderColor={'red'} ref={ref}>
      { value === 0 ? (
        <Grid item xs={200} md={10} lg={6} xl={4}>
        {refresh? refresh.map((item)=>{
          return(
            <ServicesCard
              item={item}
              key={item._id}
              services_id={item?._id}
              
            />
            )
            
          }) :'Sin servicios disponibles' }
      </Grid>)
      : value === 1 ? (
        <Grid item xs={200} md={10} lg={6} xl={4}>
        {refresh? refresh.map((item)=>{
          return(
            <ServicesCard
              item={item}
              key={item._id}
              services_id={item?._id}
              // setNew={setNewValues}
            />
            )
            
          }) :'Sin servicios disponibles' }
          </Grid>)
      : value === 2 ? (
        <Grid item xs={200} md={10} lg={6} xl={4}>
        {refresh? refresh.map((item)=>{
          return(
            <ServicesCard
              item={item}
              key={item._id}
              services_id={item?._id}
              // setNew={setNewValues}
            />
            )
            
          }) :'Sin servicios disponibles' }
          </Grid>)
       : null
      }

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Servicios disponibles" icon={<HomeWorkOutlined />} />
          <BottomNavigationAction label="Mis servicios" icon={<AutoAwesomeMosaicTwoTone />} />
          <BottomNavigationAction label="Eliminar servicios" icon={<RemoveCircleOutline />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}


export default CustomButtonNavigation
