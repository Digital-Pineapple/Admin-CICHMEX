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
} from "../store";

export const useWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { zones, aisles, sections } = useSelector((state) => state.warehouse);
  const allZones = zones.allZones;
  const loaderZones = zones.loader;

  const allAisles = aisles.allAisles;
  const loaderAisles = aisles.loader;

  const allSections = sections.allSections;
  const loaderSections = sections.loader;
  const section = sections.section;

  const loadAllZones = () => dispatch(startLoadZones());
  const loadAddZone = (data, closeModal) =>
    dispatch(startAddZones(data, closeModal));
  const loadUpdateZone = (id, data, closeModal) =>
    dispatch(startUpdateZone(id, data, closeModal));
  const loadDeleteZone = (id) => dispatch(startDeleteZone(id));

  const loadAllAisles = () => dispatch(startLoadAisles());
  const loadAddAisle = (data, closeModal) =>
    dispatch(startAddAisle(data, closeModal));
  const loadUpdateAisle = (id, data, closeModal) =>
    dispatch(startUpdateAisle(id, data, closeModal));
  const loadDeleteAisle = (id) => dispatch(startDeleteAisle(id));

  const loadAllSections = () => dispatch(startLoadSections());
  const loadAddSection = (data, closeModal) =>
    dispatch(startAddSection(data, closeModal));
  const loadUpdateSection = (id, data, closeModal) =>
    dispatch(startUpdateSection(id, data, closeModal));
  const loadDeleteSection = (id) => dispatch(startDeleteSection(id));
  const loadSectionPDF = (id) => dispatch(startLoadSectionPDF(id));
  const searchProductSection =(id, handleSearch, product, handleSection)=> dispatch(startSearchProductSection(id, handleSearch, product, handleSection))
  const getSection =(id)=> dispatch(startGetSection(id))
  const addProductToSection =(data, handleClose, setSection, clearValuate)=> dispatch(startAddProductToSection(data, handleClose, setSection, clearValuate))
  const updateStock =(data, handleClose, setSection, clearValuate)=> dispatch(startUpdateStock(data, handleClose, setSection, clearValuate))

  const searchProductFill = ({id, handleOpen, product})=>dispatch(startSearchProductFill({id, handleOpen, product}))
  
  const rows = (data) =>
    data.map((i, index) => ({
      id: index.toString(),
      ...i,
    }));

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

  const defaultTypeZone = "Sin información";
  const RenderTypeZone = (data) => {
    const foundType = TYPES_ZONES.find((item) => item[data]);
    return foundType ? foundType[data] : defaultTypeZone;
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
    searchProductFill
  };
};
