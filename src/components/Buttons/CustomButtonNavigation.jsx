
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Button} from '@mui/material';
import ServicesCard from '../cards/ServicesCard';
import { useState, useRef, useEffect } from 'react';
import { AutoAwesomeMosaicTwoTone, HomeWorkOutlined, RemoveCircleOutline } from '@mui/icons-material';
import { useServiceAdd } from '../../providers/ServicesProvider';
import ListCheck from '../ui/ListCheck';
import ModalAdd from '../ui/ModalAdd';
import ActiveCarCard from '../cards/ActiveCarCard';

const CustomButtonNavigation = ({available, myServices, id, services_id }) => {


  const [value, setValue] = useState(0)
  const ok = async()=>{

  }

  const ref = useRef(null);
  


  return (
    <Box  ref={ref}>
       
      { value === 0 ? (
        <>
        <Typography variant="h3" textAlign="center" color="primary">Mis servicios</Typography>
        <Grid sx={{backgroundColor:'ButtonHighlight'}}  width={'100%'} container columns={18}>

    
          {myServices? myServices.map((item)=>{
          return(
          <>
            <ActiveCarCard
              item={item}
              key={item?._id}
              services_id={item?._id}
              info={available}
              
            />
          </>
            )
            
          }): 'Sin servicios disponibles' }
      </Grid>
        </>
      
      )
      : value === 1 ? (
        <>
        <Grid  container columns={20}>
        {available? available.map((item)=>{
          return(
           
              <ServicesCard
                item={item}
                key={item?._id}
                services_id={services_id}
              />
            
            )
            
          }) :'Sin servicios disponibles' }
          </Grid>
          <Typography variant="h4" color="inherit">
        Servicios a agregar
       </Typography>
      <ModalAdd setValue={setValue} myServices={myServices} id={id}/> 
        </>
          
          )
      : value === 2 ? (
        <Grid container columns={20}>
        {myServices? myServices.map((item)=>{
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
          <BottomNavigationAction label="Mis servicios" icon={<AutoAwesomeMosaicTwoTone />} />
          <BottomNavigationAction label="Servicios disponibles" icon={<HomeWorkOutlined />} />
          <BottomNavigationAction label="Eliminar servicios" icon={<RemoveCircleOutline />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}


export default CustomButtonNavigation
