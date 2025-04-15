import dayjs from 'dayjs';

/**
 * Obtiene el tiempo restante hasta un timestamp en milisegundos.
 * @param {number} timestampMs - El timestamp en milisegundos.
 * @returns {Object} Un objeto con los días, horas, minutos y segundos restantes.
 */
export function getRemainingTimeUntilMsTimestamp(timestampMs) {
    const timestampDayjs = dayjs(timestampMs);
    const nowDayjs = dayjs();
    if(timestampDayjs.isBefore(nowDayjs)) {
        return {
            seconds: '00',
            minutes: '00',
            hours: '00',
            days: '00'
        }
    }
    return {
        seconds : getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes : getRemainingMinutes(nowDayjs, timestampDayjs),
        hours : getRemainingHours(nowDayjs, timestampDayjs),
        days : getRemainingDays(nowDayjs, timestampDayjs)
    } ;
}

/**
 * Calcula los segundos restantes entre dos fechas.
 * @param {Object} nowDayjs - Fecha actual en formato dayjs.
 * @param {Object} timestampDayjs - Fecha futura en formato dayjs.
 * @returns {string} Segundos restantes con formato de dos dígitos.
 */
function getRemainingSeconds(nowDayjs, timestampDayjs) {
    const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
    return padWithZeros(seconds, 2);
}

/**
 * Calcula los minutos restantes entre dos fechas.
 * @param {Object} nowDayjs - Fecha actual en formato dayjs.
 * @param {Object} timestampDayjs - Fecha futura en formato dayjs.
 * @returns {string} Minutos restantes con formato de dos dígitos.
 */
function getRemainingMinutes(nowDayjs, timestampDayjs) {
    const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
    return padWithZeros(minutes, 2);
}

/**
 * Calcula las horas restantes entre dos fechas.
 * @param {Object} nowDayjs - Fecha actual en formato dayjs.
 * @param {Object} timestampDayjs - Fecha futura en formato dayjs.
 * @returns {string} Horas restantes con formato de dos dígitos.
 */
function getRemainingHours(nowDayjs, timestampDayjs) {
    const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24;
    return padWithZeros(hours, 2);
}

/**
 * Calcula los días restantes entre dos fechas.
 * @param {Object} nowDayjs - Fecha actual en formato dayjs.
 * @param {Object} timestampDayjs - Fecha futura en formato dayjs.
 * @returns {string} Días restantes como cadena de texto.
 */
function getRemainingDays(nowDayjs, timestampDayjs) {
    const days = timestampDayjs.diff(nowDayjs, 'days');
    return days.toString();
}

/**
 * Rellena un número con ceros a la izquierda hasta alcanzar una longitud mínima.
 * @param {number} number - El número a formatear.
 * @param {number} minLength - Longitud mínima del resultado.
 * @returns {string} Número formateado como cadena con ceros a la izquierda.
 */
function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if(numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) +  numberString;
}