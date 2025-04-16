import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// Función para formatear un objeto en una cadena JSON legible
const formatObject = (obj) => {
  if (obj === null) {
    return '  undefined';
  }
  return JSON.stringify(obj, null, 2)
    .split('\n')
    .map((l) => `  ${l}`)
    .join('\n');
};

// Componente personalizado para mostrar un gráfico de dona con datos dinámicos
export const DonutChartCustom = ({ recivedCashDay, commissionPayedDay, cashDay }) => {

  // Maneja el evento de clic en un elemento del gráfico
  const handleClick = (event, itemIdentifier, item) => {
    setId(item.id);
    setIdentifier(itemIdentifier);
  };

  // Definición de los valores a mostrar en el gráfico
  const value1 = {
    id: 0,
    value: recivedCashDay,
    label: "Pago recibido",
  };
  const value2 = {
    id: 1,
    value: commissionPayedDay,
    label: "Comisión pagada",
  };
  const items = [value1, value2];

  return (
    <Stack
      direction={{ xs: 'column'}}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      justifyContent="space-between"
      sx={{ width: '100%' }}
    >
      {/* Muestra el total de ventas netas del día */}
      <Typography variant="h6" color="initial">Venta neta(día): ${cashDay}</Typography>
      
      {/* Renderiza el gráfico de dona si hay datos disponibles, de lo contrario muestra un esqueleto de carga */}
      {recivedCashDay !== undefined && recivedCashDay > 0 ? (
        <PieChart
          series={[
            {
              data: items,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          onItemClick={handleClick}
          width={400}
          height={200}
          margin={{ right: 200 }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="pulse"
        />
      )}
    </Stack>
  );
};
