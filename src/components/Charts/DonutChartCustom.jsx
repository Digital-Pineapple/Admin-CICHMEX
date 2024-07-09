import { Typography } from "@mui/material";
import { Card, DonutChart, List, ListItem } from "@tremor/react";
import { useState, useEffect } from "react";

const currencyFormatter = (number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

const DonutChartCustom = ({ info = {} }) => {
  // Colors to use in the chart
  const colors = ['cyan', 'blue', 'indigo', 'violet', 'fuchsia'];

  // Convert object to array of objects with 'category' and 'value' keys
  const dataArray = Object.entries(info).map(([key, value], index) => ({
    name: key,
    value: parseFloat(value), // Ensure the value is a number
    color: colors[index % colors.length], // Assign a color from the colors array
  }));

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <Typography  textAlign={'center'} fontSize={30} color={'primary.contrastText'}>
          Ventas
        </Typography>
        <DonutChart
          className="mt-8"
          data={dataArray}
          category="value"
          index="name"
          valueFormatter={currencyFormatter}
          showTooltip={false}
          colors={colors}
        />
        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Nombre</span>
          <span>Cantidad</span>
        </p>
        <List className="mt-2">
          {dataArray.map((item) => (
            <ListItem key={item.name} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <span
                  className={classNames(
                    item.color,
                    'h-2.5 w-2.5 shrink-0 rounded-sm',
                  )}
                  aria-hidden={true}
                />
                <span className="truncate dark:text-dark-tremor-content-emphasis">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {currencyFormatter(item.value)}
                </span>
                {/* Assuming share is calculated elsewhere and added to item */}
                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                  {item.share}
                </span>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default DonutChartCustom;
