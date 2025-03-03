import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startAddAisle,
  startAddZones,
  startDeleteAisle,
  startDeleteZone,
  startLoadAisles,
  startLoadZones,
  startUpdateAisle,
  startUpdateZone,
} from "../store";

export const useWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { zones, aisles } = useSelector((state) => state.warehouse);
  const allZones = zones.allZones;
  const loaderZones = zones.loader;

  const allAisles = aisles.allAisles;
  const loaderAisles = aisles.loader;

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
    loadDeleteAisle
  };
};
