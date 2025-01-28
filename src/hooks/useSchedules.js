import React, { useState } from "react";
import { createScheduleAdapter } from "../adapters/branch";

export const days = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

const defaultSchedules = days.map((item) => {
  return {
    day: item,
    selected: false,
    open: "",
    close: "",
  };
});

const useSchedules = () => {
  const [schedules, setSchedules] = useState(defaultSchedules);
  const schedules_f = schedules.map((item) => createScheduleAdapter(item));

  const handleSelectedSchedules = (day) => {
    const newSchedules = schedules;
    const schedule = newSchedules.find((item) => item.day === day);
    schedule.selected = !schedule.selected;
    setSchedules([...newSchedules]);
  };
  const handleCleanSchedule = (day) => {
    const newSchedules = schedules;
    const schedule = newSchedules.find((item) => item.day === day);
    schedule.open = "";
    schedule.close = "";
    setSchedules([...newSchedules]);
  };

  const handleAssignSchedule = (schedule) => {
    const newSchedules = schedules.map((item) => {
      if (item.selected) {
        item.open = schedule.open;
        item.close = schedule.close;
        item.selected = false;
      }
      return item;
    });
    setSchedules([...newSchedules]);
  };

  const handleSelectAll = () => {
    const newSchedules = schedules.map((item) => {
      if (!item.open && !item.close) {
        item.selected = true;
      }
      return item;
    });
    setSchedules([...newSchedules]);
  };
  
  const isADaySelected = () => {
    return schedules.some((item) => item.selected);
  };

  const isAScheduleAssigned = () => {
    return schedules.some((item) => item.open && item.close);
  }

  return {
    schedules,
    handleSelectedSchedules,
    handleAssignSchedule,
    isADaySelected,
    handleCleanSchedule,
    handleSelectAll,
    isAScheduleAssigned,
    schedules_f,
    setSchedules
  };
};

export default useSchedules;
