import { useSelector, useDispatch } from "react-redux";

import {
  startAddOneSizeGuide,
  startDeleteSizeGuide,
  startLoadOneSizeGuide,
  startLoadSizeGuides,
  startSelectSizeGuide,
  startUpdateSizeGuide,
} from "../store/actions/sizeGuideActions";
import { useNavigate } from "react-router-dom";

export const useSizeGuide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtiene los datos del estado global de Redux relacionados con las guías de tallas
  const { sizeGuides, sizeGuide } = useSelector((state) => state.sizeGuide);
  const { loading } = useSelector((state) => state.ui);

  // Carga todas las guías de tallas desde el servidor
  const loadSizeGuides = async () => await dispatch(startLoadSizeGuides());

  // Agrega una nueva guía de tallas
  const loadAddOneSizeGuide = (values) =>
    dispatch(startAddOneSizeGuide(values));

  // Carga una guía de tallas específica por su ID
  const loadOneSizeGuide = async (id) => dispatch(startLoadOneSizeGuide(id));

  // Elimina una guía de tallas específica por su ID
  const deleteSizeGuide = async (id) => dispatch(startDeleteSizeGuide(id));

  // Actualiza una guía de tallas específica con nuevos valores
  const updateSizeGuide = async (id, values) =>
    dispatch(startUpdateSizeGuide(id, values, navigate));

  // Mapea todas las guías de tallas para generar filas con un ID único
  const rowsAllGuides = sizeGuides?.map((item, index) => ({
    id: index,
    ...item,
  }));

  // Mapea las dimensiones de una guía de tallas específica para generar filas con un ID único
  const rowsSizeGuide = sizeGuide?.dimensions?.map((item, index) => ({
    id: index,
    ...item,
  }));

  return {
    loadSizeGuides, // Función para cargar todas las guías de tallas
    navigate, // Navegador para redirigir entre rutas
    updateSizeGuide, // Función para actualizar una guía de tallas
    sizeGuides, // Lista de todas las guías de tallas
    sizeGuide, // Guía de tallas específica seleccionada
    loadAddOneSizeGuide, // Función para agregar una nueva guía de tallas
    dispatch, // Función para despachar acciones a Redux
    loadOneSizeGuide, // Función para cargar una guía de tallas específica
    rowsAllGuides, // Filas generadas para todas las guías de tallas
    deleteSizeGuide, // Función para eliminar una guía de tallas
    loading, // Estado de carga
    rowsSizeGuide, // Filas generadas para las dimensiones de una guía de tallas específica
  };
};
