import React, { useState } from "react";
import { createScheduleAdapter } from "../adapters/branch";

// Días de la semana
export const days = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

// Horarios predeterminados para cada día de la semana
const defaultSchedules = days.map((item) => {
  return {
    day: item, // Día de la semana
    selected: false, // Indica si el día está seleccionado
    open: "", // Hora de apertura
    close: "", // Hora de cierre
  };
});

const useSchedules = () => {
  // Estado que contiene los horarios
  const [schedules, setSchedules] = useState(defaultSchedules);

  // Adaptación de los horarios para un formato específico
  const schedules_f = schedules.map((item) => createScheduleAdapter(item));

  // Maneja la selección de un día específico
  const handleSelectedSchedules = (day) => {
    const newSchedules = schedules;
    const schedule = newSchedules.find((item) => item.day === day);
    schedule.selected = !schedule.selected; // Cambia el estado de selección
    setSchedules([...newSchedules]); // Actualiza el estado
  };

  // Limpia el horario (abre y cierra) de un día específico
  const handleCleanSchedule = (day) => {
    const newSchedules = schedules;
    const schedule = newSchedules.find((item) => item.day === day);
    schedule.open = ""; // Limpia la hora de apertura
    schedule.close = ""; // Limpia la hora de cierre
    setSchedules([...newSchedules]); // Actualiza el estado
  };

  // Asigna un horario a todos los días seleccionados
  const handleAssignSchedule = (schedule) => {
    const newSchedules = schedules.map((item) => {
      if (item.selected) { // Si el día está seleccionado
        item.open = schedule.open; // Asigna la hora de apertura
        item.close = schedule.close; // Asigna la hora de cierre
        item.selected = false; // Desmarca el día
      }
      return item;
    });
    setSchedules([...newSchedules]); // Actualiza el estado
  };

  // Selecciona todos los días que no tienen horario asignado
  const handleSelectAll = () => {
    const newSchedules = schedules.map((item) => {
      if (!item.open && !item.close) { // Si no tiene hora de apertura ni cierre
        item.selected = true; // Marca el día como seleccionado
      }
      return item;
    });
    setSchedules([...newSchedules]); // Actualiza el estado
  };

  // Verifica si al menos un día está seleccionado
  const isADaySelected = () => {
    return schedules.some((item) => item.selected);
  };

  // Verifica si al menos un día tiene un horario asignado
  const isAScheduleAssigned = () => {
    return schedules.some((item) => item.open && item.close);
  };

  return {
    schedules, // Lista de horarios
    handleSelectedSchedules, // Función para manejar la selección de días
    handleAssignSchedule, // Función para asignar horarios
    isADaySelected, // Función para verificar si hay días seleccionados
    handleCleanSchedule, // Función para limpiar horarios de un día
    handleSelectAll, // Función para seleccionar todos los días sin horario
    isAScheduleAssigned, // Función para verificar si hay horarios asignados
    schedules_f, // Lista de horarios adaptados
    setSchedules // Función para actualizar el estado de horarios
  };
};

export default useSchedules;
