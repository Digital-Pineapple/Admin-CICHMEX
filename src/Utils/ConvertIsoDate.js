import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';

// Cargar plugins
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// Establecer idioma a español
dayjs.locale('es');

// Configurar la zona horaria predeterminada
dayjs.tz.setDefault('America/Mexico_City');

// Convertir la fecha a formato local y formatearla
export const localDate = (date) => {
  // Si el valor es nulo, undefined o no es una fecha válida, retornar el valor original
  if (!date) return date;

  // Verificar si es un objeto de fecha de MongoDB (ISODate) o un string ISO 8601
  const isMongoDBDate =
    (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(date)) ||
    (typeof date === 'object' && date instanceof Date);

  // Si no es una fecha reconocible, retornar el valor original
  if (!isMongoDBDate) return date;

  // Convertir a formato local
  try {
    return dayjs(date).tz(dayjs.tz.guess()).format('dddd, D [de] MMMM [de] YYYY h:mm A');
  } catch (error) {
    console.error('Error al convertir la fecha:', error);
    return date; // Si falla la conversión, retornar el valor original
  }
};
export const localDateTable = (date) => 
  dayjs(date).tz(dayjs.tz.guess()).format('D/MMMM');
