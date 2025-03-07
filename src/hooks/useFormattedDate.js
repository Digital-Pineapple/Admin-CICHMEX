import { useCallback } from "react";

const useDateFormatter = () => {
  // Extrae el día de la fecha
  const getDay = useCallback((dateString) => {
    if (!dateString) return "";
    const [date] = dateString.split(" ");
    const [day] = date.split("/");
    return day;
  }, []);

  // Extrae el mes (número) de la fecha
  const getMonth = useCallback((dateString) => {
    if (!dateString) return "";
    const [date] = dateString.split(" ");
    const [, month] = date.split("/");
    return month;
  }, []);

  // Extrae el año de la fecha
  const getYear = useCallback((dateString) => {
    if (!dateString) return "";
    const [date] = dateString.split(" ");
    const [, , year] = date.split("/");
    return year;
  }, []);

  // Extrae la hora (y parte AM/PM) de la fecha
  const getTime = useCallback((dateString) => {
    if (!dateString) return "";
    const parts = dateString.split(" ");
    return parts.length > 1 ? parts.slice(1).join(" ") : "";
  }, []);

  // Retorna el nombre del mes en base al número
  const getMonthName = useCallback((dateString) => {
    if (!dateString) return "";
    const [date] = dateString.split(" ");
    const [, month] = date.split("/");
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return meses[parseInt(month, 10) - 1] || "";
  }, []);

  return { getDay, getMonth, getYear, getTime, getMonthName };
};

export default useDateFormatter;
