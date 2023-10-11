import { enqueueSnackbar } from 'notistack';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const ServiceAddContext = createContext()

export const useServiceAdd = () => {
  return useContext(ServiceAddContext)
}

const ServicesProvider = ({children}) => {

  let newValues = []

  const handleAdd = (item) => {
    const match = newValues?.find((item2)=> item2._id === item._id)
    if (!match) {
      newValues.push(item)
      enqueueSnackbar('Servicio agregado', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } else {return enqueueSnackbar('Servicio ya agregado', {variant: 'error',anchorOrigin: {vertical: 'bottom',horizontal: 'center',},})}
    return newValues
      }
  
  return (
   
    <ServiceAddContext.Provider value={{handleAdd, newValues}}>
        {children}
    </ServiceAddContext.Provider>

  )
}

export default ServicesProvider
