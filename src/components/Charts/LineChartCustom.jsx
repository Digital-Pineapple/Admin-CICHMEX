import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography'
import { Skeleton } from '@mui/material';


export const LineChartCustom = ({salesDay}) => {
  
  const hours = salesDay?.map(data => data.hour);
  const sales = salesDay?.map(data => data.sales);
  
  
  return (
    <>
    <Typography variant="h4" textAlign={'center'} color="primary">Ventas por dia</Typography>
     {
      salesDay ? (
         <LineChart
      xAxis={[{ data: hours, label:'hora' }]}
      series={[
        {
          data: sales,
        },
      ]}
      height={400}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
      
    />
      ):(
        <Skeleton variant='rectangular' animation="wave" width={'100%'} height={'100%'}/>
      )
     }
    
    </>
   
  );
}
