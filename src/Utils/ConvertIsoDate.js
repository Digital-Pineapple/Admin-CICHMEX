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
export const localDate = (date) => 
  dayjs(date).tz(dayjs.tz.guess()).format('dddd, D [de] MMMM [de] YYYY h:mm A');
