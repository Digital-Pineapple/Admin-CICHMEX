import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography'
import { Skeleton } from '@mui/material';

// Componente personalizado para mostrar un gráfico de líneas con las ventas por día
export const LineChartCustom = ({salesDay}) => {
  
  // Extrae las horas de las ventas del día
  const hours = salesDay?.map(data => data.hour);
  
  // Extrae las ventas correspondientes a cada hora
  const sales = salesDay?.map(data => data.sales);
  
  return (
  <>
    {/* Título del gráfico */}
    <Typography variant="h4" textAlign={'center'} color="primary">Ventas por dia</Typography>
    
    {
    // Si hay datos de ventas, muestra el gráfico de líneas
    salesDay ? (
      <LineChart
      xAxis={[{ data: hours, label:'hora' }]} // Configuración del eje X con las horas
      series={[
        {
        data: sales, // Datos de las ventas
        },
      ]}
      height={400} // Altura del gráfico
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }} // Márgenes del gráfico
      grid={{ vertical: true, horizontal: true }} // Configuración de la cuadrícula
      />
    ) : (
      // Si no hay datos, muestra un esqueleto de carga
      <Skeleton variant='rectangular' animation="wave" width={'100%'} height={'100%'}/>
    )
    }
  </>
  );
}
