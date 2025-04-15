import { enqueueSnackbar } from 'notistack';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

// Crear un contexto para manejar la adición de servicios
const ServiceAddContext = createContext()

// Hook personalizado para usar el contexto de adición de servicios
export const useServiceAdd = () => {
  return useContext(ServiceAddContext)
}

const ServicesProvider = ({children}) => {

  let newValues = []

  // Función para agregar un nuevo servicio
  const handleAdd = (item) => {
    // Verifica si el servicio ya está en la lista
    const match = newValues?.find((item2)=> item2._id === item._id)
    if (!match) {
      // Si no está, lo agrega y muestra una notificación de éxito
      newValues.push(item)
      enqueueSnackbar('Servicio agregado', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } else {
      // Si ya está, muestra una notificación de error
      return enqueueSnackbar('Servicio ya agregado', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      })
    }
    return newValues
  }
  
  return (
    // Proveedor del contexto que expone la función handleAdd y la lista de servicios
    <ServiceAddContext.Provider value={{handleAdd, newValues}}>
        {children}
    </ServiceAddContext.Provider>
  )
}

export default ServicesProvider
