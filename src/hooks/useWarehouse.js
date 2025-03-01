import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startAddZones, startLoadZones } from "../store";

export const useWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { zones } = useSelector((state) => state.warehouse);
  const allZones = zones.allZones;
  const loaderZones = zones.loader;

  const loadAllZones = () => dispatch(startLoadZones());
  const loadAddZone = (data, closeModal) => dispatch(startAddZones(data,closeModal));

  const rows = (data) =>
    data.map((i, index) => ({
      id: index.toString(),
      ...i,
    }));

  const TYPES_ZONES = [
    { "storage_zone": "Zona de Almacenamiento" },
    { "picking_zone": "Zona de Empaque" },
    { "loading_dock": "Zona de Carga" },
    { "no_data": "Sin información" },
  ];
  const TypesZones = [
    { key: "storage_zone", label: "Zona de Almacenamiento" },
    { key: "picking_zone", label: "Zona de Empaque" },
    { key: "loading_dock", label: "Zona de Carga" },
  ];

  const defaultTypeZone = "Sin información";
  const RenderTypeZone = (data) => {
    const foundType = TYPES_ZONES.find(item => item[data]);
    return foundType ? foundType[data] : defaultTypeZone;
  }
  return {
    loadAllZones,
    allZones,
    loaderZones,
    rows,
    RenderTypeZone,
    TypesZones,
    loadAddZone
  };
};
