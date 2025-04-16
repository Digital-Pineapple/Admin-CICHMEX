import { Badge, Box, Chip, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

// Componente estilizado para el Badge utilizando styled-components
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    // Posiciona el badge a la izquierda y en la parte superior
    left: 30,
    top: 0,
    // Define el padding y el color de fondo del badge
    padding: "0 4px",
    backgroundColor: "primary",
  },
}));

// Componente principal SchedulesPicker
// Props:
// - items: Lista de horarios con información de apertura, cierre y selección
// - onSelectSchedule: Función para manejar la selección de un horario
// - onCleanSchedule: Función para limpiar un horario seleccionado
// - onSelectAll: Función para seleccionar todos los horarios
const SchedulesPicker = ({
  items,
  onSelectSchedule,
  onCleanSchedule,
  onSelectAll,
}) => {
  return (
    // Contenedor principal que organiza los elementos en un layout flexible
    <Box display={"flex"} flexWrap={"wrap"} gap={2}>
      {/* Renderiza cada elemento de la lista de horarios */}
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {/* Si el horario no tiene apertura ni cierre, muestra un Chip simple */}
            {!item.open && !item.close ? (
              <Chip
                // Llama a la función onSelectSchedule al hacer clic
                onClick={() => onSelectSchedule(item.day)}
                // Cambia el color del Chip según si está seleccionado o no
                color={item.selected ? "success" : "default"}
                clickable
                size="large"
                key={index}
                label={item?.day} // Muestra el día como etiqueta
              />
            ) : (
              // Si el horario tiene apertura y cierre, muestra un Chip con un Badge
              <StyledBadge
                // Contenido del Badge: el día del horario
                badgeContent={
                  <Typography
                    color={"primary"}
                    fontSize={13}
                    fontWeight={"bold"}
                  >
                    {item.day}
                  </Typography>
                }
                anchorOrigin={{ vertical: "top", horizontal: "left" }} // Posición del Badge
              >
                <Chip
                  size="large"
                  key={index}
                  // Llama a la función onCleanSchedule al eliminar el horario
                  onDelete={() => onCleanSchedule(item.day)}
                  clickable
                  // Muestra el rango de apertura y cierre como etiqueta
                  label={`${item.open} - ${item.close}`}
                />
              </StyledBadge>
            )}
          </React.Fragment>
        );
      })}
      {/* Botón para seleccionar todos los horarios */}
      <Chip label={"Todos"} clickable onClick={onSelectAll} />
    </Box>
  );
};

export default SchedulesPicker;
