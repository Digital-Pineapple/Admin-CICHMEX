import dayjs from "dayjs";
function convertirCadenaHoraAFecha(cadenaHora) {
    // Dividir la cadena de hora en partes: hora, minutos y periodo (AM o PM)
    const partes = cadenaHora.split(' ');
    const horaMinutos = partes[0].split(':');
    let hora = parseInt(horaMinutos[0]);
    const minutos = horaMinutos[1];
    const periodo = partes[1];

    // Ajustar la hora si es PM
    if (periodo === 'PM' && hora < 12) {
      hora += 12;
    } else if (periodo === 'AM' && hora === 12) {
      hora = 0;
    }

    // Crear un nuevo objeto Date con la hora y minutos
    const fecha = new Date();
    fecha.setHours(hora);
    fecha.setMinutes(parseInt(minutos));
    fecha.setSeconds(0); // Opcional: Puedes establecer los segundos a cero si lo deseas

    return fecha;
  }

  const handleHoursChange = (value) => {
    const formattedDate = dayjs(value).toDate(); // Asegúrate de tener un objeto Date válido
    if (formattedDate == 'Invalid Date') {
      return 'errorFormat';
    }
    const hours = dayjs(formattedDate).format('h'); // Obtener horas en formato 12 horas (1-12)
    const minutes = dayjs(formattedDate).format('mm'); // Obtener minutos
    const ampm = dayjs(formattedDate).format('A'); // Obtener AM o PM

    return `${hours}:${minutes} ${ampm}`;
  };

  export {
    convertirCadenaHoraAFecha,
    handleHoursChange
  }