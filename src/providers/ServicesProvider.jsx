import { enqueueSnackbar } from 'notistack';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const ServiceAddContext = createContext()
const AvailableContext = createContext()
const OppenContext = createContext()

export const useServiceAdd = () => {
  return useContext(ServiceAddContext)
}
export const useAvailable = () => {
  return useContext(AvailableContext)
}
export const useOppen = () => {
  return useContext(OppenContext)
}

const ServicesProvider = ({children}) => {

  const [addServices, setAddServices] = useState([])
  const [open, setOpen] = useState(false)


  const handleAdd = () => {
    setAddServices('Agregado')
      }
      


  return (
   
    <ServiceAddContext.Provider value={{handleAdd, addServices}}>
        {children}
    </ServiceAddContext.Provider>

  )
}

export default ServicesProvider
