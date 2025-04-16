import * as React from "react";
import Switch from "@mui/material/Switch";

// Etiqueta de configuración para el componente Switch, que incluye propiedades de accesibilidad.
const label = { inputProps: { "aria-label": "Switch demo" } };

// Componente funcional SwitchButton que representa un botón de interruptor controlado.
// Props:
// - handleChange: Función que se ejecuta cuando el estado del interruptor cambia (por defecto es una función vacía).
// - checked: Valor booleano que indica si el interruptor está activado o desactivado.
export default function SwitchButton({ handleChange = () => null, checked }) {
  return (
    <Switch
      checked={checked} // Estado actual del interruptor.
      onChange={handleChange} // Función que se ejecuta al cambiar el estado.
      inputProps={{ "aria-label": "controlled" }} // Propiedades de accesibilidad.
      color="success" // Color del interruptor cuando está activado.
    />
  );
}
