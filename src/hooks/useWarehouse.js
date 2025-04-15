import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startAddAisle,
  startAddProductToSection,
  startAddSection,
  startAddZones,
  startDeleteAisle,
  startDeleteSection,
  startDeleteZone,
  startGetSection,
  startLoadAisles,
  startLoadSectionPDF,
  startLoadSections,
  startLoadZones,
  startSearchProductFill,
  startSearchProductSection,
  startUpdateAisle,
  startUpdateSection,
  startUpdateStock,
  startUpdateZone,
  startSupplyProduct
} from "../store";

export const useWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selección de datos del estado global (Redux)
  const { zones, aisles, sections } = useSelector((state) => state.warehouse);
  const allZones = zones.allZones; // Todas las zonas
  const loaderZones = zones.loader; // Indicador de carga de zonas

  const allAisles = aisles.allAisles; // Todos los pasillos
  const loaderAisles = aisles.loader; // Indicador de carga de pasillos

  const allSections = sections.allSections; // Todas las secciones
  const loaderSections = sections.loader; // Indicador de carga de secciones
  const section = sections.section; // Sección específica

  // Funciones relacionadas con las zonas
  const loadAllZones = () => dispatch(startLoadZones()); // Cargar todas las zonas
  const loadAddZone = (data, closeModal) =>
    dispatch(startAddZones(data, closeModal)); // Agregar una nueva zona
  const loadUpdateZone = (id, data, closeModal) =>
    dispatch(startUpdateZone(id, data, closeModal)); // Actualizar una zona existente
  const loadDeleteZone = (id) => dispatch(startDeleteZone(id)); // Eliminar una zona

  // Funciones relacionadas con los pasillos
  const loadAllAisles = () => dispatch(startLoadAisles()); // Cargar todos los pasillos
  const loadAddAisle = (data, closeModal) =>
    dispatch(startAddAisle(data, closeModal)); // Agregar un nuevo pasillo
  const loadUpdateAisle = (id, data, closeModal) =>
    dispatch(startUpdateAisle(id, data, closeModal)); // Actualizar un pasillo existente
  const loadDeleteAisle = (id) => dispatch(startDeleteAisle(id)); // Eliminar un pasillo

  // Funciones relacionadas con las secciones
  const loadAllSections = () => dispatch(startLoadSections()); // Cargar todas las secciones
  const loadAddSection = (data, closeModal) =>
    dispatch(startAddSection(data, closeModal)); // Agregar una nueva sección
  const loadUpdateSection = (id, data, closeModal) =>
    dispatch(startUpdateSection(id, data, closeModal)); // Actualizar una sección existente
  const loadDeleteSection = (id) => dispatch(startDeleteSection(id)); // Eliminar una sección
  const loadSectionPDF = (id) => dispatch(startLoadSectionPDF(id)); // Generar un PDF de una sección
  const searchProductSection = (id, handleSearch, product, handleSection) =>
    dispatch(startSearchProductSection(id, handleSearch, product, handleSection)); // Buscar un producto en una sección
  const getSection = (id) => dispatch(startGetSection(id)); // Obtener detalles de una sección
  const addProductToSection = (data, handleClose, setSection, clearValuate) =>
    dispatch(startAddProductToSection(data, handleClose, setSection, clearValuate)); // Agregar un producto a una sección
  const updateStock = (data, handleClose, setSection, clearValuate) =>
    dispatch(startUpdateStock(data, handleClose, setSection, clearValuate)); // Actualizar el stock de un producto en una sección

  // Función para buscar un producto y abrir un modal con los resultados
  const searchProductFill = async ({ id, product, setOpenModal }) => {
    const result = await dispatch(startSearchProductFill(id));
    setOpenModal({ value: true, data: product, section: result });
  };

  // Función para abastecer un producto
  const supplyProduct = (id, values, handleCloseModal) =>
    dispatch(startSupplyProduct(id, values, handleCloseModal));

  // Función para transformar datos en filas para una tabla
  const rows = (data) =>
    data.map((i, index) => ({
      id: index.toString(),
      ...i,
    }));

  // Tipos de zonas con etiquetas
  const TYPES_ZONES = [
    { storage_zone: "Zona de Almacenamiento" },
    { picking_zone: "Zona de Empaque" },
    { loading_dock: "Zona de Carga" },
    { no_data: "Sin información" },
  ];
  const TypesZones = [
    { key: "storage_zone", label: "Zona de Almacenamiento" },
    { key: "picking_zone", label: "Zona de Empaque" },
    { key: "loading_dock", label: "Zona de Carga" },
  ];

  const defaultTypeZone = "Sin información"; // Tipo de zona por defecto
  const RenderTypeZone = (data) => {
    const foundType = TYPES_ZONES.find((item) => item[data]);
    return foundType ? foundType[data] : defaultTypeZone; // Renderizar el tipo de zona
  };

  return {
    loadAllZones,
    allZones,
    loaderZones,
    rows,
    RenderTypeZone,
    TypesZones,
    loadAddZone,
    loadUpdateZone,
    loadDeleteZone,
    loadAllAisles,
    loadAllAisles,
    allAisles,
    loaderAisles,
    loadAddAisle,
    loadUpdateAisle,
    loadDeleteAisle,
    loadAllSections,
    allSections,
    loaderSections,
    loadDeleteSection,
    loadAddSection,
    loadUpdateSection,
    loadSectionPDF,
    searchProductSection,
    getSection,
    section,
    addProductToSection,
    updateStock,
    navigate,
    searchProductFill,
    supplyProduct
  };
};
