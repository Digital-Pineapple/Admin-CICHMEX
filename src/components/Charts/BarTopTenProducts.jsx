import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Skeleton, Typography } from '@mui/material';

// Componente para seleccionar los parámetros de los ticks en el gráfico
function TickParamsSelector({
  tickPlacement,
  tickLabelPlacement,
  setTickPlacement,
  setTickLabelPlacement,
}) {
  return (
    <Stack direction="column" justifyContent="space-between" sx={{ width: '100%' }}>
      <FormControl>
        <FormLabel id="tick-placement-radio-buttons-group-label">
          tickPlacement
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="tick-placement-radio-buttons-group-label"
          name="tick-placement"
          value={tickPlacement}
          onChange={(event) => setTickPlacement(event.target.value)}
        >
          <FormControlLabel value="start" control={<Radio />} label="start" />
          <FormControlLabel value="end" control={<Radio />} label="end" />
          <FormControlLabel value="middle" control={<Radio />} label="middle" />
          <FormControlLabel value="extremities" control={<Radio />} label="extremities" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="label-placement-radio-buttons-group-label">
          tickLabelPlacement
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="label-placement-radio-buttons-group-label"
          name="label-placement"
          value={tickLabelPlacement}
          onChange={(event) => setTickLabelPlacement(event.target.value)}
        >
          <FormControlLabel value="tick" control={<Radio />} label="tick" />
          <FormControlLabel value="middle" control={<Radio />} label="middle" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}

// Función para formatear los valores mostrados en el gráfico
const valueFormatter = (value) => `${value} unidades`;

// Configuración general del gráfico de barras
const chartSetting = {
  yAxis: [
    {
      label: 'Cantidad vendida',
    },
  ],
  series: [{ dataKey: 'totalQuantity', label: 'Productos más vendidos', valueFormatter }],
  height: 400,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

// Componente principal que muestra el gráfico de los 10 productos más vendidos
const BarTopTenProducts = ({ topProducts }) => {
  return (
    <div style={{ width: '100%' }}>
      {
        topProducts ? (
          <>
            <Typography variant="h6" color="initial">Top productos más vendidos del mes</Typography>
            <BarChart
              dataset={topProducts}
              xAxis={[
                { scaleType: 'band', dataKey: 'productName', tickPlacement: 'middle', tickLabelPlacement: 'middle' },
              ]}
              {...chartSetting}
            />
          </>
        ) : (
          <Skeleton variant="rectangular" width="100%" height="100%" animation="pulse" />
        )
      }
    </div>
  );
}

export default BarTopTenProducts;
