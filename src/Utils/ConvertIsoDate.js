import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Cargar plugins
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// Establecer la localización (ejemplo: español)
import 'dayjs/locale/es';
dayjs.locale('es');

// Convertir la fecha a formato local y formatearla
export const localDate = (date) => dayjs(date).tz(dayjs.tz.guess()).format('dddd, MMMM D, YYYY h:mm A');
